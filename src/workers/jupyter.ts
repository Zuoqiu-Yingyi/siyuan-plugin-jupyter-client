// Copyright (C) 2023 Zuoqiu Yingyi
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/* eslint-disable no-restricted-globals */

import {
    Client,

} from "@siyuan-community/siyuan-sdk";

import { moment } from "@workspace/utils/date/moment";
import { Logger } from "@workspace/utils/logger";
import { trimSuffix } from "@workspace/utils/misc/string";
import { createIAL } from "@workspace/utils/siyuan/ial";
import { id } from "@workspace/utils/siyuan/id";
import { AsyncLockQueue } from "@workspace/utils/structure/async-lock-queue";
import { WorkerBridgeSlave } from "@workspace/utils/worker/bridge/slave";

import { DEFAULT_CONFIG } from "@/configs/default";
import CONSTANTS from "@/constants";
import { Jupyter } from "@/jupyter";
import { IpynbImport } from "@/jupyter/import";
import { Output } from "@/jupyter/output";
import {
    parseData,
    parseText,

} from "@/jupyter/parse";

import type {
    Kernel,
    KernelMessage,
    KernelSpec,
    Session,
} from "@jupyterlab/services";
import type { IShellFuture } from "@jupyterlab/services/lib/kernel/kernel";
import type { IHeader } from "@jupyterlab/services/lib/kernel/messages";
import type { types } from "@siyuan-community/siyuan-sdk";

import type { BlockID } from "@workspace/types/siyuan";
import type {
    IFunction,
    IHandlers,
} from "@workspace/utils/worker/bridge";

import type { PluginHandlers } from "@/index";
import type { IData } from "@/jupyter/parse";
import type {
    IConfig,
    IJupyterParserOptions,
} from "@/types/config";
import type { IExecuteContext } from "@/types/jupyter";
import type { I18N } from "@/utils/i18n";

const config: IConfig = DEFAULT_CONFIG;
const logger = new Logger(`${self.name}-worker:${CONSTANTS.JUPYTER_WORKER_FILE_NAME}`);
const client = new Client(
    {
        baseURL: trimSuffix(self.location.pathname, `plugins/${self.name}/workers/${CONSTANTS.JUPYTER_WORKER_FILE_NAME}.js`),
    },
    "fetch",
);
const id_2_session_connection = new Map<string, Session.ISessionConnection>(); // 会话 ID -> 会话连接
let jupyter: InstanceType<typeof Jupyter> | undefined;
let i18n: I18N;

/* 块属性设置队列 */
const set_block_attrs_queue = new AsyncLockQueue<types.kernel.api.attr.setBlockAttrs.IPayload>(
    async (item) => client.setBlockAttrs(item),
    (...args) => logger.warns(...args),
);

/* 块内容插入队列 */
const insert_block_queue = new AsyncLockQueue<types.kernel.api.block.insertBlock.IPayload>(
    async (item) => client.insertBlock(item),
    (...args) => logger.warns(...args),
);
void insert_block_queue;

/**
 * 内核状态更改信号监听器
 * @see {@link Session.ISessionConnection.statusChanged}
 * @see {@link Kernel.IKernelConnection.statusChanged}
 * @param docID - 文档块 ID
 * @param _connection - 会话/内核连接
 * @param status - 内核状态
 */
async function kernelStatusChanged(
    docID: string,
    _connection: Kernel.IKernelConnection | Session.ISessionConnection,
    status: KernelMessage.Status,
): Promise<void> {
    // logger.debugs(["statusChanged", status], [docID, connection.name, connection.id]);
    set_block_attrs_queue.enqueue({
        id: docID,
        attrs: {
            [CONSTANTS.attrs.kernel.status]: status,
        },
    });
}

/**
 * 内核连接状态更改信号监听器
 * @see {@link Session.ISessionConnection.connectionStatusChanged}
 * @see {@link Kernel.IKernelConnection.connectionStatusChanged}
 * @param docID - 文档块 ID
 * @param _connection - 会话/内核连接
 * @param status - 内核连接状态
 */
async function kernelConnectionStatusChanged(
    docID: string,
    _connection: Kernel.IKernelConnection | Session.ISessionConnection,
    status: Kernel.ConnectionStatus,
): Promise<void> {
    // logger.debugs(["connectionStatusChanged", status], [docID, connection.name, connection.id]);

    await client.setBlockAttrs({
        id: docID,
        attrs: {
            [CONSTANTS.attrs.kernel.connection_status]: status,
        },
    });
}

/**
 * 等待输入信号监听器
 * @see {@link Session.ISessionConnection.pendingInput}
 * @see {@link Kernel.IKernelConnection.pendingInput}
 * @param docID - 文档块 ID
 * @param connection - 会话/内核连接
 * @param pending - 是否正等待输入
 */
async function kernelPendingInput(
    docID: string,
    connection: Kernel.IKernelConnection | Session.ISessionConnection,
    pending: boolean,
): Promise<void> {
    logger.debugs(["pendingInput", pending], [docID, connection.name, connection.id]);
}
void kernelPendingInput;

/**
 * 输入输出消息信号监听器
 * @see {@link Session.ISessionConnection.iopubMessage}
 * @see {@link Kernel.IKernelConnection.iopubMessage}
 * @param docID - 文档块 ID
 * @param connection - 会话/内核连接
 * @param message - 输入输出消息
 */
async function kernelIopubMessage(
    docID: string,
    connection: Kernel.IKernelConnection | Session.ISessionConnection,
    message: KernelMessage.IIOPubMessage,
): Promise<void> {
    logger.debugs(["iopubMessage", message], [docID, connection.name, connection.id]);
}
void kernelIopubMessage;

/**
 * 所有消息监听器
 * @see {@link Session.ISessionConnection.anyMessage}
 * @see {@link Kernel.IKernelConnection.anyMessage}
 * @param docID - 文档块 ID
 * @param connection - 会话/内核连接
 * @param message - 内核消息
 */
async function kernelAnyMessage(
    docID: string,
    connection: Kernel.IKernelConnection | Session.ISessionConnection,
    message: Kernel.IAnyMessageArgs,
): Promise<void> {
    logger.debugs(["anyMessage", message], [docID, connection.name, connection.id]);
}
void kernelAnyMessage;

/**
 * 未处理消息监听器
 * @see {@link Session.ISessionConnection.unhandledMessage}
 * @see {@link Kernel.IKernelConnection.unhandledMessage}
 * @param docID - 文档块 ID
 * @param connection - 会话/内核连接
 * @param message - 未处理的内核消息
 */
async function kernelUnhandledMessage(
    docID: string,
    connection: Kernel.IKernelConnection | Session.ISessionConnection,
    message: KernelMessage.IMessage,
): Promise<void> {
    logger.debugs(["unhandledMessage", message], [docID, connection.name, connection.id]);
}
void kernelUnhandledMessage;

/**
 * 绑定会话连接信号监听器
 * @param docID - 文档块 ID
 * @param connection - 会话连接
 */
function bindSessionConnectionSignalListener(
    docID: string,
    connection: Session.ISessionConnection,
): void {
    connection.statusChanged.connect((...args) => kernelStatusChanged(docID, ...args));
    connection.connectionStatusChanged.connect((...args) => kernelConnectionStatusChanged(docID, ...args));
    // connection.pendingInput.connect((...args) => kernelPendingInput(docID, ...args));
    // connection.iopubMessage.connect((...args) => kernelIopubMessage(docID, ...args));
    // connection.anyMessage.connect((...args) => kernelAnyMessage(docID, ...args));
    // connection.unhandledMessage.connect((...args) => kernelUnhandledMessage(docID, ...args));
}

/**
 * 初始化代码执行上下文
 * @param context - 执行上下文
 */
function initContext(context: IExecuteContext): void {
    /* 设置块 ID */
    context.code.attrs.id = context.code.id;
    context.output.attrs.id = context.output.id;

    /* 设置块类型 */
    context.code.attrs[CONSTANTS.attrs.code.type.key] = CONSTANTS.attrs.code.type.value;
    context.output.attrs[CONSTANTS.attrs.output.type.key] = CONSTANTS.attrs.output.type.value;

    /* 关联代码块与输出块 */
    context.code.attrs[CONSTANTS.attrs.code.output] = context.output.id;
    context.output.attrs[CONSTANTS.attrs.output.code] = context.code.id;

    /**
     * 构造输出块初始 kramdown 代码
     * ```markdown
     * {{{row
     * ---
     * 流输出内容/错误输出内容
     * ?---
     * ?数据显示
     * ?---
     * ?运行结果
     * ?---
     * ?运行完成响应 (若有)
     * ---
     * }}}
     * ```
     */
    context.output.kramdown = [
        "{{{row",
        "---",
        createIAL({ id: context.output.hrs.head.id }),
        "---",
        createIAL({ id: context.output.hrs.stream.id }),
        "---",
        createIAL({ id: context.output.hrs.error.id }),
        "---",
        createIAL({ id: context.output.hrs.display_data.id }),
        "---",
        createIAL({ id: context.output.hrs.execute_result.id }),
        "---",
        createIAL({ id: context.output.hrs.execute_reply.id }),
        "---",
        createIAL({ id: context.output.hrs.tail.id }),
        "}}}",
        createIAL(context.output.attrs),
    ].join("\n");
}

/**
 * 初始化输出块
 * @param context - 执行上下文
 */
async function initOutputBlock(context: IExecuteContext): Promise<void> {
    // logger.debug(context);

    if (context.output.new) { // 在代码块后插入块
        await client.insertBlock({
            previousID: context.code.id,
            data: context.output.kramdown,
            dataType: "markdown",
        });
        context.output.new = false;
    }
    else { // 更新原有块
        await client.updateBlock({
            id: context.output.id,
            data: context.output.kramdown,
            dataType: "markdown",
        });
    }
}

/**
 * 更新块属性
 * @param context - 执行上下文
 */
async function updateBlockAttrs(context: IExecuteContext): Promise<void> {
    set_block_attrs_queue.enqueue({
        id: context.code.id,
        attrs: context.code.attrs,
    });
    set_block_attrs_queue.enqueue({
        id: context.output.id,
        attrs: context.output.attrs,
    });
}

/**
 * 插入新块
 * @param context - 执行上下文
 * @param nextID - 下一个块 ID
 * @param data - 块内容文本 (kramdown)
 * @param dataType - 块内容类型
 */
async function insertBlock(
    context: IExecuteContext,
    nextID: string,
    data: string,
    dataType: "dom" | "markdown" = "markdown",
): Promise<void> {
    if (context.output.reply) {
        await client.appendBlock({
            parentID: context.output.id,
            data,
            dataType,
        });
    }
    else {
        await client.insertBlock({
            nextID,
            data,
            dataType,
        });
    }
}

export type TExtendedParams = [
    Omit<Parameters<Kernel.IKernelConnection["requestExecute"]>[0], "code">?,
    Parameters<Kernel.IKernelConnection["requestExecute"]>[1]?,
    Parameters<Kernel.IKernelConnection["requestExecute"]>[2]?,
];

/**
 * 执行代码
 * @param clientID - 客户端 ID
 * @param code - 代码
 * @param codeID - 代码块 ID
 * @param connection - 会话连接
 * @param options - 代码块解析选项
 * @param goto - 运行时是否跳转到对应代码块
 * @param args - {@link Kernel.IKernelConnection.requestExecute} 原始参数
 * @see
 * {@link https://jupyter-client.readthedocs.io/en/latest/messaging.html#execute | Execute Messaging in Jupyter}  
 * {@link Kernel.IKernelConnection.requestExecute}  
 */
async function executeCode(
    clientID: string,
    code: string,
    codeID: string,
    connection: Session.ISessionConnection,
    options: IJupyterParserOptions,
    goto: boolean,
    ...args: TExtendedParams
): Promise<void> {
    if (connection.kernel) {
        const context: IExecuteContext = {
            client: {
                id: clientID,
                goto,
            },
            code: {
                id: codeID,
                attrs: {},
            },
            output: {
                new: true,
                id: id(),
                reply: false,
                attrs: {},
                stream: {
                    attrs: {
                        id: id(),
                    },
                    content: "",
                    initialized: false,
                },
                options,
                display: new Map(),
                kramdown: "",
                hrs: {
                    head: {
                        id: id(),
                        used: true,
                    },
                    stream: {
                        id: id(),
                        used: false,
                    },
                    error: {
                        id: id(),
                        used: false,
                    },
                    display_data: {
                        id: id(),
                        used: false,
                    },
                    execute_result: {
                        id: id(),
                        used: false,
                    },
                    execute_reply: {
                        id: id(),
                        used: false,
                    },
                    tail: {
                        id: id(),
                        used: true,
                    },
                },
            },
        };

        const response_getBlockAttrs_code = await client.getBlockAttrs({ id: context.code.id });
        context.code.attrs = response_getBlockAttrs_code.data;
        if (CONSTANTS.attrs.code.output in context.code.attrs) {
            try {
                const output_id = context.code.attrs[CONSTANTS.attrs.code.output]!;
                const response_getBlockAttrs_output = await client.getBlockAttrs({ id: output_id });

                context.output.id = output_id;
                context.output.new = false;
                context.output.attrs = response_getBlockAttrs_output.data;
            }
            catch (error) {
                void error;
                /* 输出块不存在 */
                // logger.debug(error);
            }
        }

        /* 初始化 */
        initContext(context);
        await initOutputBlock(context);

        const future = connection.kernel.requestExecute(
            {
                ...config.jupyter.execute.content,
                ...args[0],
                code,
            },
            args[1],
            args[2],
        );

        future.onIOPub = async (msg) => {
            switch (msg.header.msg_type) {
                case "status": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleStatusMessage(
                        msg as KernelMessage.IStatusMsg,
                        context,
                    );
                    break;
                }
                case "stream": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleStreamMessage(
                        msg as KernelMessage.IStreamMsg,
                        context,
                    );
                    break;
                }
                case "error": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleErrorMessage(
                        msg as KernelMessage.IErrorMsg,
                        context,
                    );
                    break;
                }
                case "execute_input": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleExecuteInputMessage(
                        msg as KernelMessage.IExecuteInputMsg,
                        context,
                    );
                    break;
                }
                case "display_data": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleDisplayDataMessage(
                        msg as KernelMessage.IDisplayDataMsg,
                        context,
                    );
                    break;
                }
                case "update_display_data": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleUpdateDisplayDataMessage(
                        msg as KernelMessage.IUpdateDisplayDataMsg,
                        context,
                    );
                    break;
                }
                case "execute_result": {
                    // eslint-disable-next-line ts/no-use-before-define
                    await handleExecuteResultMessage(
                        msg as KernelMessage.IExecuteResultMsg,
                        context,
                    );
                    break;
                }
                case "clear_output": {
                    await initOutputBlock(context);
                    break;
                }
                case "comm_close":
                case "comm_msg":
                case "comm_open":
                case "shutdown_reply":
                case "debug_event":
                default:
                    break;
            }
        };

        /* 文本输入请求 */
        // eslint-disable-next-line ts/no-use-before-define
        future.onStdin = (msg) => handleStdinMessage(msg, context, future);

        /* 代码执行结束消息 */
        // eslint-disable-next-line ts/no-use-before-define
        future.onReply = (msg) => handleExecuteReplyMessage(msg, context);
    }
}

/**
 * 处理 `status` 消息
 * @param message - `status` 消息
 * @param context - 执行上下文
 */
async function handleStatusMessage(
    message: KernelMessage.IStatusMsg,
    context: IExecuteContext,
): Promise<void> {
    switch (message.content.execution_state) {
        case "busy": {
            /* 更改块序号标志 */
            context.code.attrs[CONSTANTS.attrs.code.index] = "*";
            context.output.attrs[CONSTANTS.attrs.output.index] = "*";

            /* 更新内核忙碌时间 */
            context.code.attrs[CONSTANTS.attrs.code.busy] = message.header.date;
            break;
        }
        case "idle": {
            /* 更新内核空闲时间 */
            context.code.attrs[CONSTANTS.attrs.code.idle] = message.header.date;
            break;
        }
        default:
            break;
    }
    await updateBlockAttrs(context);
}

/**
 * 处理 `string` 消息
 * @param message - `string` 消息
 * @param context - 执行上下文
 */
async function handleStreamMessage(
    message: KernelMessage.IStreamMsg,
    context: IExecuteContext,
): Promise<void> {
    switch (message.content.name) {
        // eslint-disable-next-line default-case-last
        default:
        case "stdout": {
            break;
        }
        case "stderr": {
            context.output.stream.attrs.style = CONSTANTS.styles.warning;
            if (context.output.stream.initialized) {
                set_block_attrs_queue.enqueue({
                    id: context.output.stream.attrs.id,
                    attrs: context.output.stream.attrs,
                });
            }
        }
    }

    const content = new Output(message.content.text)
        .parseControlChars(context.output.stream.content)
        .toString();
    context.output.stream.content = content;
    const text = parseText(
        context.output.stream.content,
        context.output.options,
        context.output.stream.attrs.id,
    );
    const kramdowns = context.output.options.xterm
        ? [
                text,
            ]
        : [
                "{{{row",
                text,
                "}}}",
            ];
    if (context.output.stream.initialized) {
        await client.updateBlock({
            id: context.output.stream.attrs.id,
            data: kramdowns.join("\n"),
            dataType: "markdown",
        });
    }
    else {
        const ial = createIAL(context.output.stream.attrs);
        kramdowns.push(ial);

        context.output.stream.initialized = true;
        context.output.hrs.stream.used = true;
        await insertBlock(
            context,
            context.output.hrs.stream.id,
            kramdowns.join("\n"),
        );
    }
}

/**
 * 处理 `error` 消息
 * @param message - `error` 消息
 * @param context - 执行上下文
 */
async function handleErrorMessage(
    message: KernelMessage.IErrorMsg,
    context: IExecuteContext,
): Promise<void> {
    /* 使用代码块输出运行错误 */
    const block_id = id();
    const text = parseText(
        message.content.traceback.join("\n"),
        context.output.options,
        block_id,
    );
    const ial = createIAL({
        id: block_id,
        tyle: CONSTANTS.styles.error,
    });
    const kramdown = context.output.options.xterm
        ? [
                text,
                ial,
            ].join("\n")
        : [
                "{{{row",
                text,
                "}}}",
                ial,
            ].join("\n");

    context.output.hrs.error.used = true;
    await insertBlock(
        context,
        context.output.hrs.error.id,
        kramdown,
    );
}

/**
 * 处理 `execute_input` 消息
 * @param message - `execute_input` 消息
 * @param context - 执行上下文
 */
async function handleExecuteInputMessage(
    message: KernelMessage.IExecuteInputMsg,
    context: IExecuteContext,
): Promise<void> {
    /* 更新块开始运行时间 */
    const start = moment(message.header.date);
    context.code.attrs[CONSTANTS.attrs.code.execute_input] = message.header.date;
    context.code.attrs[CONSTANTS.attrs.code.time] = `${i18n.messages.lastRunTime.text
    }: ${start.format(CONSTANTS.JUPYTER_LAST_RUN_TIME_FORMAT)
    }`;

    /* 打开并定位到块 */
    if (context.client.goto) {
        // eslint-disable-next-line ts/no-use-before-define
        await bridge.call<PluginHandlers["gotoBlock"]>(
            "gotoBlock",
            context.code.id,
            context.client.id,
        );
    }
    await updateBlockAttrs(context);
}

/**
 * 处理 `display_data` 消息
 * @param message - `display_data` 消息
 * @param context - 执行上下文
 */
async function handleDisplayDataMessage(
    message: KernelMessage.IDisplayDataMsg | KernelMessage.IUpdateDisplayDataMsg,
    context: IExecuteContext,
): Promise<void> {
    const block_id = id();
    const kramdown = [
        "{{{row",
        await parseData(
            client,
            context.output.options,
            message.content.data as IData,
            message.content.metadata as Record<string, string>,
        ),
        "}}}",
        createIAL({ id: block_id }),
    ].join("\n");

    /* 添加 display_id -> block_id */
    if (message.content.transient?.display_id) {
        const set = context.output.display.get(message.content.transient.display_id) ?? new Set<string>();
        set.add(block_id);
        context.output.display.set(message.content.transient.display_id, set);
    }

    context.output.hrs.display_data.used = true;
    await insertBlock(
        context,
        context.output.hrs.display_data.id,
        kramdown,
    );
}

/**
 * 处理 `update_display_data` 消息
 * @param message - `update_display_data` 消息
 * @param context - 执行上下文
 */
async function handleUpdateDisplayDataMessage(
    message: KernelMessage.IUpdateDisplayDataMsg,
    context: IExecuteContext,
): Promise<void> {
    const set = context.output.display.get(message.content.transient.display_id);
    if (set && set.size > 0) { // 存在待更新的块
        const kramdown = [
            "{{{row",
            await parseData(
                client,
                context.output.options,
                message.content.data as IData,
                message.content.metadata as Record<string, string>,
            ),
            "}}}",
        ].join("\n");

        context.output.hrs.display_data.used = true;
        for (const id of set.values()) {
            await client.updateBlock({
                id,
                data: kramdown,
                dataType: "markdown",
            });
        }
    }
    else { // 作为新块插入
        await handleDisplayDataMessage(message, context);
    }
}

/**
 * 处理 `execute_result` 消息
 * @param message - `execute_result` 消息
 * @param context - 执行上下文
 */
async function handleExecuteResultMessage(
    message: KernelMessage.IExecuteResultMsg,
    context: IExecuteContext,
): Promise<void> {
    const kramdowns = await parseData(
        client,
        context.output.options,
        message.content.data as IData,
        message.content.metadata as Record<string, string>,
        true,
    );

    context.output.hrs.execute_result.used = true;
    for (const kramdown of kramdowns) {
        await insertBlock(
            context,
            context.output.hrs.execute_result.id,
            kramdown,
        );
    }
}

/**
 * 处理 `input_request` 或 `input_reply` 消息
 * @param message - `input_request` 或 `input_reply` 消息
 * @param context - 执行上下文
 * @param future - 内核响应处理器
 */
async function handleStdinMessage(
    message: KernelMessage.IStdinMessage,
    context: IExecuteContext,
    future: IShellFuture<KernelMessage.IExecuteRequestMsg, KernelMessage.IExecuteReplyMsg>,
): Promise<void> {
    switch (message.header.msg_type) {
        case "input_request": {
            const content = message.content as {
                prompt?: string;
                password?: boolean;
            };

            // eslint-disable-next-line ts/no-use-before-define
            const value = await bridge.singleCall<PluginHandlers["inputRequest"]>(
                "inputRequest",
                context.client.id,
                context.code.id,
                context.client.id,
                content.prompt ?? "",
            ) ?? "";

            const code = `\`${content.password ? "*".repeat(value.length) : value}\``;
            const kramdown = content.prompt
                ? `\`${content.prompt}\`: ${code}`
                : code;

            context.output.hrs.stream.used = true;
            await insertBlock(
                context,
                context.output.hrs.stream.id,
                kramdown,
            );

            future.sendInputReply(
                {
                    value,
                    status: "ok",
                },
                message.header as IHeader<"input_request">,
            );
            break;
        }
        case "input_reply":
        default:
            break;
    }
}

/**
 * 处理 `execute_reply` 消息
 * @param message - `execute_reply` 消息
 * @param context - 执行上下文
 */
async function handleExecuteReplyMessage(
    message: KernelMessage.IExecuteReplyMsg,
    context: IExecuteContext,
): Promise<void> {
    context.output.reply = true;

    /* 块运行结束时间 */
    context.code.attrs[CONSTANTS.attrs.code.execute_reply] = message.header.date;

    /* 块运行用时 */
    const start = moment((message.metadata.started || message.parent_header.date) as string);
    const end = moment(message.header.date as string);
    const duration = moment.unix(end.diff(start) / 1_000).utc();
    context.code.attrs[CONSTANTS.attrs.code.time] = `${i18n.messages.lastRunTime.text
    }: ${start.format(CONSTANTS.JUPYTER_LAST_RUN_TIME_FORMAT)
    } | ${i18n.messages.runtime.text
    }: ${duration.format(CONSTANTS.JUPYTER_RUNTIME_FORMAT)} `;

    /* 块运行序号 */
    const execution_count = message.content.execution_count
        ? message.content.execution_count.toString()
        : null;

    switch (message.content.status) {
        /* 正常运行 */
        case "ok": {
            context.code.attrs[CONSTANTS.attrs.code.index] = execution_count;
            context.output.attrs[CONSTANTS.attrs.output.index] = execution_count;

            /* ?? 输出 */
            const payload = message.content.payload;
            if (payload && Array.isArray(payload) && payload.length > 0) {
                const kramdowns: string[] = [];
                for (const item of payload) {
                    if (item?.data) {
                        const kramdown = await parseData(
                            client,
                            context.output.options,
                            item.data as IData,
                            item.metadata as Record<string, string>,
                        );
                        kramdowns.push(kramdown);
                    }
                }

                context.output.hrs.execute_reply.used = true;
                await client.insertBlock({
                    nextID: context.output.hrs.execute_reply.id,
                    data: [
                        "{{{row",
                        kramdowns.join("\n\n"),
                        "}}}",
                    ].join("\n"),
                    dataType: "markdown",
                });
            }
            break;
        }

        /* 出现异常 */
        case "error": {
            /* 使用代码块输出运行错误 */
            const kramdown = [
                "```plaintext",
                new Output(message.content.traceback.join("\n"))
                    // .removeCmdControlChars()
                    .stripAnsi()
                    .toString(),
                "```",
                createIAL({ style: CONSTANTS.styles.error }),
            ].join("\n");

            context.output.hrs.execute_reply.used = true;
            await client.insertBlock({
                nextID: context.output.hrs.execute_reply.id,
                data: kramdown,
                dataType: "markdown",
            });

            context.code.attrs[CONSTANTS.attrs.code.index] = execution_count;
            context.output.attrs[CONSTANTS.attrs.output.index] = "E";
            break;
        }

        /* 发生中断 */
        case "abort":
            // @ts-expect-error 未定义的类型 aborted
            // fallthrough
        case "aborted": {
            context.code.attrs[CONSTANTS.attrs.code.index] = " ";
            context.output.attrs[CONSTANTS.attrs.output.index] = " ";
            break;
        }
        default:
            break;
    }

    /* 更新块属性 */
    await updateBlockAttrs(context);

    /* 移除未使用的分割线 */
    const hrs = context.output.hrs;
    const ids: string[] = [];
    if (!(hrs.stream.used && (hrs.error.used || hrs.display_data.used || hrs.execute_result.used || hrs.execute_reply.used)))
        ids.push(hrs.stream.id);
    if (!(hrs.error.used && (hrs.display_data.used || hrs.execute_result.used || hrs.execute_reply.used)))
        ids.push(hrs.error.id);
    if (!(hrs.display_data.used && (hrs.execute_result.used || hrs.execute_reply.used)))
        ids.push(hrs.display_data.id);
    if (!(hrs.execute_result.used && hrs.execute_reply.used))
        ids.push(hrs.execute_result.id);
    ids.push(hrs.execute_reply.id);
    for (const id of ids) {
        await client.deleteBlock({ id });
    }
}

/* 👇由插件调用👇 */

/* 加载 */
export async function onload(i18n_: I18N): Promise<void> {
    i18n = i18n_;
}

/* 卸载 */
export async function unload(): Promise<void> {
    jupyter?.dispose();
    jupyter = undefined;

    // @ts-expect-error 未定义
    self.jupyter = jupyter;
}

/* 重置 (加载后与更新设置选项后) */
export function restart(): void {
    jupyter?.dispose();
    jupyter = config.jupyter.server.enable
        ? new Jupyter(
                config.jupyter.server.settings,
                logger,
                (_manager: KernelSpec.IManager, models: KernelSpec.ISpecModels) => {
                // logger.debug(models);
                // eslint-disable-next-line ts/no-use-before-define
                    bridge.call<PluginHandlers["updateKernelSpecs"]>(
                        "updateKernelSpecs",
                        models,
                    );
                },
                (_manager: Kernel.IManager, models: Kernel.IModel[]) => {
                // logger.debug(models);
                // eslint-disable-next-line ts/no-use-before-define
                    bridge.call<PluginHandlers["updateKernels"]>(
                        "updateKernels",
                        models,
                    );
                },
                (_manager: Session.IManager, models: Session.IModel[]) => {
                // logger.debug(models);
                // eslint-disable-next-line ts/no-use-before-define
                    bridge.call<PluginHandlers["updateSessions"]>(
                        "updateSessions",
                        models,
                    );
                },
            )
        : undefined;

    // @ts-expect-error 未定义
    self.jupyter = jupyter;
}

/* 更新设置选项 */
export function updateConfig(
    config_: IConfig,
): void {
    Object.assign(config, config_);
}

/**
 * 导入 *.ipynb 文件
 * @param id - 文档块 ID
 * @param file - 文件
 * @param type - 写入类型
 */
export async function importIpynb(
    id: BlockID,
    file: File,
    type: "append" | "override",
): Promise<void> {
    const ipynb_import = new IpynbImport(
        client,
        config,
    );
    await ipynb_import.loadFile(file);
    await ipynb_import.parse();

    const kramdown = ipynb_import.kramdown;
    const attrs = ipynb_import.attrs;

    /* 设置文档块属性 */
    await client.setBlockAttrs({
        id,
        attrs,
    });

    /* 更改文档块内容 */
    switch (type) {
        case "override":
            await client.updateBlock({
                id,
                data: kramdown,
                dataType: "markdown",
            });
            break;
        case "append":
            await client.appendBlock({
                parentID: id,
                data: kramdown,
                dataType: "markdown",
            });
            break;
    }
}

/* 客户端未启动时抛出的异常 */
function _throw<P extends IFunction>(..._args: Parameters<P>): never {
    throw new Error(`Jupyter Client not started!`);
}

void _throw;

/* 客户端未启动时返回 undefined */
function _undefined<P extends IFunction>(..._args: Parameters<P>): undefined {

}

const handlers = {
    "onload": {
        this: self,
        func: onload,
    },
    "unload": {
        this: self,
        func: unload,
    },
    "restart": {
        this: self,
        func: restart,
    },
    "updateConfig": {
        this: self,
        func: updateConfig,
    },
    "jupyter.refresh": { // 刷新资源
        get this() { return jupyter; },
        get func() { return jupyter?.refresh ?? _undefined<Jupyter["refresh"]>; },
    },
    "jupyter.kernelspecs.specs": { // 获取内核清单
        this: self,
        func: () => jupyter?.kernelspecs.specs,
    },
    "jupyter.kernelspecs.refreshSpecs": { // 刷新内核清单
        get this() { return jupyter?.kernelspecs; },
        get func() { return jupyter?.kernelspecs.refreshSpecs ?? _undefined<Jupyter["kernelspecs"]["refreshSpecs"]>; },
    },
    "jupyter.kernels.running": { // 获取正在运行的内核
        this: self,
        func(): Kernel.IModel[] {
            return jupyter?.kernels.running
                ? Array.from(jupyter.kernels.running())
                : [];
        },
    },
    "jupyter.kernels.refreshRunning": { // 刷新正在运行的内核
        get this() { return jupyter?.kernels; },
        get func() { return jupyter?.kernels.refreshRunning ?? _undefined<Jupyter["kernels"]["refreshRunning"]>; },
    },
    "jupyter.kernels.shutdown": { // 关闭指定内核
        get this() { return jupyter?.kernels; },
        get func() { return jupyter?.kernels.shutdown ?? _undefined<Jupyter["kernels"]["shutdown"]>; },
    },
    "jupyter.kernels.shutdownAll": { // 关闭所有内核
        get this() { return jupyter?.kernels; },
        get func() { return jupyter?.kernels.shutdownAll ?? _undefined<Jupyter["kernels"]["shutdownAll"]>; },
    },
    "jupyter.sessions.running": { // 获取正在运行的会话
        this: self,
        func(): Session.IModel[] {
            return jupyter?.sessions.running
                ? Array.from(jupyter.sessions.running())
                : [];
        },
    },
    "jupyter.sessions.refreshRunning": { // 刷新正在运行的会话
        get this() { return jupyter?.sessions; },
        get func() { return jupyter?.sessions.refreshRunning ?? _undefined<Jupyter["sessions"]["refreshRunning"]>; },
    },
    "jupyter.sessions.startNew": { // 创建新会话并连接
        this: self,
        async func(
            docID: string,
            ...args: Parameters<Jupyter["sessions"]["startNew"]>
        ): Promise<Session.IModel | undefined> {
            const connection = await jupyter?.sessions.startNew(...args);
            if (connection) {
                id_2_session_connection.set(connection.id, connection);
                bindSessionConnectionSignalListener(docID, connection);
                return connection.model;
            }
            return undefined;
        },
    },
    "jupyter.sessions.connectTo": { // 连接到正在运行的会话
        this: self,
        async func(
            docID: string,
            ...args: Parameters<Jupyter["sessions"]["connectTo"]>
        ): Promise<Session.IModel | undefined> {
            const connection = await jupyter?.sessions.connectTo(...args);
            if (connection) {
                id_2_session_connection.set(connection.id, connection);
                bindSessionConnectionSignalListener(docID, connection);
                return connection.model;
            }
            return undefined;
        },
    },
    "jupyter.sessions.shutdown": { // 关闭指定会话
        get this() { return jupyter?.sessions; },
        get func() { return jupyter?.sessions.shutdown ?? _undefined<Jupyter["sessions"]["shutdown"]>; },
    },
    "jupyter.sessions.shutdownAll": { // 关闭所有会话
        get this() { return jupyter?.sessions; },
        get func() { return jupyter?.sessions.shutdownAll ?? _undefined<Jupyter["sessions"]["shutdownAll"]>; },
    },
    "jupyter.session.connection.setName": { // 设置会话名称
        this: self,
        async func(
            id: string, // 会话 ID
            name: string, // 会话新名称
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.setName(name);
            }
            return connection?.model;
        },
    },
    "jupyter.session.connection.setPath": { // 设置会话路径
        this: self,
        async func(
            id: string, // 会话 ID
            path: string, // 会话新路径
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.setPath(path);
            }
            return connection?.model;
        },
    },
    "jupyter.session.connection.setType": { // 设置会话类型
        this: self,
        async func(
            id: string, // 会话 ID
            type: string, // 会话新类型
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.setType(type);
            }
            return connection?.model;
        },
    },
    "jupyter.session.connection.changeKernel": { // 更改会话内核
        this: self,
        async func(
            id: string, // 会话 ID
            kernel: { id: string } | { name: string } | object, // 会话内核 ID/名称
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                const connection_kernel = await connection.changeKernel(kernel);
                void connection_kernel;
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.reconnect": { // 重建与内核的连接
        this: self,
        async func(
            id: string, // 会话 ID
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.kernel?.reconnect();
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.interrupt": { // 中止内核运行
        this: self,
        async func(
            id: string, // 会话 ID
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.kernel?.interrupt();
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.restart": { // 重启内核
        this: self,
        async func(
            id: string, // 会话 ID
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.kernel?.restart();
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.shutdown": { // 关闭内核
        this: self,
        async func(
            id: string, // 会话 ID
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(id);
            if (connection) {
                await connection.kernel?.shutdown();
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.requestExecute": { // 运行代码
        this: self,
        async func(
            clientID: string, // 客户端 ID
            code: string, // 代码
            codeID: string, // 代码块 ID
            sessionID: string, // 会话 ID
            options: IJupyterParserOptions, // 代码块解析选项
            goto: boolean, // 运行时是否跳转到对应代码块
            ...args: any[]
        ): Promise<Session.IModel | undefined> {
            const connection = id_2_session_connection.get(sessionID);
            if (connection) {
                await executeCode(
                    clientID,
                    code,
                    codeID,
                    connection,
                    options,
                    goto,
                    ...args,
                );
            }
            return connection?.model;
        },
    },
    "jupyter.session.kernel.connection.requestComplete": { // 请求自动补全
        this: self,
        async func(
            sessionID: string, // 会话 ID
            content: KernelMessage.ICompleteRequestMsg["content"], // 请求内容
        ): Promise<KernelMessage.ICompleteReplyMsg | undefined> {
            const connection = id_2_session_connection.get(sessionID);
            const message = await connection?.kernel?.requestComplete(content);
            return message;
        },
    },
    "jupyter.session.kernel.connection.requestInspect": { // 请求上下文参考
        this: self,
        async func(
            sessionID: string, // 会话 ID
            content: KernelMessage.IInspectRequestMsg["content"], // 请求内容
        ): Promise<KernelMessage.IInspectReplyMsg | undefined> {
            const connection = id_2_session_connection.get(sessionID);
            const message = await connection?.kernel?.requestInspect(content);
            return message;
        },
    },
    "importIpynb": {
        this: self,
        func: importIpynb,
    },
} as const satisfies IHandlers;

// export type WorkerHandlers = THandlersWrapper<typeof handlers>;
export type WorkerHandlers = typeof handlers;

const channel = new BroadcastChannel(CONSTANTS.JUPYTER_WORKER_BROADCAST_CHANNEL_NAME);
const bridge = new WorkerBridgeSlave(
    channel,
    logger,
    handlers,
);
