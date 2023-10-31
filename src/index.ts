/**
 * Copyright (C) 2023 Zuoqiu Yingyi
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import siyuan from "siyuan";
import type {
    BlockID,
    ISiyuanGlobal,
} from "@workspace/types/siyuan";

import manifest from "~/public/plugin.json";

import "./index.less";

import icon_jupyter_client from "./assets/symbols/icon-jupyter-client.symbol?raw";
import icon_jupyter_client_inspect from "./assets/symbols/icon-jupyter-client-inspect.symbol?raw";
import icon_jupyter_client_text from "./assets/symbols/icon-jupyter-client-text.symbol?raw";
import icon_jupyter_client_simple from "./assets/symbols/icon-jupyter-client-simple.symbol?raw";
import icon_jupyter_client_terminal from "./assets/symbols/icon-jupyter-client-terminal.symbol?raw";
import icon_jupyter_client_kernelspec from "./assets/symbols/icon-jupyter-client-kernelspec.symbol?raw";
import icon_jupyter_client_kernel from "./assets/symbols/icon-jupyter-client-kernel.symbol?raw";
import icon_jupyter_client_kernel_unknown from "./assets/symbols/icon-jupyter-client-kernel-unknown.symbol?raw";
import icon_jupyter_client_kernel_starting from "./assets/symbols/icon-jupyter-client-kernel-starting.symbol?raw";
import icon_jupyter_client_kernel_idle from "./assets/symbols/icon-jupyter-client-kernel-idle.symbol?raw";
import icon_jupyter_client_kernel_busy from "./assets/symbols/icon-jupyter-client-kernel-busy.symbol?raw";
import icon_jupyter_client_kernel_terminating from "./assets/symbols/icon-jupyter-client-kernel-terminating.symbol?raw";
import icon_jupyter_client_kernel_restarting from "./assets/symbols/icon-jupyter-client-kernel-restarting.symbol?raw";
import icon_jupyter_client_kernel_autorestarting from "./assets/symbols/icon-jupyter-client-kernel-autorestarting.symbol?raw";
import icon_jupyter_client_kernel_dead from "./assets/symbols/icon-jupyter-client-kernel-dead.symbol?raw";
import icon_jupyter_client_session from "./assets/symbols/icon-jupyter-client-session.symbol?raw";
import icon_jupyter_client_session_console from "./assets/symbols/icon-jupyter-client-session-console.symbol?raw";
import icon_jupyter_client_session_notebook from "./assets/symbols/icon-jupyter-client-session-notebook.symbol?raw";

import * as sdk from "@siyuan-community/siyuan-sdk";

import Item from "@workspace/components/siyuan/menu/Item.svelte"
import JupyterTab from "@workspace/components/siyuan/tab/IframeTab.svelte";
import Settings from "./components/Settings.svelte";
import JupyterDock from "./components/JupyterDock.svelte";
import JupyterInspectDock from "./components/JupyterInspectDock.svelte";
import SessionManager from "./components/SessionManager.svelte";
import XtermOutputElement from "./components/XtermOutputElement";
import { asyncPrompt } from "@workspace/components/siyuan/dialog/prompt";

import {
    FLAG_MOBILE,
} from "@workspace/utils/env/front-end";
import {
    getBlockMenuContext,
    type IBlockMenuContext,
} from "@workspace/utils/siyuan/menu/block";
import {
    getCurrentBlock,
    getCurrentBlockID,
    isSiyuanBlock,
    isSiyuanDocument,
    isSiyuanDocumentTitle,
    type ICodeBlockCursorPosition,
    getCodeBlockCursorPosition,
} from "@workspace/utils/siyuan/dom";
import { Logger } from "@workspace/utils/logger";
import { fn__code } from "@workspace/utils/siyuan/text/span";
import { mergeIgnoreArray } from "@workspace/utils/misc/merge";
import { WorkerBridgeMaster } from "@workspace/utils/worker/bridge/master";
import { sleep } from "@workspace/utils/misc/sleep";
import { Counter } from "@workspace/utils/misc/iterator";
import { toUint8Array } from "@workspace/utils/misc/base64";
import { encode } from "@workspace/utils/misc/base64";
import { select } from "@workspace/utils/dom/selection";
import { replaceRangeWithText } from "@workspace/utils/dom/range";
import { openWindow } from "@workspace/utils/window/open";
import uuid from "@workspace/utils/misc/uuid";

import CONSTANTS from "./constants";
import { DEFAULT_SETTINGS } from "./jupyter/settings";
import { DEFAULT_CONFIG } from "./configs/default";
import {
    LIGHT_ICON_MAP,
    DARK_ICON_MAP,
} from "./jupyter/icon";
import {
    blockDOM2codeCells,
    buildNewCodeCell,
    getActiveCellBlocks,
    isCodeCell,
    isOutputCell,
    type ICodeCell,
    type ICodeCellBlocks,
} from "./utils/cell";

import type { I18N } from "./utils/i18n";
import type {
    IConfig,
    IJupyterParserOptions,
} from "./types/config";
import type {
    KernelSpec,
    Kernel,
    Session,
} from "@jupyterlab/services";
import type {
    IClickBlockIconEvent,
    IClickEditorContentEvent,
    IClickEditorTitleIconEvent,
    IDestroyProtyleEvent,
    ILoadedProtyleStaticEvent,
    ISwitchProtyleEvent,
} from "@workspace/types/siyuan/events";
import type { THandlersWrapper } from "@workspace/utils/worker/bridge";
import type { WorkerHandlers } from "./workers/jupyter";
import type { ComponentEvents } from "svelte";
import type xterm from "xterm";
import type { IProtyle } from "siyuan/types/protyle";
import { deshake } from "@workspace/utils/misc/deshake";
import { isLightTheme } from "@workspace/utils/siyuan/theme";
import { isMatchedKeyboardEvent } from "@workspace/utils/shortcut/match";
import type { IKeyboardStatus } from "@workspace/utils/shortcut";
import { escapeHTML } from "@workspace/utils/misc/html";

declare var globalThis: ISiyuanGlobal;
export type PluginHandlers = THandlersWrapper<JupyterClientPlugin["handlers"]>;
export type TMenuContext = IBlockMenuContext | {
    isDocumentBlock: true,
    isMultiBlock: false,
    id: BlockID,
};
export interface IJupyterTab extends siyuan.ITabModel {
    component?: InstanceType<typeof JupyterTab>;
}

export default class JupyterClientPlugin extends siyuan.Plugin {
    static readonly GLOBAL_CONFIG_NAME = "global-config";
    public static readonly CUSTOM_TAB_TYPE_JUPYTER = "-jupyter-tab";

    static readonly EDIT_KEYBOARD_EVENT_STATUS_INSPECT: IKeyboardStatus = {
        type: "keyup",
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        key: (key: string) => /^(\S|Tab|Delete|Backspace|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End)$/.test(key),
    } as const; // 触发上下文帮助的事件
    static readonly EDIT_KEYBOARD_EVENT_STATUS_COMPLATE: IKeyboardStatus = {
        type: "keyup",
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        key: (key: string) => /^(\S|Tab|Delete|Backspace)$/.test(key),
    } as const; // 触发自动补全的事件

    declare public readonly i18n: I18N;

    public readonly siyuan = siyuan;
    public readonly logger: InstanceType<typeof Logger>;
    public readonly client: InstanceType<typeof sdk.Client>;

    protected readonly TOP_BAR_MENU_ID: string;
    protected readonly SETTINGS_DIALOG_ID: string;
    protected readonly CUSTOM_TAB_ID_JUPYTER: string;

    protected readonly jupyterTab: ReturnType<siyuan.Plugin["addTab"]>;
    protected topBarButton?: HTMLElement; // 顶部菜单栏按钮

    public config: IConfig = DEFAULT_CONFIG;
    protected worker?: InstanceType<typeof Worker>; // worker
    public bridge?: InstanceType<typeof WorkerBridgeMaster>; // worker 桥
    protected complating: boolean = false; // 菜单已打开

    protected editEventHandler!: ReturnType<typeof deshake<(
        protyle: IProtyle, // 编辑器
        inspect: boolean, // 上下文帮助
        complate: boolean, // 自动补全
    ) => Promise<void>>>;
    protected readonly protyles = new WeakMap<IProtyle, Parameters<HTMLElement["addEventListener"]>>(); // 已监听的编辑器对象

    protected jupyterDock!: {
        dock: ReturnType<siyuan.Plugin["addDock"]>,
        model?: siyuan.IDockModel,
        component?: InstanceType<typeof JupyterDock>,
    }; // Jupyter 管理面板

    protected jupyterInspectDock!: {
        dock: ReturnType<siyuan.Plugin["addDock"]>,
        model?: siyuan.IDockModel,
        component?: InstanceType<typeof JupyterInspectDock>,
    }; // Jupyter 上下文帮助面板

    public readonly doc2session = new Map<string, Session.IModel>(); // 文档 ID 到会话的映射
    public readonly doc2info = new Map<string, sdk.types.kernel.api.block.getDocInfo.IData>(); // 文档 ID 到文档信息的映射
    public readonly session2docs = new Map<string, Set<string>>(); // 会话 ID 到文档 ID 集合的映射
    public readonly handlers; // 插件暴露给 worker 的方法
    public readonly kernelspecs: KernelSpec.ISpecModels = { default: "", kernelspecs: {} };
    public readonly kernels: Kernel.IModel[] = [];
    public readonly sessions: Session.IModel[] = [];
    public readonly kernelName2logoObjectURL = new Map<string, string>(); // 内核名称 -> object URL
    public readonly kernelName2language = new Map<string, string>(); // 内核名称 -> 内核语言名称
    public readonly kernelName2displayName = new Map<string, string>(); // 内核名称 -> 内核显示名称
    public readonly xtermElements = new Set<InstanceType<ReturnType<typeof XtermOutputElement>>>(); // xterm 组件集合
    public readonly counter = Counter();
    public readonly username = `siyuan-${siyuan.getBackend()}-${siyuan.getFrontend()}`; // 用户名
    public readonly clientId = globalThis.Lute.NewNodeID(); // 客户端 ID

    constructor(options: any) {
        super(options);

        this.logger = new Logger(this.name);
        this.client = new sdk.Client(undefined, "fetch");

        this.TOP_BAR_MENU_ID = `${this.name}-top-bar-menu`;
        this.SETTINGS_DIALOG_ID = `${this.name}-settings-dialog`;
        this.CUSTOM_TAB_ID_JUPYTER = `${this.name}${JupyterClientPlugin.CUSTOM_TAB_TYPE_JUPYTER}`;

        this.handlers = {
            gotoBlock: {
                this: this,
                func: async (
                    blockID: BlockID,
                    clientID: string,
                ) => {
                    if (clientID === this.clientId && this.doc2session.has(blockID)) {
                        await this.gotoBlock(blockID);
                    }
                },
            },
            inputRequest: {
                this: this,
                func: this.inputRequest,
            },
            updateKernelSpecs: {
                this: this,
                func: this.updateKernelSpecs,
            },
            updateKernels: {
                this: this,
                func: this.updateKernels,
            },
            updateSessions: {
                this: this,
                func: this.updateSessions,
            },
        } as const;

        /* 注册页签 */
        this.jupyterTab = this.addTab({
            type: JupyterClientPlugin.CUSTOM_TAB_TYPE_JUPYTER,
            init() {
                // plugin.logger.debug("tab-init");
                // plugin.logger.debug(this);

                const tab: IJupyterTab = this;
                tab.component = new JupyterTab({
                    target: tab.element,
                    props: {
                        ...tab.data,
                    },
                });
            },
            destroy() {
                // plugin.logger.debug("tab-destroy");

                const tab: IJupyterTab = this;
                tab.component?.$destroy();
            },
        });

        /**
         * 注册自定义 HTMLElement 组件
         * REF: https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry
         * REF: https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define
        */
        const XtermOutputElementWrap = XtermOutputElement(this);
        globalThis.customElements.get(XtermOutputElementWrap.TAG_NAME)
            ?? globalThis.customElements.define(
                XtermOutputElementWrap.TAG_NAME,
                XtermOutputElementWrap,
            );

        /* 初始化编辑事件处理函数 */
        this.updateEditEventHandler();
    }

    onload(): void {
        // this.logger.debug(this);

        /* 注册图标 */
        this.addIcons([
            icon_jupyter_client,
            icon_jupyter_client_inspect,
            icon_jupyter_client_text,
            icon_jupyter_client_simple,
            icon_jupyter_client_terminal,
            icon_jupyter_client_kernelspec,
            icon_jupyter_client_kernel,
            icon_jupyter_client_kernel_unknown,
            icon_jupyter_client_kernel_starting,
            icon_jupyter_client_kernel_idle,
            icon_jupyter_client_kernel_busy,
            icon_jupyter_client_kernel_terminating,
            icon_jupyter_client_kernel_restarting,
            icon_jupyter_client_kernel_autorestarting,
            icon_jupyter_client_kernel_dead,
            icon_jupyter_client_session,
            icon_jupyter_client_session_console,
            icon_jupyter_client_session_notebook,
        ].join(""));

        /* 注册侧边栏 */
        const plugin = this;
        this.jupyterDock = {
            dock: this.addDock({
                config: {
                    position: "LeftTop",
                    size: { width: 256, height: 0 },
                    icon: "icon-jupyter-client",
                    title: this.i18n.dock.title,
                    show: true,
                },
                data: {
                },
                type: "-dock",
                init() {
                    // plugin.logger.debug(this);

                    this.element.classList.add("fn__flex-column");
                    const dock = new JupyterDock({
                        target: this.element,
                        props: {
                            plugin,
                            ...this.data,
                            kernelspecs: plugin.kernelspecs,
                            kernels: plugin.kernels,
                            sessions: plugin.sessions,
                        },
                    });
                    plugin.jupyterDock.model = this;
                    plugin.jupyterDock.component = dock;
                },
                destroy() {
                    plugin.jupyterDock.component?.$destroy();
                    delete plugin.jupyterDock.component;
                    delete plugin.jupyterDock.model;
                },
            }),
        };
        this.jupyterInspectDock = {
            dock: this.addDock({
                config: {
                    position: "BottomLeft",
                    size: { width: 256, height: 0 },
                    icon: "icon-jupyter-client-inspect",
                    title: this.i18n.inspectDock.title,
                    show: true,
                },
                data: {
                    stream: "",
                },
                type: "-inspect-dock",
                init() {
                    // plugin.logger.debug(this);

                    this.element.classList.add("fn__flex-column");
                    const dock = new JupyterInspectDock({
                        target: this.element,
                        props: {
                            plugin,
                            ...this.data,
                        },
                    });
                    plugin.jupyterInspectDock.model = this;
                    plugin.jupyterInspectDock.component = dock;
                },
                destroy() {
                    plugin.jupyterInspectDock.component?.$destroy();
                    delete plugin.jupyterInspectDock.component;
                    delete plugin.jupyterInspectDock.model;
                },
            }),
        };

        /**
         * 注册快捷键命令
         * 在 onload 结束后即刻解析, 因此不能在回调函数中注册
         */
        this.addCommand({ // 仅运行所选代码单元格 / 光标所在代码块
            langKey: "run-selected-cells",
            langText: this.i18n.commands.runSelectedCells.text,
            hotkey: "⌘↩", // 默认快捷键 Ctrl + Enter
            customHotkey: "⌘↩", // 自定义快捷键
            editorCallback: async () => {
                /* 运行当前所选的块 */
                const blocks = await this.executeSelectedCellBlocks();

                /* 跳转到到最后一个块 */
                const last_cell = blocks.cells.at(-1);
                if (last_cell) {
                    // await sleep(250);
                    await this.gotoBlock(last_cell.id, false);
                }
            },
        });

        this.addCommand({ // 运行所选代码单元格 / 光标所在代码块并跳转到下一个代码单元格
            langKey: "run-selected-cells-and-goto-next",
            langText: this.i18n.commands.runSelectedCellsAndGotoNext.text,
            hotkey: "⇧↩", // 默认快捷键 Shift + Enter
            customHotkey: "⇧↩", // 自定义快捷键
            editorCallback: async () => {
                /* 运行当前所选的块 */
                const blocks = await this.executeSelectedCellBlocks();

                /* 获取下一个代码单元格 */
                const next_cell = await this.getNextCodeCell(blocks);

                if (next_cell) { // 存在下一个代码单元格
                    /* 跳转到下一个代码单元格 */
                    // await sleep(250);
                    await this.gotoBlock(next_cell.id, false);
                }
                else { // 不存在下一个代码单元格
                    if (blocks.cells.length == 0) return; // 仅在当前为代码单元格时才会插入

                    /* 插入新代码单元格 */
                    const new_cell = await this.insertNewCodeCell(blocks);

                    /* 跳转到刚刚插入的单元格 */
                    if (new_cell) {
                        // await sleep(250);
                        await this.gotoBlock(new_cell.id, false);
                    }
                }
            },
        });

        this.addCommand({ // 运行所选代码块/光标所在代码块并插入新代码单元格
            langKey: "run-selected-cells-and-insert-below",
            langText: this.i18n.commands.runSelectedCellsAndInsertBelow.text,
            hotkey: "⌥↩", // 默认快捷键 Alt + Enter
            customHotkey: "⌥↩", // 自定义快捷键
            editorCallback: async () => {
                /* 运行当前所选的块 */
                const blocks = await this.executeSelectedCellBlocks();

                /* 插入新代码单元格 */
                const new_cell = await this.insertNewCodeCell(blocks);

                /* 跳转到刚刚插入的单元格 */
                if (new_cell) {
                    // await sleep(250);
                    await this.gotoBlock(new_cell.id, false);
                }
            },
        });

        this.addCommand({ // 在新页签中打开 Jupyter
            langKey: "open-jupyter-tab",
            langText: this.i18n.commands.openJupyterTab.text,
            hotkey: "", // 默认快捷键
            customHotkey: "", // 自定义快捷键
            callback: this.openJupyterTab,
        });
        this.addCommand({ // 在浏览器中打开 Jupyter
            langKey: "open-jupyter-browser",
            langText: this.i18n.commands.openJupyterBrowser.text,
            hotkey: "", // 默认快捷键
            customHotkey: "", // 自定义快捷键
            callback: this.openJupyterBrowser,
        });
        this.addCommand({ // 在新窗口中打开 Jupyter
            langKey: "open-jupyter-window",
            langText: this.i18n.commands.openJupyterWindow.text,
            hotkey: "", // 默认快捷键
            customHotkey: "", // 自定义快捷键
            callback: this.openJupyterWindow,
        });

        /* 加载数据 */
        this.loadData(JupyterClientPlugin.GLOBAL_CONFIG_NAME)
            .then(config => {
                this.config = mergeIgnoreArray(DEFAULT_CONFIG, config || {}) as IConfig;
            })
            .catch(error => this.logger.error(error))
            .finally(async () => {
                /* 初始化 channel */
                this.initBridge();
                const runing = await this.isWorkerRunning();

                if (!runing) { // worker 未正常运行
                    /* 初始化 worker */
                    this.initWorker();

                    /* 等待 worker 正常运行 */
                    while (await this.isWorkerRunning()) {
                        await sleep(1_000)
                    }

                    /* 初始化 worker 配置 */
                    await this.bridge?.call<WorkerHandlers["onload"]>(
                        "onload",
                        this.i18n,
                    );
                    await this.updateWorkerConfig(true);
                }
                else { // worker 已正常运行, 强制刷新 jupyter 资源列表
                    await this.jupyterForceRefresh();
                }

                /* 注册事件监听器 */
                this.eventBus.on("click-editortitleicon", this.blockMenuEventListener);
                this.eventBus.on("click-blockicon", this.blockMenuEventListener);
                this.eventBus.on("click-editorcontent", this.clickEditorContentEventListener);
                this.eventBus.on("loaded-protyle-static", this.loadedProtyleEventListener);
                this.eventBus.on("switch-protyle", this.loadedProtyleEventListener);
                this.eventBus.off("destroy-protyle", this.destroyProtyleEventListener);
            });
    }

    onLayoutReady(): void {
        /* 添加菜单项 */
        this.topBarButton = this.addTopBar({
            icon: "icon-jupyter-client",
            title: this.displayName,
            position: "right",
            callback: e => {
                const menu = new siyuan.Menu(this.TOP_BAR_MENU_ID);
                menu.addItem({
                    icon: "iconLayout",
                    label: this.i18n.commands.openJupyterTab.text,
                    click: this.openJupyterTab,
                });
                menu.addItem({
                    icon: "iconOpen",
                    label: this.i18n.commands.openJupyterBrowser.text,
                    click: this.openJupyterBrowser,
                });
                menu.addItem({
                    icon: "iconOpenWindow",
                    label: this.i18n.commands.openJupyterWindow.text,
                    click: this.openJupyterWindow,
                });
                if (FLAG_MOBILE) {
                    menu.fullscreen();
                }
                else {
                    menu.open({
                        x: globalThis.siyuan?.coordinates?.pageX ?? 0,
                        y: globalThis.siyuan?.coordinates?.pageY ?? 0,
                        isLeft: true,
                    });
                }
            },
        });
    }

    onunload(): void {
        this.eventBus.off("click-editortitleicon", this.blockMenuEventListener);
        this.eventBus.off("click-blockicon", this.blockMenuEventListener);
        this.eventBus.off("click-editorcontent", this.clickEditorContentEventListener);
        this.eventBus.off("loaded-protyle-static", this.loadedProtyleEventListener);
        this.eventBus.off("switch-protyle", this.loadedProtyleEventListener);
        this.eventBus.off("destroy-protyle", this.destroyProtyleEventListener);

        for (const objectURL of this.kernelName2logoObjectURL.values()) {
            URL.revokeObjectURL(objectURL);
        }

        this.doc2session.clear();
        this.doc2info.clear();
        this.session2docs.clear();
        this.kernelName2logoObjectURL.clear();
        this.kernelName2language.clear();
        this.kernelName2displayName.clear();

        if (this.worker) {
            this.bridge
                ?.call<WorkerHandlers["unload"]>("unload")
                .then(() => {
                    this.bridge?.terminate();
                    this.bridge = undefined;

                    this.worker?.terminate();
                    this.worker = undefined;
                });
        }
        else {
            this.bridge?.terminate();
            this.bridge = undefined;
        }
    }

    openSetting(): void {
        const that = this;
        const dialog = new siyuan.Dialog({
            title: `${this.i18n.displayName} <code class="fn__code">${this.name}</code>`,
            content: `<div id="${that.SETTINGS_DIALOG_ID}" class="fn__flex-column" />`,
            width: FLAG_MOBILE ? "92vw" : "720px",
            height: FLAG_MOBILE ? undefined : "640px",
        });
        const target = dialog.element.querySelector(`#${that.SETTINGS_DIALOG_ID}`);
        if (target) {
            const settings = new Settings({
                target,
                props: {
                    config: this.config,
                    plugin: this,
                },
            });
        }
    }

    public get baseUrl(): string {
        return this.config?.jupyter.server.settings.baseUrl || DEFAULT_SETTINGS.baseUrl;
    }

    public get newClientId(): string {
        return globalThis.Lute.NewNodeID();
    }

    /* 重置插件配置 */
    public async resetConfig(restart: boolean = true): Promise<void> {
        return this.updateConfig(
            mergeIgnoreArray(DEFAULT_CONFIG) as IConfig,
            restart,
        );
    }

    /* 更新插件配置 */
    public async updateConfig(
        config?: IConfig,
        restart: boolean = false,
    ): Promise<void> {
        if (config && config !== this.config) {
            this.config = config;
        }
        this.updateXtermElement();
        this.updateEditEventHandler();
        await this.updateWorkerConfig(restart);
        await this.saveData(JupyterClientPlugin.GLOBAL_CONFIG_NAME, this.config);
    }

    /* 初始化通讯桥 */
    protected initBridge(): void {
        this.bridge?.terminate();
        this.bridge = new WorkerBridgeMaster(
            new BroadcastChannel(CONSTANTS.JUPYTER_WORKER_BROADCAST_CHANNEL_NAME),
            this.logger,
            this.handlers,
            this.clientId,
        );
    }

    /* 初始化 worker */
    protected initWorker(): void {
        this.worker?.terminate();
        this.worker = new Worker(
            `${globalThis.document.baseURI}plugins/${this.name}/workers/${CONSTANTS.JUPYTER_WORKER_FILE_NAME}.js?v=${manifest.version}`,
            {
                type: "module",
                name: this.name,
                credentials: "same-origin",
            },
        );
    }

    /* web worker 是否正在运行 */
    protected async isWorkerRunning(): Promise<boolean> {
        try {
            /* 若 bridge 未初始化, 需要初始化 */
            if (!this.bridge) this.initBridge();

            /* 检测 Worker 是否已加载完成 */
            await this.bridge!.ping();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    /**
     * 判断一个会话 id 是否为运行的会话
     * @param id 会话 id
     * @returns 是否存在
     */
    public isSessionRunning(id: string): boolean {
        return this.sessions.some(s => s.id === id);
    }

    /**
     * 判断一个会话 id 是否为连接的会话
     * @param id 会话 id
     * @returns 是否存在
     */
    public isSessionConnected(id: string): boolean {
        return this.session2docs.has(id);
    }

    /**
     * 关联一个文档 ID 与 一个会话 model
     * @param docID 文档 ID
     * @param session 会话 model
     */
    public relateDoc2Session(docID: string, session: Session.IModel): void {
        /* 移除原关联 */
        const session_old = this.doc2session.get(docID);
        if (session_old) {
            const doc_set = this.session2docs.get(session_old.id);
            if (doc_set) {
                doc_set.delete(docID);
                if (doc_set.size === 0) {
                    this.session2docs.delete(session_old.id);
                }
            }
        }

        /* 更新 文档 ID -> 会话 Model */
        this.doc2session.set(docID, session);

        /* 更新 会话 ID -> 文档 ID 集合 */
        const doc_set = this.session2docs.get(session.id) ?? new Set<string>();
        doc_set.add(docID);
        this.session2docs.set(session.id, doc_set);
    }

    /* 更新 worker 配置 */
    public async updateWorkerConfig(restart: boolean): Promise<void> {
        await this.bridge?.call<WorkerHandlers["updateConfig"]>(
            "updateConfig",
            this.config,
        );
        if (restart) {
            await this.bridge?.call<WorkerHandlers["restart"]>("restart");
        }
    }

    /* 更新 xterm 组件配置 */
    public updateXtermElement(options: xterm.ITerminalOptions = this.config.xterm.options): void {
        for (const element of this.xtermElements) {
            if (element.terminal) {
                for (const [key, value] of Object.entries(options)) {
                    // @ts-ignore
                    if (element.terminal.options[key] !== value) {
                        // @ts-ignore
                        element.terminal.options[key] = value;
                    }
                }
            }
        }
    }

    /* 更新编辑事件处理函数 */
    public updateEditEventHandler(delay: number = this.config.jupyter.edit.delay): void {
        this.editEventHandler = deshake(async (
            protyle: IProtyle,
            inspect: boolean,
            complate: boolean,
        ) => {
            if (inspect || complate) {
                const session = this.doc2session.get(protyle.block.rootID!);
                if (session) { // 当前文档已连接会话
                    const block = getCurrentBlock();
                    if (isCodeCell(block)) { // 当前块是代码单元格
                        const position = getCodeBlockCursorPosition();
                        if (position) { // 成功获取光标位置
                            const promises: Promise<any>[] = [];
                            if (inspect) {
                                promises.push(this.requestInspect( // 更新上下文帮助
                                    session.id,
                                    position,
                                ));
                            }
                            if (complate) {
                                promises.push(this.requestComplete( // 自动补全
                                    session.id,
                                    position,
                                ));
                            }
                            await Promise.allSettled(promises);
                        }
                    }
                }
            }
        }, delay);
    }

    /**
     * jupyter 请求
     * @param pathname 请求路径
     * @param init 请求参数
     * @returns 响应体
     */
    public async jupyterFetch(
        pathname: string,
        init: RequestInit = {},
    ): Promise<Blob> {
        const url = new URL(this.baseUrl);
        if (pathname.startsWith("/")) {
            url.pathname = pathname;
        }
        else {
            url.pathname = `${url.pathname}/${pathname}`;
        }

        const headers: Record<string, string> = {
            Authorization: `token ${this.config.jupyter.server.settings.token}`,
        };

        if (init.headers) {
            Object.assign(headers, init.headers);
        }
        else {
            init.headers = headers;
        }

        /* 避免跨站策略阻止请求 */
        const response = await this.client.forwardProxy({
            url: url.href,
            // @ts-ignore
            method: init.method,
            headers: [init.headers as Record<string, string>],
            responseEncoding: "base64",
        });
        if (200 <= response.data.status && response.data.status < 300) {
            return new Blob([toUint8Array(response.data.body)], { type: response.data.contentType });
        }
        else {
            throw new Error(response.msg);
        }
    }

    /**
     * 强制刷新 jupyter 资源列表
     */
    public async jupyterForceRefresh(): Promise<void> {
        const results = await Promise.allSettled([
            this.bridge?.call<WorkerHandlers["jupyter.kernelspecs.specs"]>(
                "jupyter.kernelspecs.specs",
            ),
            this.bridge?.call<WorkerHandlers["jupyter.kernels.running"]>(
                "jupyter.kernels.running",
            ),
            this.bridge?.call<WorkerHandlers["jupyter.sessions.running"]>(
                "jupyter.sessions.running",
            ),
        ]);

        if (results[0].status === "fulfilled" && results[0].value) {
            this.updateKernelSpecs(results[0].value);
        }
        if (results[1].status === "fulfilled" && results[1].value) {
            this.updateKernels(results[1].value);
        }
        if (results[2].status === "fulfilled" && results[2].value) {
            this.updateSessions(results[2].value);
        }
    }

    /**
     * 加载内核图标
     * @param spec 内核清单
     * @param defaultIcon 默认图标
     * @returns 内核图标引用 ID
     */
    public async loadKernelSpecIcon(
        spec: KernelSpec.ISpecModel,
        defaultIcon: string = "#icon-jupyter-client-kernelspec",
    ): Promise<string> {
        if (this.kernelName2logoObjectURL.has(spec.name)) {
            return this.kernelName2logoObjectURL.get(spec.name)!;
        }

        const pathname = (() => {
            switch (true) {
                case "logo-64x64" in spec.resources:
                    return spec.resources["logo-64x64"];
                case "logo-32x32" in spec.resources:
                    return spec.resources["logo-32x32"];
                case "logo-svg" in spec.resources:
                    return spec.resources["logo-svg"];
                default:
                    if (Object.keys(spec.resources).length > 0) {
                        return Object.values(spec.resources)[0];
                    } else {
                        return "";
                    }
            }
        })();

        if (pathname) {
            try {
                const blob = await this.jupyterFetch(
                    pathname,
                    {
                        method: "GET",
                    },
                );

                /* 避免在请求过程中其他协程创建完成导致重复创建 */
                if (this.kernelName2logoObjectURL.has(spec.name)) {
                    return this.kernelName2logoObjectURL.get(spec.name)!;
                } else {
                    const objectURL = URL.createObjectURL(blob);
                    this.kernelName2logoObjectURL.set(spec.name, objectURL);
                    return objectURL;
                }
            } catch (error) {
                this.logger.warn(error);
            }
        }

        this.kernelName2logoObjectURL.set(spec.name, defaultIcon);
        return defaultIcon;
    }

    /**
     * 将会话属性转换为文档块 IAL
     * @param session 会话属性
     * @param remove 是否移除空属性
     */
    public session2ial(
        session: Session.IModel,
        remove: boolean = false,
    ): Record<string, string | null> {
        return {
            [CONSTANTS.attrs.session.id]: session.id,
            [CONSTANTS.attrs.session.name]: session.name,
            [CONSTANTS.attrs.session.path]: session.path,
            [CONSTANTS.attrs.session.type]: session.type,
            ...this.kernel2ial(session.kernel, remove),
        };
    }
    /**
     * 将文档块 IAL 转换为会话属性
     * @param ial 块属性
     * @param init 若块属性为空, 是否对其进行初始化
     */
    public ial2session(
        ial: Record<string, string>,
        init: boolean = false,
    ): Session.IModel {
        const count = this.counter.next().value;
        const id = ial[CONSTANTS.attrs.session.id]
            ?? (init
                ? uuid.v4()
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );
        const name = ial[CONSTANTS.attrs.session.name]
            ?? (init
                ? `siyuan-console-${count}`
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );
        const path = ial[CONSTANTS.attrs.session.path]
            ?? (init
                ? `siyuan-console-${count}-${globalThis.Lute.NewNodeID()}`
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );
        const type = ial[CONSTANTS.attrs.session.type]
            ?? (init
                ? "console"
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );
        const kernel = this.ial2kernel(ial, init);

        return {
            id,
            type,
            name,
            path,
            kernel,
        };
    }

    /**
     * 将内核属性转换为文档块 IAL
     * @param session 内核属性
     * @param remove 是否移除空属性
     */
    public kernel2ial(
        kernel: Kernel.IModel | null,
        remove: boolean = false,
    ): Record<string, string | null | undefined> {
        const kernelspec = (kernel && this.kernelspecs.kernelspecs[kernel.name]) || undefined;
        return {
            [CONSTANTS.attrs.kernel.id]: kernel?.id
                ?? (remove
                    ? null
                    : undefined
                ),
            [CONSTANTS.attrs.kernel.name]: kernel?.name
                ?? (remove
                    ? null
                    : undefined
                ),
            [CONSTANTS.attrs.kernel.language]: kernelspec?.language
                ?? (remove
                    ? null
                    : undefined
                ),
            [CONSTANTS.attrs.kernel.display_name]: kernelspec?.display_name
                ?? (remove
                    ? null
                    : undefined
                ),
        };
    }
    /**
     * 将文档块 IAL 转换为内核属性
     * @param ial 块属性
     * @param init 若为空是否使用默认值
     */
    public ial2kernel(
        ial: Record<string, string>,
        init: boolean = false,
    ): Kernel.IModel | null {
        const id = ial[CONSTANTS.attrs.kernel.id]
            ?? (init
                ? uuid.v4()
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );
        const name = ial[CONSTANTS.attrs.kernel.name]
            ?? (init
                ? this.kernelspecs.default
                : CONSTANTS.JUPYTER_UNKNOWN_VALUE
            );

        return {
            id,
            name,
        };
    }

    /**
     * 构造 jupyter 文档菜单
     * @param id 文档块 ID
     * @param ial 文档块 IAL
     * @param session 菜单项上下文
     * @param context 菜单项上下文
     * @returns 菜单项列表
     */
    public buildJupyterDocumentMenuItems(
        id: string,
        ial: Record<string, string>,
        session: Session.IModel | undefined,
        context: TMenuContext,
    ): siyuan.IMenuItemOption[] {
        const submenu: siyuan.IMenuItemOption[] = [];

        const session_ial = this.ial2session(ial, false);
        const kernel_name = session?.kernel?.name
            ?? session_ial.kernel!.name;
        const kernel_language = this.kernelName2language.get(kernel_name)
            ?? ial[CONSTANTS.attrs.kernel.language]
            ?? CONSTANTS.JUPYTER_UNKNOWN_VALUE;
        const kernel_display_name = this.kernelName2displayName.get(kernel_name)
            ?? ial[CONSTANTS.attrs.kernel.display_name]
            ?? CONSTANTS.JUPYTER_UNKNOWN_VALUE;

        /* 会话管理 */
        submenu.push({
            icon: "icon-jupyter-client-session",
            label: this.i18n.menu.session.label,
            accelerator: session // 当前连接的会话名称
                ? fn__code(session.name)
                : undefined,
            submenu: [
                { // 会话设置
                    icon: "iconSettings",
                    label: this.i18n.menu.session.submenu.settings.label,
                    click: () => {
                        const dialog = new siyuan.Dialog({
                            title: `Jupyter ${this.i18n.settings.sessionSettings.title} <code class="fn__code">${this.name}</code>`,
                            content: `<div id="${this.SETTINGS_DIALOG_ID}" class="fn__flex-column" />`,
                            width: FLAG_MOBILE ? "92vw" : "720px",
                        });
                        const target = dialog.element.querySelector(`#${this.SETTINGS_DIALOG_ID}`);
                        if (target) {
                            const manager = new SessionManager({
                                target,
                                props: {
                                    docID: id,
                                    docIAL: ial,
                                    plugin: this,
                                },
                            });
                            manager.$on("cancel", (e: ComponentEvents<SessionManager>["cancel"]) => {
                                dialog.destroy();
                            });
                            manager.$on("confirm", (e: ComponentEvents<SessionManager>["confirm"]) => {
                                dialog.destroy();
                                this.updateDockFocusItem(id);
                            });
                        }
                    },
                },
                { // 关闭会话
                    icon: "iconRefresh",
                    label: this.i18n.menu.session.submenu.shutdown.label,
                    disabled: !session,
                    click: () => {
                        if (session) {
                            this.bridge?.call<WorkerHandlers["jupyter.sessions.shutdown"]>(
                                "jupyter.sessions.shutdown",
                                session.id,
                            )
                        }
                    },
                },
                {
                    type: "separator",
                },
                {
                    type: "readonly",
                    iconHTML: "",
                    label: this.i18n.menu.session.submenu.info.label
                        .replaceAll("${1}", fn__code(session?.id ?? session_ial.id))
                        .replaceAll("${2}", fn__code(session?.name ?? session_ial.name))
                        .replaceAll("${3}", fn__code(session?.path ?? session_ial.path))
                        .replaceAll("${4}", fn__code(session?.type ?? session_ial.type)),
                    disabled: !session,
                },
            ],
        });

        /* 内核管理 */
        submenu.push({
            icon: "icon-jupyter-client-kernel",
            label: this.i18n.menu.kernel.label,
            accelerator: session?.kernel // 当前连接的内核名称
                ? fn__code(session.kernel.name)
                : undefined,
            submenu: [
                { // 重新连接
                    icon: "iconRefresh",
                    label: this.i18n.menu.kernel.submenu.reconnect.label,
                    disabled: !session?.kernel,
                    click: async () => {
                        if (session?.kernel) {
                            await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.reconnect"]>(
                                "jupyter.session.kernel.connection.reconnect", //
                                session.id, //
                            );
                        }
                    },
                },
                { // 中断内核
                    icon: "iconPause",
                    label: this.i18n.menu.kernel.submenu.interrupt.label,
                    disabled: !session?.kernel,
                    click: async () => {
                        if (session?.kernel) {
                            await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.interrupt"]>(
                                "jupyter.session.kernel.connection.interrupt", //
                                session.id, //
                            );
                        }
                    },
                },
                { // 重启内核
                    icon: "iconRefresh",
                    label: this.i18n.menu.kernel.submenu.restart.label,
                    disabled: !session?.kernel,
                    click: async () => {
                        if (session?.kernel) {
                            await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.restart"]>(
                                "jupyter.session.kernel.connection.restart", //
                                session.id, //
                            );
                        }
                    },
                },
                { // 关闭内核
                    icon: "iconClose",
                    label: this.i18n.menu.kernel.submenu.shutdown.label,
                    disabled: !session?.kernel,
                    click: async () => {
                        if (session?.kernel) {
                            await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.shutdown"]>(
                                "jupyter.session.kernel.connection.shutdown", //
                                session.id, //
                            );
                        }
                    },
                },
                {
                    type: "separator",
                },
                {
                    type: "readonly",
                    iconHTML: "",
                    label: this.i18n.menu.kernel.submenu.info.label
                        .replaceAll("${1}", fn__code(session?.kernel?.id ?? session_ial.kernel!.id))
                        .replaceAll("${2}", fn__code(kernel_name))
                        .replaceAll("${3}", fn__code(kernel_language))
                        .replaceAll("${4}", fn__code(kernel_display_name)),
                    disabled: !session?.kernel,
                },
            ],
        });

        submenu.push({ type: "separator" });

        /* 运行 */
        submenu.push({
            icon: "iconPlay",
            label: this.i18n.menu.run.label,
            submenu: [
                { // 运行所有单元格
                    icon: "iconPlay",
                    label: this.i18n.menu.run.submenu.all.label,
                    disabled: !session?.kernel,
                    submenu: this.buildExecuteMenuItems(
                        false,
                        session,
                        context,
                    ),
                },
                { // 重启内核并运行所有单元格
                    icon: "iconRefresh",
                    label: this.i18n.menu.run.submenu.restart.label,
                    accelerator: this.i18n.menu.run.submenu.restart.accelerator,
                    disabled: !session?.kernel,
                    submenu: this.buildExecuteMenuItems(
                        true,
                        session,
                        context,
                    ),
                },
            ],
        });

        submenu.push({ type: "separator" });

        /* *.ipynb 文件导入 */
        submenu.push({
            icon: "iconUpload",
            label: this.i18n.menu.import.label,
            accelerator: fn__code(this.i18n.menu.import.accelerator),
            submenu: [
                { // 覆写
                    element: globalThis.document.createElement("div"), // 避免生成其他内容
                    bind: element => {
                        /* 挂载一个 svelte 菜单项组件 */
                        const item = new Item({
                            target: element,
                            props: {
                                file: true,
                                icon: "#iconEdit",
                                label: this.i18n.menu.import.submenu.override.label,
                                accept: ".ipynb",
                                multiple: false,
                                webkitdirectory: false,
                            },
                        });

                        item.$on("selected", async (e: ComponentEvents<Item>["selected"]) => {
                            // this.plugin.logger.debug(e);
                            const files = e.detail.files;
                            const file = files.item(0);
                            if (file) {
                                await this.bridge?.call<WorkerHandlers["importIpynb"]>(
                                    "importIpynb",
                                    id,
                                    file,
                                    "override",
                                );
                            }
                        });
                    },
                },
                { // 追加
                    element: globalThis.document.createElement("div"), // 避免生成其他内容
                    bind: element => {
                        /* 挂载一个 svelte 菜单项组件 */
                        const item = new Item({
                            target: element,
                            props: {
                                file: true,
                                icon: "#iconAfter",
                                label: this.i18n.menu.import.submenu.append.label,
                                accept: ".ipynb",
                                multiple: false,
                                webkitdirectory: false,
                            },
                        });

                        item.$on("selected", async e => {
                            // this.plugin.logger.debug(e);
                            const files = e.detail.files;
                            const file = files.item(0);
                            if (file) {
                                await this.bridge?.call<WorkerHandlers["importIpynb"]>(
                                    "importIpynb",
                                    id,
                                    file,
                                    "append",
                                );
                            }
                        });
                    },
                },
            ],
        });

        return submenu;
    }

    /**
     * 构造运行菜单
     * @param restart 是否重启内核
     * @param session 菜单项上下文
     * @param context 菜单项上下文
     * @returns 菜单项列表
     */
    public buildExecuteMenuItems(
        restart: boolean,
        session: Session.IModel | undefined,
        context: TMenuContext,
    ): siyuan.IMenuItemOption[] {
        const disabled = !session?.kernel;
        const flag_cell = context.isDocumentBlock || context.isMultiBlock;
        const execute = async (options: IJupyterParserOptions) => {
            if (restart) {
                await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.restart"]>(
                    "jupyter.session.kernel.connection.restart",
                    session!.id,
                );
            }

            const html = await this.getBlockDOM(context);
            const cells = blockDOM2codeCells(html, flag_cell);
            await this.requestExecuteCells(
                cells,
                session!,
                options,
            );
        };

        const buildCntrlMenuItems = (options: IJupyterParserOptions) => {
            const submenu: siyuan.IMenuItemOption[] = [
                {
                    icon: "iconTheme",
                    label: this.i18n.menu.run.submenu.cntrl.enable.label,
                    accelerator: this.i18n.menu.run.submenu.cntrl.enable.accelerator,
                    disabled,
                    click: async () => {
                        options.cntrl = true;
                        await execute(options);
                    },
                },
                {
                    icon: "icon-jupyter-client-text",
                    label: this.i18n.menu.run.submenu.cntrl.disable.label,
                    accelerator: this.i18n.menu.run.submenu.cntrl.disable.accelerator,
                    disabled,
                    click: async () => {
                        options.cntrl = false;
                        await execute(options);
                    },
                },
            ];
            return submenu;
        };

        const submenu: siyuan.IMenuItemOption[] = [
            {
                icon: "iconPlay",
                label: this.i18n.menu.run.submenu.custom.label,
                disabled,
                click: async () => {
                    const options = this.config.jupyter.execute.output.parser;
                    await execute(options);
                },
            },
            {
                icon: "iconCode",
                label: this.i18n.menu.run.submenu.terminal.label,
                accelerator: fn__code("Xterm"),
                disabled,
                click: async () => {
                    const options = { xterm: true, escaped: false, cntrl: false };
                    await execute(options);
                },
            },
            {
                icon: "icon-jupyter-client-text",
                label: this.i18n.menu.run.submenu.escape.enable.label,
                accelerator: this.i18n.menu.run.submenu.escape.enable.accelerator,
                disabled,
                submenu: buildCntrlMenuItems({ xterm: false, escaped: true, cntrl: true }),
            },
            {
                icon: "iconMarkdown",
                label: this.i18n.menu.run.submenu.escape.disable.label,
                accelerator: this.i18n.menu.run.submenu.escape.disable.accelerator,
                disabled,
                submenu: buildCntrlMenuItems({ xterm: false, escaped: false, cntrl: true }),
            },
        ];
        return submenu;
    }

    /**
     * 构造文档打开菜单
     * @param id 文档块 ID
     * @returns 菜单项列表
     */
    public buildOpenDocumentMenuItems(
        id: string,
    ): siyuan.IMenuItemOption[] {
        const submenu: siyuan.IMenuItemOption[] = [];

        /* 在新页签中打开 */
        submenu.push({
            icon: "iconAdd",
            label: this.i18n.menu.openTab.label,
            click: () => {
                siyuan.openTab({
                    app: this.app,
                    doc: {
                        id,
                        action: [
                            "cb-get-focus", // 光标定位到块
                            "cb-get-hl", // 高亮块
                        ],
                    },
                    keepCursor: false, // 焦点跳转到新 tab
                    removeCurrentTab: false, // 不移除原页签
                });
            },
        });
        /* 在后台页签中打开 */
        submenu.push({
            icon: "iconMin",
            label: this.i18n.menu.openTabBackground.label,
            click: () => {
                siyuan.openTab({
                    app: this.app,
                    doc: {
                        id,
                        action: [
                            "cb-get-focus", // 光标定位到块
                            "cb-get-hl", // 高亮块
                        ],
                    },
                    keepCursor: true, // 焦点不跳转到新 tab
                    removeCurrentTab: false, // 不移除原页签
                });
            },
        });
        /* 在页签右侧打开 */
        submenu.push({
            icon: "iconLayoutRight",
            label: this.i18n.menu.openTabRight.label,
            click: () => {
                siyuan.openTab({
                    app: this.app,
                    doc: {
                        id,
                        action: [
                            "cb-get-focus", // 光标定位到块
                            "cb-get-hl", // 高亮块
                        ],
                    },
                    position: "right",
                    keepCursor: false, // 焦点跳转到新 tab
                    removeCurrentTab: false, // 不移除原页签
                });
            },
        });
        /* 在页签下侧打开 */
        submenu.push({
            icon: "iconLayoutBottom",
            label: this.i18n.menu.openTabBottom.label,
            click: () => {
                siyuan.openTab({
                    app: this.app,
                    doc: {
                        id,
                        action: [
                            "cb-get-focus", // 光标定位到块
                            "cb-get-hl", // 高亮块
                        ],
                    },
                    position: "bottom",
                    keepCursor: false, // 焦点跳转到新 tab
                    removeCurrentTab: false, // 不移除原页签
                });
            },
        });

        return submenu;
    }

    /**
     * 请求上下文帮助
     * @param sessionID 会话 ID
     * @param position 光标位置
     * @returns 是否成功获取
     */
    protected async requestInspect(
        sessionID: string,
        position: ICodeBlockCursorPosition,
    ): Promise<boolean> {
        const message = await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.requestInspect"]>(
            "jupyter.session.kernel.connection.requestInspect",
            sessionID,
            {
                code: position.code,
                cursor_pos: position.offset,
                detail_level: this.config.jupyter.inspect.detail_level,
            },
        );
        // this.logger.debug(message);

        if (message) {
            switch (message.content.status) {
                case "ok":
                    if (message.content.found) { // 查询到上下文帮助信息
                        const text = message.content.data["text/plain"];
                        if (text !== undefined) {
                            const stream = encode(
                                Array.isArray(text)
                                    ? text.join()
                                    : text as string,
                                true,
                            );
                            this.jupyterInspectDock.component?.$set({ stream });
                            return true;
                        }
                        else {
                            this.logger.warn(message);
                        }
                    }
                    break;
                case "abort":
                    this.logger.info(message);
                case "error":
                    this.logger.warn(message);
                    break;
            }
        }
        return false;
    }

    /**
     * 请求上下文自动补全
     * @param sessionID 会话 ID
     * @param position 光标位置
     * @returns 是否成功获取
     */
    protected async requestComplete(
        sessionID: string,
        position: ICodeBlockCursorPosition,
    ): Promise<boolean> {
        const payload = {
            code: position.code,
            cursor_pos: position.offset,
        };
        const message = await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.requestComplete"]>(
            "jupyter.session.kernel.connection.requestComplete",
            sessionID,
            payload,
        );
        // this.logger.debugs(payload, message);

        if (message) {
            switch (message.content.status) {
                case "ok": {
                    /* 使用菜单实现自动补全 */
                    const content = message.content;
                    const menu_items: siyuan.IMenuItemOption[] = [];
                    const icon_map = isLightTheme()
                        ? LIGHT_ICON_MAP
                        : DARK_ICON_MAP;

                    const advices = content.metadata["_jupyter_types_experimental"] as {
                        start: number,
                        end: number,
                        text: string,
                        type: string,
                        signature: string,
                    }[] | void;
                    if (Array.isArray(advices)
                        && advices.length > 0
                    ) {
                        (advices).reduce((previous, current) => {
                            if (previous.type !== current.type) {
                                menu_items.push({ type: "separator" });
                            }

                            const click = () => this.complete(
                                position,
                                current.start,
                                current.end,
                                current.text,
                            );
                            const item: siyuan.IMenuItemOption = {
                                label: current.text,
                                accelerator: fn__code(current.type),
                                // accelerator: fn__code(current.signature),
                                click,
                                submenu: current.signature
                                    ? [{
                                        // type: "readonly",
                                        iconHTML: "", // 移除图标
                                        label: fn__code(escapeHTML(current.signature)),
                                        click,
                                    }]
                                    : undefined,
                            };
                            const icon = icon_map.get(current.type);
                            if (icon) {
                                item.iconHTML = icon;
                            }
                            else {
                                switch (current.type) {
                                    case "magic":
                                        // item.icon = "icon-jupyter-client-kernel";
                                        item.icon = "icon-jupyter-client-simple";
                                        break;

                                    case "path":
                                        switch (true) {
                                            case current.text.endsWith("/"):
                                                item.iconHTML = icon_map.get("folder");
                                                break;

                                            default:
                                                item.iconHTML = icon_map.get("file");
                                                break;
                                        }
                                        break;

                                    default:
                                        item.icon = undefined;
                                        break;
                                }
                            }
                            menu_items.push(item);
                            return current;
                        }, advices[0]);
                    }
                    else {
                        menu_items.push(...content.matches.map(label => ({
                            label,
                            click: () => this.complete(
                                position,
                                content.cursor_start,
                                content.cursor_end,
                                label,
                            ),
                        } as siyuan.IMenuItemOption)))
                    }

                    if (menu_items.length > 0) {
                        const range = position.current;
                        const options: { x: number, y: number } = (() => {
                            var rect: DOMRect | void;

                            rect = range.getBoundingClientRect();
                            if (rect.x > 0 && rect.y > 0) return { x: rect.right, y: rect.bottom };

                            rect = range.commonAncestorContainer instanceof Element
                                ? range.commonAncestorContainer.getBoundingClientRect()
                                : undefined;
                            if (rect && rect.x > 0 && rect.y > 0) return { x: rect.right, y: rect.bottom };

                            rect = range.commonAncestorContainer.parentElement instanceof HTMLSpanElement
                                ? range.commonAncestorContainer.parentElement?.getBoundingClientRect()
                                : undefined;
                            if (rect && rect.x > 0 && rect.y > 0) return { x: rect.right, y: rect.bottom };

                            rect = position.container.getBoundingClientRect();
                            return { x: rect.left, y: rect.bottom };
                        })();

                        const menu = new siyuan.Menu(message.header.msg_id, () => {
                            this.complating = false;
                            if (menu.element.lastElementChild instanceof HTMLElement) {
                                menu.element.lastElementChild.style.maxHeight = "";
                            }
                        });

                        // menu_items[0].current = true; // 仅高亮显示, 无法自动获取焦点
                        menu_items.forEach(item => menu.addItem(item));
                        // menu_items.forEach(menu.addItem); // 无效

                        this.complating = true;
                        menu.open(options);

                        /* 调整菜单位置 */
                        const menu_rect = menu.element.getBoundingClientRect();
                        if (menu_rect.y !== options.y) {
                            const items_element = menu.element.lastElementChild;
                            if (items_element instanceof HTMLElement) {
                                const max_height = globalThis.innerHeight - options.y - 32;

                                items_element.style.maxHeight = `${max_height}px`;
                                menu.element.style.top = `${options.y}px`;
                            }
                        }
                    }

                    break;
                }
                case "abort":
                    this.logger.info(message);
                case "error":
                    this.logger.warn(message);
                    break;
            }
        }
        return false;
    }

    /**
     * 补全上下文
     * @param position 光标位置
     * @param start 光标起始偏移量
     * @param end 光标末尾偏移量
     * @param text 补全文本
     */
    protected complete(
        position: ICodeBlockCursorPosition,
        start: number,
        end: number,
        text: string,
    ): void {
        select(position.container, { start, end });
        const range = globalThis.getSelection()?.getRangeAt(0);
        if (range && range.toString() !== text) {
            replaceRangeWithText(range, text);
        }
        select(position.container, { start: start + text.length });
    }

    /**
     * 请求运行代码块
     * @param code 代码
     * @param codeID 代码块 ID
     * @param sessionID 会话 ID
     * @param options 代码块解析选项
     * @param goto 运行时跳转到对应的代码块
     */
    protected async requestExecuteCell(
        code: string,
        codeID: string,
        sessionID: string,
        options: IJupyterParserOptions,
        goto: boolean = this.config.jupyter.execute.goto,
    ): Promise<void> {
        await this.bridge?.call<WorkerHandlers["jupyter.session.kernel.connection.requestExecute"]>(
            "jupyter.session.kernel.connection.requestExecute",
            this.clientId,
            code,
            codeID,
            sessionID,
            options,
            goto,
        );
    }

    /**
     * 请求运行多个代码块
     * @param blocks 按照执行顺序排序的多个代码块
     * @param session 会话
     * @param options 代码块解析选项
     * @param goto 运行时跳转到对应的代码块
     */
    protected async requestExecuteCells(
        cells: ICodeCell[],
        session: Session.IModel,
        options: IJupyterParserOptions,
        goto: boolean = this.config.jupyter.execute.goto,
    ): Promise<void> {
        for (const cele of cells) {
            /* 运行该代码块 */
            await this.requestExecuteCell(
                cele.code,
                cele.id,
                session.id,
                options,
                goto,
            );
        }
    }

    /**
     * 运行所选代码块
     * @returns 所选代码块
     */
    protected async executeSelectedCellBlocks(): Promise<ICodeCellBlocks> {
        const blocks = getActiveCellBlocks();
        if (blocks.cells.length > 0) {
            const cell = blocks.cells[0];
            const response = await this.client.getBlockInfo({
                id: cell.id,
            });
            const session = this.doc2session.get(response.data.rootID);
            if (session) {
                await this.requestExecuteCells(
                    blocks.cells,
                    session,
                    this.config.jupyter.execute.output.parser,
                    false,
                );
            }
            else {
                // 当前文档未连接会话
                this.siyuan.showMessage(this.i18n.messages.sessionNotConnected.text);
            }
        }
        else {
            // 未选择有效的块
            this.siyuan.showMessage(this.i18n.messages.noValidBlockSelected.text);
        }
        return blocks;
    }

    /**
     * 获取下一个代码单元格
     * @param blocks 当前选择的块
     * @returns 下一个代码单元格的块 ID
     */
    protected async getNextCodeCell(blocks: ICodeCellBlocks): Promise<void | ICodeCell> {
        const last_cell = blocks.cells.at(-1);
        if (last_cell) {
            /* 获取最后一个单元格所在文档 */
            const response_getBlockInfo = await this.client.getBlockInfo({
                id: last_cell.id,
            });
            const block_info = response_getBlockInfo.data;

            /* 获取文档内容 */
            const response_getDoc = await this.client.getDoc({ id: block_info.rootID });
            const html = response_getDoc.data.content;

            /* 获取下一个代码单元格 ID */
            const cells = blockDOM2codeCells(html, true);
            const current_cell_index = cells.findIndex(cell => cell.id === last_cell.id);
            if (current_cell_index >= 0) {
                const next_cell = cells.at(current_cell_index + 1);
                return next_cell;
            }
        }
    }

    /**
     * 插入一个新的代码单元格
     * @param blocks 当前选择的块
     * @returns 新代码块块信息
     */
    protected async insertNewCodeCell(blocks: ICodeCellBlocks): Promise<
        void
        | sdk.types.kernel.api.block.insertBlock.IOperation
        | sdk.types.kernel.api.block.appendBlock.IOperation
    > {
        const payload: sdk.types.kernel.api.block.insertBlock.IPayload = {
            data: buildNewCodeCell(),
            dataType: "markdown",
        };

        switch (blocks.elements.length) {
            case 0: { // 插入到当前块后
                const id = getCurrentBlockID();
                if (id) { // 成功获取到当前块
                    payload.previousID = id;
                    break;
                }
                else return;
            }
            default: { // 插入到所选择的块后
                const element = blocks.elements.at(-1)!;
                if (!isSiyuanBlock(element)) return;

                if (isCodeCell(element)) { // 所选块为代码单元格
                    const nextElement = element.nextElementSibling;
                    switch (true) {
                        case isOutputCell(nextElement): // 下一个块为输出单元格
                            payload.previousID = (nextElement as HTMLElement).dataset.nodeId; // 插入到下一个块后
                            break;

                        case isCodeCell(nextElement): // 下一个块为代码单元格
                        case isSiyuanBlock(nextElement): // 下一个块为思源块
                            payload.nextID = (nextElement as HTMLElement).dataset.nodeId; // 插入到下一个块前
                            break;

                        default: { // 该块为当前容器最后一个块
                            const parentElement = element.parentElement;
                            let parentID;
                            switch (true) {
                                case isSiyuanDocument(parentElement): { // 上层是文档块
                                    const previousElement = parentElement?.previousElementSibling;
                                    if (isSiyuanDocumentTitle(previousElement)) {
                                        parentID = (parentElement as HTMLElement).dataset.nodeId! // 追加到容器块末尾
                                        break;
                                    }
                                    else return;
                                }

                                case isSiyuanBlock(parentElement): // 上层也是思源块
                                    parentID = (parentElement as HTMLElement).dataset.nodeId!; // 追加到容器块末尾
                                    break;

                                default:
                                    return;
                            }
                            try {
                                /* 在容器后方插入块 */
                                const response = await this.client.appendBlock({
                                    ...payload,
                                    parentID,
                                });
                                return response.data[0]?.doOperations[0];
                            }
                            catch (error) {
                                return;
                            }
                        }
                    }
                }
                else { // 所选块非代码单元格
                    payload.previousID = element.dataset.nodeId; // 插入到该块后
                    break;
                }
                break;
            }
        }

        try {
            /* 在指定块前/后插入块 */
            const response = await this.client.insertBlock(payload);
            return response.data[0]?.doOperations[0];
        }
        catch (error) {
            return;
        }
    }

    /**
     * 转到块
     * @param id 块 ID
     * @param heightlight 是否高亮块 (高亮块时光标将不在块内)
     * @param afterOpen 打开后回调
     */
    public async gotoBlock(
        id: BlockID,
        heightlight: boolean = true,
        afterOpen?: () => void | Promise<void>,
    ): Promise<void> {
        await siyuan.openTab({
            app: this.app,
            doc: {
                id,
                action: [
                    heightlight
                        ? "cb-get-hl" // 高亮块
                        : "cb-get-focus", // 光标定位到块
                ],
            },
            keepCursor: false, // 焦点跳转到新 tab
            removeCurrentTab: false, // 不移除原页签
            afterOpen,
        });
    }

    /**
     * 获取块 DOM
     * @param context 菜单项上下文
     * @returns 块 DOM 字符串
     */
    protected async getBlockDOM(
        context: TMenuContext,
    ): Promise<string> {
        var html: string;
        if (context.isDocumentBlock) { // 文档块
            const response = await this.client.getDoc({ id: context.id });
            html = response.data.content;
        }
        else { // 非文档块
            const htmls: string[] = [];
            for (const block of context.blocks) {
                htmls.push(block.element.outerHTML);
            }
            html = htmls.join("");
        }
        return html;
    }

    /* 更新侧边栏当前文档对应的项 */
    protected updateDockFocusItem(docID: BlockID): void {
        const session = this.doc2session.get(docID);
        this.jupyterDock.component?.$set({
            currentSpec: session?.kernel?.name,
            currentKernel: session?.kernel?.id,
            currentSession: session?.id,
            currentDocument: docID,
        });
    }

    /**
     * 切换监听器
     * @param protyle 编辑器
     * @param enable 是否启用编辑事件监听
     */
    protected toggleEditEventListener(
        protyle: IProtyle,
        enable: boolean,
    ): void {

        if (enable) {
            if (!this.protyles.has(protyle)) { // 未加入监听的编辑器
                const listener = [
                    "keyup",
                    e => this.editEventListener(e as KeyboardEvent, protyle),
                    {
                        capture: true,
                    },
                ] as Parameters<HTMLElement["addEventListener"]>;
                this.protyles.set(protyle, listener);
                protyle.wysiwyg?.element?.addEventListener(...listener);
            }
        }
        else {
            const listener = this.protyles.get(protyle);
            if (listener) { // 已加入监听的编辑器
                protyle.wysiwyg?.element?.removeEventListener(...listener);
            }
        }
    }

    /* 编辑事件监听 */
    protected readonly editEventListener = (
        e: KeyboardEvent,
        protyle: IProtyle,
    ) => {
        // this.logger.debugs(e, protyle);

        this.editEventHandler(
            protyle,
            isMatchedKeyboardEvent(e, JupyterClientPlugin.EDIT_KEYBOARD_EVENT_STATUS_INSPECT),
            isMatchedKeyboardEvent(e, JupyterClientPlugin.EDIT_KEYBOARD_EVENT_STATUS_COMPLATE),
        );
    }

    /* 块菜单菜单弹出事件监听器 */
    protected readonly blockMenuEventListener = (e: IClickBlockIconEvent | IClickEditorTitleIconEvent) => {
        // this.logger.debug(e);

        const detail = e.detail;
        const context = getBlockMenuContext(detail); // 获取块菜单上下文
        if (context) {
            const session = this.doc2session.get(context.protyle.block.rootID!);
            const submenu: siyuan.IMenuItemOption[] = [];
            if (context.isDocumentBlock) { // 文档块菜单
                submenu.push(...this.buildJupyterDocumentMenuItems(
                    context.id,
                    context.data.ial,
                    session,
                    context,
                ));
            }
            else { // 其他块菜单
                submenu.push(...this.buildExecuteMenuItems(
                    false,
                    session,
                    context,
                ));
            }

            detail.menu.addItem({
                submenu,
                icon: "icon-jupyter-client-simple",
                label: this.i18n.displayName,
                accelerator: this.name,
            });

            this.updateDockFocusItem(context.protyle.block.rootID!);
        }
    };

    /* 编辑器点击事件监听器 */
    protected readonly clickEditorContentEventListener = (e: IClickEditorContentEvent) => {
        // this.logger.debug(e);
        const protyle = e.detail.protyle;
        if (protyle.background?.ial?.[CONSTANTS.attrs.kernel.language]) {
            if (globalThis.siyuan?.storage) {
                /* 设置代码块语言 */
                globalThis.siyuan.storage["local-codelang"] = protyle.background.ial[CONSTANTS.attrs.kernel.language];
            }
        }

        const session = this.doc2session.get(protyle.block.rootID!) // 当前文档连接的会话
        if (session) { // 当前文档已连接会话
            this.toggleEditEventListener(protyle, true); // 启用编辑事件监听
        }
        else { // 当前文档未连接会话
            this.toggleEditEventListener(protyle, false); // 禁用编辑事件监听
        }

        /* 为代码块添加运行按钮 */
        const block_element = getCurrentBlock();
        if (block_element) { // 当前块存在
            if (block_element.dataset.type === sdk.siyuan.NodeType.NodeCodeBlock && block_element.classList.contains("code-block")) { // 当前块为代码块
                const action_run = block_element.querySelector<HTMLElement>(`.${CONSTANTS.JUPYTER_CODE_CELL_ACTION_RUN_CLASS_NAME}`); // 代码块运行按钮
                if (session // 当前文档已连接会话
                    && (isCodeCell(block_element) // 代码单元格
                        || block_element.querySelector<HTMLElement>(".protyle-action__language")?.innerText === protyle.background?.ial?.[CONSTANTS.attrs.kernel.language] // 语言与内核语言一致
                    )
                ) { // 可运行的代码块
                    /* 请求上下文帮助 */
                    const position = getCodeBlockCursorPosition();
                    // this.logger.debug(position);
                    if (position) {
                        this.requestInspect(
                            session.id,
                            position,
                        );
                    }

                    if (!action_run) { // 若运行按钮不存在, 添加该按钮
                        const action_last = block_element.querySelector<HTMLElement>(".protyle-icon--last"); // 最后一个按钮

                        if (action_last) {
                            const action = globalThis.document.createElement("span");
                            action.classList.add(
                                "b3-tooltips",
                                "b3-tooltips__nw",
                                "protyle-icon",
                                CONSTANTS.JUPYTER_CODE_CELL_ACTION_RUN_CLASS_NAME,
                            );
                            action.ariaLabel = this.i18n.menu.run.label;
                            action.innerHTML = `<svg><use xlink:href="#iconPlay"></use></svg>`;
                            action.onclick = async e => {
                                const cells = blockDOM2codeCells(block_element.outerHTML, false);
                                await this.requestExecuteCells(
                                    cells,
                                    session,
                                    this.config.jupyter.execute.output.parser,
                                );
                            };

                            action_last.parentElement?.insertBefore(action, action_last);
                        }
                    }
                }
                else { // 不可运行的代码块
                    if (action_run) { // 若运行按钮存在, 移除该按钮
                        action_run.remove();
                    }
                }
            }
        }

        this.updateDockFocusItem(protyle.block.rootID!);
    }

    /* 编辑器加载事件监听器 */
    protected readonly loadedProtyleEventListener = async (e: ILoadedProtyleStaticEvent | ISwitchProtyleEvent) => {
        // this.logger.debug(e);
        const protyle = e.detail.protyle;

        /* 更新内核状态 */
        if (!this.doc2session.has(protyle.block.rootID!)) { // 当前文档未连接会话
            const attrs: Record<string, string> = {};
            if (protyle.background?.ial?.[CONSTANTS.attrs.kernel.connection_status]
                && protyle.background.ial[CONSTANTS.attrs.kernel.connection_status] !== "disconnected"
            ) {
                attrs[CONSTANTS.attrs.kernel.connection_status] = "disconnected"
            }
            if (protyle.background?.ial?.[CONSTANTS.attrs.kernel.status]
                && protyle.background.ial[CONSTANTS.attrs.kernel.status] !== "unknown"
            ) {
                attrs[CONSTANTS.attrs.kernel.status] = "unknown"
            }
            if (Object.keys(attrs).length > 0) {
                await this.client.setBlockAttrs({
                    id: protyle.block.rootID!,
                    attrs,
                });
            }
        }
        else { // 当前文档已连接会话
            this.toggleEditEventListener(protyle, true); // 启用编辑事件监听
        }

        /* 在面包屑栏右侧添加按钮 */
        if (protyle.title?.editElement?.innerText.endsWith(".ipynb") // 文档名以 `.ipynb` 结尾
            || protyle.background?.ial?.[CONSTANTS.attrs.kernel.name] // 文档块属性中有内核名称属性
        ) {
            const exit_focus_element = protyle.breadcrumb?.element.parentElement?.querySelector(".protyle-breadcrumb__icon[data-type=exit-focus]");
            if (exit_focus_element) { // 存在退出焦点按钮
                if (exit_focus_element.nextElementSibling?.classList.contains(CONSTANTS.JUPYTER_NOTEBOOK_BUTTON_MENU_CLASS_NAME)) { // 存在 jupyter 菜单按钮
                    return;
                }
                else { // 添加菜单按钮
                    const button = globalThis.document.createElement("button");
                    button.classList.add(
                        "block__icon",
                        "block__icon--show",
                        "fn__flex-center",
                        "b3-tooltips",
                        "b3-tooltips__sw",
                        CONSTANTS.JUPYTER_NOTEBOOK_BUTTON_MENU_CLASS_NAME,
                    );
                    button.dataset.type = "jupyter-client-notebook-menu";
                    button.ariaLabel = "Jupyter";
                    button.innerHTML = `<svg><use xlink:href="#icon-jupyter-client-session-notebook"></use></svg>`;
                    button.onclick = async e => {
                        // this.logger.debug(e);
                        e.preventDefault();
                        e.stopPropagation();

                        if (protyle.block.rootID && protyle.background?.ial) {
                            const doc_id = protyle.block.rootID;

                            const menu_items = this.buildJupyterDocumentMenuItems(
                                doc_id,
                                protyle.background.ial,
                                this.doc2session.get(doc_id),
                                {
                                    isDocumentBlock: true,
                                    isMultiBlock: false,
                                    id: doc_id,
                                },
                            );

                            if (menu_items.length > 0) {
                                const menu = new this.siyuan.Menu();
                                menu_items.forEach(item => menu.addItem(item));

                                menu.open({
                                    x: e.clientX,
                                    y: e.clientY,
                                    isLeft: true,
                                });
                            }
                        }
                    };

                    exit_focus_element.parentElement!.insertBefore(
                        button,
                        exit_focus_element.nextElementSibling,
                    );
                }
            }
        }
    }

    /* 编辑器关闭事件监听器 */
    protected readonly destroyProtyleEventListener = (e: IDestroyProtyleEvent) => {
        // this.logger.debug(e);

        const protyle = e.detail.protyle;
        this.toggleEditEventListener(protyle, false); // 禁用编辑事件监听
    }

    /**
     * 请求输入
     * @param blockID 块 ID
     * @param clientID 客户端 ID
     * @param prompt 输入提示
     */
    public readonly inputRequest = async (
        blockID: BlockID,
        clientID: string,
        prompt: string = "",
    ) => {
        if (clientID === this.clientId) {
            /* 定位到请求输入块 */
            if (this.config.jupyter.execute.input.goto) {
                await this.gotoBlock(blockID);
            }

            try {
                /* 输入框 */
                const value = await asyncPrompt(
                    this.siyuan.Dialog,
                    {
                        title: this.i18n.messages.inputRequest.title,
                        text: prompt
                            ? fn__code(prompt)
                            : undefined,
                        cancel: () => false,
                    },
                );
                return value;
            } catch (error) {
                return;
            }
        }
    }

    /* 内核清单更改 */
    public readonly updateKernelSpecs = (kernelspecs: KernelSpec.ISpecModels) => {
        // this.logger.debug(kernelspecs);

        Object.assign(this.kernelspecs, kernelspecs);
        for (const [name, spec] of Object.entries(kernelspecs.kernelspecs)) {
            if (spec) {
                this.kernelName2language.set(name, spec.language);
                this.kernelName2displayName.set(name, spec.display_name);
            }
        }
        this.jupyterDock.component?.$set({
            kernelspecs,
        });
    }

    /* 活动的内核列表更改 */
    public readonly updateKernels = (kernels: Kernel.IModel[]) => {
        // this.logger.debug(kernels);

        this.kernels.length = 0;
        this.kernels.push(...kernels);
        this.jupyterDock.component?.$set({
            kernels,
        });
    }

    /* 活动的会话列表更改 */
    public readonly updateSessions = (sessions: Session.IModel[]) => {
        // this.logger.debug(sessions);

        const session_id_set = new Set(sessions.map(s => s.id));
        for (const session_id of this.session2docs.keys()) {
            if (!session_id_set.has(session_id)) {
                /* 删除已被关闭的会话 */
                const doc_set = this.session2docs.get(session_id);
                if (doc_set) {
                    doc_set.forEach(id => this.doc2session.delete(id)); // 删除 doc ID -> session model
                }
                this.session2docs.delete(session_id); // 删除 session ID -> doc ID set
            }
        }

        this.sessions.length = 0;
        this.sessions.push(...sessions);
        this.jupyterDock.component?.$set({
            sessions,
        });
    }

    /**
     * 在新页签中打开 Jupyter
     */
    protected readonly openJupyterTab = async () => {
        siyuan.openTab({
            app: this.app,
            custom: {
                icon: "icon-jupyter-client",
                title: "Jupyter",
                id: this.CUSTOM_TAB_ID_JUPYTER,
                data: {
                    src: this.baseUrl,
                    title: "Jupyter",
                },
            },
            keepCursor: false,
            removeCurrentTab: false,
        });
    };

    /**
     * 在浏览器中打开 Jupyter
     */
    protected readonly openJupyterBrowser = async () => {
        globalThis.open(this.baseUrl);
    };

    /**
     * 在新窗口中打开 Jupyter
     */
    protected readonly openJupyterWindow = async () => {
        openWindow({
            url: this.baseUrl,
            base: {
                center: true,
            },
            extra: {
                enableMenuBar: true,
            },
        });
    };
};
