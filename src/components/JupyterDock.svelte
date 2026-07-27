<!--
 Copyright (C) 2023 Zuoqiu Yingyi

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";

    import Bar from "@workspace/components/siyuan/dock/Bar.svelte";
    import { TooltipsDirection } from "@workspace/components/siyuan/misc/tooltips";
    import {
        FileTreeNodeType,

    } from "@workspace/components/siyuan/tree/file";
    import FileTree from "@workspace/components/siyuan/tree/file/FileTree.svelte";
    import Node from "@workspace/components/siyuan/tree/file/Node.svelte";
    import moment from "@workspace/utils/date/moment";
    import { utf32Decode } from "@workspace/utils/misc/string";
    import { washMenuItems } from "@workspace/utils/siyuan/menu/wash";

    import type { Kernel, KernelSpec, Session } from "@jupyterlab/services";
    import type { ComponentEvents } from "svelte";

    import type { IBar } from "@workspace/components/siyuan/dock/index";
    import type { IFileTreeFileNode, IFileTreeFolderNode, IFileTreeRootNode } from "@workspace/components/siyuan/tree/file";

    import type JupyterClientPlugin from "@/index";
    import type { WorkerHandlers } from "@/workers/jupyter";

    interface IProps {
        plugin: InstanceType<typeof JupyterClientPlugin>; // 插件实例
        kernelspecs?: KernelSpec.ISpecModels; // 内核清单
        kernels?: Kernel.IModel[]; // 活动的内核列表
        sessions?: Session.IModel[]; // 活动的会话列表
        currentSpec?: string; // 当前的内核定义
        currentKernel?: string; // 当前的内核 ID
        currentSession?: string; // 当前的会话 ID
        currentDocument?: string; // 当前的文档 ID
    }

    const {
        plugin,
        kernelspecs = {
            default: "",
            kernelspecs: {},
        },
        kernels = [],
        sessions = [],
        currentSpec = "",
        currentKernel = "",
        currentSession = "",
        currentDocument = "",
    }: IProps = $props();

    const ROOT_DIRECTORY = "/"; // 根目录

    const RESOURCES_DIRECTORY = "/respurces"; // 资源清单目录
    const RESOURCES_ICON = "#icon-jupyter-client-simple"; // 资源清单默认图标

    const KERNELSPECS_DIRECTORY = "/kernelspecs"; // 内核清单目录
    const KERNELSPECS_ICON = "#icon-jupyter-client-kernelspec"; // 内核清单默认图标

    const KERNELS_DIRECTORY = "/kernels"; // 内核目录
    const KERNELS_ICON = "#icon-jupyter-client-kernel"; // 内核默认图标

    const SESSIONS_DIRECTORY = "/sessions"; // 会话目录
    const SESSIONS_ICON = "#icon-jupyter-client-session"; // 会话默认图标

    const DATETIME_FORMAT = "YYYY-MM-DD hh:mm:ss"; // 日期时间格式

    /* 根节点列表 */
    const roots: IFileTreeRootNode[] = [
        {
            type: FileTreeNodeType.Root,
            name: "respurces",
            path: RESOURCES_DIRECTORY,
            directory: ROOT_DIRECTORY,
            depth: 0,
            folded: false,
            icon: RESOURCES_ICON,
            text: plugin.i18n.dock.resources.text,
        },
        {
            type: FileTreeNodeType.Root,
            name: "kernelspec",
            path: KERNELSPECS_DIRECTORY,
            directory: ROOT_DIRECTORY,
            depth: 0,
            folded: false,
            icon: KERNELSPECS_ICON,
            text: plugin.i18n.dock.kernelspecs.text,
        },
        {
            type: FileTreeNodeType.Root,
            name: "kernels",
            path: KERNELS_DIRECTORY,
            directory: ROOT_DIRECTORY,
            depth: 0,
            folded: false,
            icon: KERNELS_ICON,
            text: plugin.i18n.dock.kernels.text,
        },
        {
            type: FileTreeNodeType.Root,
            name: "sessions",
            path: SESSIONS_DIRECTORY,
            directory: ROOT_DIRECTORY,
            depth: 0,
            folded: false,
            icon: SESSIONS_ICON,
            text: plugin.i18n.dock.sessions.text,
        },
    ];

    /* 将 jupyter 资源转换为节点 */
    async function resources2node(
        kernelspecs: KernelSpec.ISpecModels, //
        _kernels: Kernel.IModel[], // 使用 running() 获取最新的状态
        _sessions: Session.IModel[], // 使用 running() 获取最新的状态
    ): Promise<IFileTreeFolderNode[]> {
        /* 内核清单列表 */
        const spec_nodes: IFileTreeFolderNode[] = [];
        for (const spec of Object.values(kernelspecs.kernelspecs)) {
            if (!spec)
                continue;

            const spec_path = `${RESOURCES_DIRECTORY}/${spec.name}`;
            const spec_node: IFileTreeFolderNode = {
                type: FileTreeNodeType.Folder,
                name: spec.name,
                path: spec_path,
                directory: RESOURCES_DIRECTORY,
                focus: spec.name === currentSpec,
                folded: false,

                icon: plugin.kernelName2logoObjectURL.has(spec.name) //
                    ? plugin.kernelName2logoObjectURL.get(spec.name) //
                    : await plugin.loadKernelSpecIcon(spec),
                iconAriaLabel: spec.language,
                text: spec.name,
                textAriaLabel: spec.display_name,
            };

            /* 内核列表 */
            spec_node.children = await (async () => {
                const kernel_nodes: IFileTreeFolderNode[] = [];
                const kernels = await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.running"]>(
                    "jupyter.kernels.running", //
                );
                for (const kernel of kernels ?? []) {
                    if (kernel.name !== spec.name) {
                        continue;
                    }

                    const kernel_path = `${spec_path}/${kernel.id}`;
                    const datetime = moment(kernel.last_activity);
                    const kernel_node: IFileTreeFolderNode = {
                        type: FileTreeNodeType.Folder,
                        name: kernel.id,
                        path: kernel_path,
                        directory: spec_path,
                        focus: kernel.id === currentKernel,
                        folded: false,

                        icon: `#icon-jupyter-client-kernel-${kernel.execution_state}`,
                        iconAriaLabel: kernel.execution_state,
                        text: kernel.name,
                        textAriaLabel: `${datetime.format(DATETIME_FORMAT)}<br/>${datetime.fromNow()}`,
                        title: kernel.id,
                    };

                    /* 会话列表 */
                    kernel_node.children = await (async () => {
                        const session_nodes: IFileTreeFolderNode[] = [];
                        const sessions = await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.running"]>(
                            "jupyter.sessions.running", //
                        );
                        for (const session of sessions ?? []) {
                            if (session.kernel?.id !== kernel.id) {
                                continue;
                            }

                            const session_path = `${kernel_path}/${session.id}`;
                            const session_node: IFileTreeFolderNode = {
                                type: FileTreeNodeType.Folder,
                                name: session.id,
                                path: session_path,
                                directory: kernel_path,
                                focus: session.id === currentSession,
                                folded: false,

                                icon: `#icon-jupyter-client-session-${session.type}`,
                                iconAriaLabel: session.type,
                                text: session.name,
                                textAriaLabel: session.path,
                                title: session.id,
                            };

                            /* 文档列表 */
                            session_node.children = await (async () => {
                                const document_nodes: IFileTreeFileNode[] = [];
                                const docs = plugin.session2docs.get(session.id);
                                if (docs && docs.size > 0) {
                                    for (const doc_id of docs.values()) {
                                        if (!plugin.doc2info.has(doc_id)) {
                                            const response = await plugin.client.getDocInfo({ id: doc_id });
                                            plugin.doc2info.set(doc_id, response.data);
                                        }

                                        const document = plugin.doc2info.get(doc_id)!;
                                        const document_path = `${session_path}/${document.id}`;
                                        const datatime = moment(document.ial.updated, "YYYYMMDDhhmmss");
                                        const document_node: IFileTreeFileNode = {
                                            type: FileTreeNodeType.File,
                                            name: document.id,
                                            path: document_path,
                                            directory: session_path,
                                            focus: document.id === currentDocument,

                                            icon: /^[1-9a-f]+$/.test(document.icon) //
                                                ? utf32Decode(document.icon) // 32 位 unicode 编码的 emoji
                                                : document.icon //
                                                ? `/emojis/${document.icon}` // 引用的图片
                                                : "📄", // 未设置图标
                                            text: document.name,
                                            textAriaLabel: `${datatime.format(DATETIME_FORMAT)}<br/>${datetime.fromNow()}`,
                                            title: document.name,
                                        };

                                        document_nodes.push(document_node);
                                    }
                                }
                                return document_nodes;
                            })();
                            session_node.count = session_node.children.length;

                            session_nodes.push(session_node);
                        }
                        return session_nodes;
                    })();
                    kernel_node.count = kernel_node.children.length;

                    kernel_nodes.push(kernel_node);
                }
                return kernel_nodes;
            })();
            spec_node.count = spec_node.children.length;

            spec_nodes.push(spec_node);
        }
        return spec_nodes;
    }

    /* 将内核清单转换为节点 */
    async function kernelspecs2node(kernelspecs: KernelSpec.ISpecModels): Promise<IFileTreeFileNode[]> {
        const nodes: IFileTreeFileNode[] = [];
        for (const [name, spec] of Object.entries(kernelspecs.kernelspecs)) {
            if (!spec)
                continue;

            const node: IFileTreeFileNode = {
                type: FileTreeNodeType.File,
                name,
                path: `${KERNELSPECS_DIRECTORY}/${name}`,
                directory: KERNELSPECS_DIRECTORY,
                focus: name === currentSpec,

                icon: KERNELSPECS_ICON,
                text: name,
                textAriaLabel: spec.display_name,
            };

            /* 设置图标 */
            const icon = plugin.kernelName2logoObjectURL.get(name);
            if (icon) {
                node.icon = icon;
            }
            else {
                node.icon = await plugin.loadKernelSpecIcon(spec);
            }

            node.iconAriaLabel = spec.language;

            nodes.push(node);
        }

        return nodes;
    }

    /* 将运行的内核转换为节点 */
    function kernels2node(kernels: Kernel.IModel[]): IFileTreeFileNode[] {
        const nodes: IFileTreeFileNode[] = [];
        for (const kernel of kernels) {
            const datetime = moment(kernel.last_activity);
            nodes.push({
                type: FileTreeNodeType.File,
                name: kernel.id,
                path: `${KERNELS_DIRECTORY}/${kernel.id}`,
                directory: KERNELS_DIRECTORY,
                focus: kernel.id === currentKernel,

                icon: `#icon-jupyter-client-kernel-${kernel.execution_state}`,
                iconAriaLabel: kernel.execution_state,
                text: kernel.name,
                textAriaLabel: `${datetime.format(DATETIME_FORMAT)}<br/>${datetime.fromNow()}`,
                symlinkIcon: plugin.kernelName2logoObjectURL.get(kernel.name) ?? KERNELS_ICON,
                symlinkAriaLabel: plugin.kernelName2language.get(kernel.name),
                symlink: true,
                count: kernel.connections,
                title: kernel.id,
            });
        }
        return nodes;
    }

    /* 将运行的会话转换为节点 */
    function sessions2node(sessions: Session.IModel[]): IFileTreeFileNode[] {
        const nodes: IFileTreeFileNode[] = [];
        for (const session of sessions) {
            nodes.push({
                type: FileTreeNodeType.File,
                name: session.id,
                path: `${SESSIONS_DIRECTORY}/${session.id}`,
                directory: SESSIONS_DIRECTORY,
                focus: session.id === currentSession,

                icon: `#icon-jupyter-client-session-${session.type}`,
                iconAriaLabel: session.type,
                text: session.name,
                textAriaLabel: `${session.kernel?.name}<br/>${session.path}`,
                symlink: true,
                symlinkIcon: plugin.kernelName2logoObjectURL.get(session.kernel?.name ?? "") ?? SESSIONS_ICON,
                symlinkAriaLabel: plugin.kernelName2language.get(session.kernel?.name ?? ""),
                count: plugin.session2docs.get(session.id)?.size ?? 0,
                countAriaLabel: session.kernel?.execution_state,
                title: session.id,
            });
        }
        return nodes;
    }

    /* 动态更新当前文档 */
    function updateCurrentDocument(
        specName: string, // 内核名称
        kernelID: string, // 内核 ID
        sessionID: string, // 会话 ID
        documentID: string, // 文档 ID
    ): void {
        // plugin.logger.debug(documentID, sessionID);

        /* 遍历内核清单 */
        roots[0]!.children?.forEach((spec, i) => {
            /* 遍历内核 */
            spec.children?.forEach((kernel, j) => {
                /* 遍历会话 */
                kernel.children?.forEach((session, k) => {
                    /* 遍历文档 */
                    session.children?.forEach((document, l) => {
                        // 高亮当前文档
                        roots[0]!.children![i]!.children![j]!.children![k]!.children![l]!.focus = document.name === documentID;
                    });
                    // 高亮当前会话
                    roots[0]!.children![i]!.children![j]!.children![k]!.focus = session.name === sessionID;
                });
                // 高亮当前内核
                roots[0]!.children![i]!.children![j]!.focus = kernel.name === kernelID;
            });
            // 高亮当前定义
            roots[0]!.children![i]!.focus = spec.name === specName;
        });
    }

    /* 动态更新当前内核定义 */
    function updateCurrentSpec(specName: string): void {
        roots[1]!.children?.forEach((spec, i) => {
            roots[1]!.children![i]!.focus = spec.name === specName;
        });
    }

    /* 动态更新当前内核 */
    function updateCurrentKernel(kernelID: string): void {
        roots[2]!.children?.forEach((kernel, i) => {
            roots[2]!.children![i]!.focus = kernel.name === kernelID;
        });
    }

    /* 动态更新当前会话 */
    function updateCurrentSession(sessionID: string): void {
        roots[3]!.children?.forEach((session, i) => {
            roots[3]!.children![i]!.focus = session.name === sessionID;
        });
    }

    /* 标题栏配置 */
    const bar: IBar = {
        logo: "#icon-jupyter-client",
        title: plugin.i18n.dock.title,
        icons: [
            {
                // 刷新
                icon: "#iconRefresh",
                type: "refresh",
                ariaLabel: plugin.i18n.dock.refresh.ariaLabel,
                tooltipsDirection: TooltipsDirection.sw,
                onClick: async (_e, _element, _props) => {
                    // await plugin.bridge?.call<WorkerHandlers["jupyter.refresh"]>(
                    //     "jupyter.refresh", //
                    // );
                    await plugin.jupyterForceRefresh();
                },
            },
            {
                // 最小化
                icon: "#iconMin",
                type: "min",
                ariaLabel: `${window.siyuan.languages.min} ${plugin.siyuan.adaptHotkey("⌘W")}`,
                tooltipsDirection: TooltipsDirection.sw,
            },
        ],
    };

    /* 动态更新 jupyter 服务状态 */
    $effect(() => {
        roots[0]!.count = Object.keys(kernelspecs.kernelspecs).length;
        resources2node(kernelspecs, kernels, sessions).then((children) => {
            roots[0]!.children = children;
        });
    });

    /* 动态更新内核清单 */
    $effect(() => {
        roots[1]!.count = Object.keys(kernelspecs.kernelspecs).length;
        kernelspecs2node(kernelspecs).then(async (children) => {
            /* 确保内核图标已加载 */
            roots[1]!.children = children;
            roots[2]!.children = kernels2node(kernels);
            roots[3]!.children = sessions2node(sessions);
        });
    });

    /* 动态更新活跃的内核 */
    $effect(() => {
        roots[2]!.count = kernels.length;
        roots[2]!.children = kernels2node(kernels);
    });

    /* 动态更新活跃的会话 */
    $effect(() => {
        roots[3]!.count = sessions.length;
        roots[3]!.children = sessions2node(sessions);
    });

    $effect(() => {
        updateCurrentSpec(currentSpec);
        updateCurrentKernel(currentKernel);
        updateCurrentSession(currentSession);
        updateCurrentDocument(currentSpec, currentKernel, currentSession, currentDocument);
    });

    /* 回收资源 */
    onDestroy(() => {
        for (const objectURL of plugin.kernelName2logoObjectURL.values()) {
            URL.revokeObjectURL(objectURL);
        }
        plugin.kernelName2logoObjectURL.clear();
    });

    /* 折叠文件夹 */
    function fold(e: ComponentEvents<Node>["fold"]) {
        // plugin.logger.debug(e);
        const node = e.detail.props;
        node.folded.set(true);
    }

    /* 展开文件夹 */
    async function unfold(e: ComponentEvents<Node>["unfold"]) {
        // plugin.logger.debug(e);
        const node = e.detail.props;
        node.folded.set(false);
    }

    /* 打开 */
    function open(e: ComponentEvents<Node>["open"]) {
        // plugin.logger.debug(e);
        const node = e.detail.props;
        const name = get(node.name)!;
        const path = get(node.path)!;
        const depth = get(node.depth)!;

        if (
            path.startsWith(RESOURCES_DIRECTORY)
            && depth === 4 // /资源目录/内核清单/内核/会话/文档
        ) {
            plugin.siyuan.openTab({
                app: plugin.app,
                doc: {
                    id: name,
                    action: [
                        "cb-get-focus", // 光标定位到块
                        "cb-get-hl", // 高亮块
                    ],
                },
                keepCursor: false, // 焦点不跳转到新 tab
                removeCurrentTab: false, // 不移除原页签
            });
        }
    }

    /* 菜单 */
    async function menu(e: ComponentEvents<Node>["menu"]) {
        // plugin.logger.debug(e);
        const node = e.detail.props;
        const name = get(node.name)!;
        const path = get(node.path)!;
        const depth = get(node.depth)!;
        const directory = get(node.directory)!;

        const items: import("siyuan").IMenu[] = [];

        if (
            path === KERNELSPECS_DIRECTORY // 可用内核目录
            || (path.startsWith(RESOURCES_DIRECTORY) && depth === 0) // 资源目录
        ) {
            items.push({
                icon: "iconRefresh",
                label: plugin.i18n.dock.refresh.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernelspecs.refreshSpecs"]>(
                        "jupyter.kernelspecs.refreshSpecs", //
                    );
                },
            });
        }

        if (
            path === KERNELS_DIRECTORY // 内核目录
        ) {
            items.push({
                icon: "iconRefresh",
                label: plugin.i18n.dock.refresh.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.refreshRunning"]>(
                        "jupyter.kernels.refreshRunning", //
                    );
                },
            });
            items.push({ type: "separator" });
            items.push({
                icon: "iconClose",
                label: plugin.i18n.dock.menu.shutdownAllKernels.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.shutdownAll"]>(
                        "jupyter.kernels.shutdownAll", //
                    );

                    /* 关闭后需要手动更新会话列表 */
                    await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.refreshRunning"]>(
                        "jupyter.sessions.refreshRunning", //
                    );
                },
            });
        }

        if (
            directory === KERNELS_DIRECTORY // /内核目录/内核
            || (path.startsWith(RESOURCES_DIRECTORY) && depth === 2) // 资源目录/内核目录/内核
        ) {
            //
            items.push({
                icon: "iconClose",
                label: plugin.i18n.dock.menu.shutdownKernel.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.shutdown"]>(
                        "jupyter.kernels.shutdown", //
                        name,
                    );

                    /* 关闭后需要手动更新会话列表 */
                    await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.refreshRunning"]>(
                        "jupyter.sessions.refreshRunning", //
                    );
                },
            });
        }

        if (
            path === SESSIONS_DIRECTORY // 会话目录
        ) {
            // 会话目录
            items.push({
                icon: "iconRefresh",
                label: plugin.i18n.dock.refresh.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.refreshRunning"]>(
                        "jupyter.sessions.refreshRunning", //
                    );
                },
            });
            items.push({ type: "separator" });
            items.push({
                icon: "iconClose",
                label: plugin.i18n.dock.menu.shutdownAllSessions.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.shutdownAll"]>(
                        "jupyter.sessions.shutdownAll", //
                    );

                    /* 关闭后需要手动更新内核列表 */
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.refreshRunning"]>(
                        "jupyter.kernels.refreshRunning", //
                    );
                },
            });
        }

        if (
            directory === SESSIONS_DIRECTORY // /会话目录/会话
            || (path.startsWith(RESOURCES_DIRECTORY) && depth === 3) // /资源目录/内核清单/内核/会话
        ) {
            items.push({
                icon: "iconClose",
                label: plugin.i18n.dock.menu.shutdownSession.label,
                click: async () => {
                    await plugin.bridge?.call<WorkerHandlers["jupyter.sessions.shutdown"]>(
                        "jupyter.sessions.shutdown", //
                        name,
                    );

                    /* 关闭后需要手动更新内核列表 */
                    await plugin.bridge?.call<WorkerHandlers["jupyter.kernels.refreshRunning"]>(
                        "jupyter.kernels.refreshRunning", //
                    );
                },
            });
        }

        if (
            path.startsWith(RESOURCES_DIRECTORY)
            && depth === 4 // /资源目录/内核清单/内核/会话/文档
        ) {
            const response = await plugin.client.getBlockAttrs({ id: name });
            const ial = response.data;

            /* 打开 */
            items.push({
                icon: "iconOpenWindow",
                label: plugin.i18n.menu.open.label,
                submenu: plugin.buildOpenDocumentMenuItems(name),
            });

            items.push({ type: "separator" });

            /* 管理 */
            items.push(
                ...plugin.buildJupyterDocumentMenuItems(name, ial, plugin.doc2session.get(name), {
                    isDocumentBlock: true,
                    isMultiBlock: false,
                    id: name,
                }),
            );
        }

        washMenuItems(items);
        if (items.length > 0) {
            const menu = new plugin.siyuan.Menu();
            items.forEach((item) => menu.addItem(item));

            const event = e.detail.e;
            menu.open({
                x: event.clientX,
                y: event.clientY,
                isLeft: false,
            });
        }
    }
</script>

<Bar {...bar} />
<FileTree
    {roots}
    on:open={open}
    on:menu={menu}
    on:fold={fold}
    on:unfold={unfold}
/>
