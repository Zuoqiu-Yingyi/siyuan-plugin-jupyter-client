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

<!-- 设置面板 -->

<script lang="ts">
    import Input from "@workspace/components/siyuan/setting/item/Input.svelte";
    import { ItemType } from "@workspace/components/siyuan/setting/item/item";
    import Item from "@workspace/components/siyuan/setting/item/Item.svelte";
    import Panel from "@workspace/components/siyuan/setting/panel/Panel.svelte";
    import Panels from "@workspace/components/siyuan/setting/panel/Panels.svelte";
    import Tabs from "@workspace/components/siyuan/setting/tab/Tabs.svelte";

    import { DEFAULT_SETTINGS, getWsUrl } from "@/jupyter/settings";

    import type { ITab } from "@workspace/components/siyuan/setting/tab";

    import type JupyterClientPlugin from "@/index";
    import type { IConfig } from "@/types/config";

    interface IProps {
        config: IConfig; // 传入的配置项
        plugin: InstanceType<typeof JupyterClientPlugin>; // 插件实例
    }

    const {
        config,
        plugin,
    }: IProps = $props();

    // svelte-ignore state_referenced_locally
    const i18n = plugin.i18n;

    const placeholder_wsUrl = $derived(getWsUrl(config.jupyter.server.settings.baseUrl));

    /**
     * 更新并保存设置项
     * @param restart - 是否需要重启 juptyer 客户端
     */
    async function updated(restart: boolean = false) {
        await plugin.updateConfig(config, restart);
    }

    function resetOptions() {
        plugin.siyuan.confirm(
            i18n.settings.generalSettings.reset.title, // 标题
            i18n.settings.generalSettings.reset.description, // 文本
            async () => {
                await plugin.resetConfig(); // 重置配置
                globalThis.location.reload(); // 刷新页面
            }, // 确认按钮回调
        );
    }

    const PanelKey = {
        general: "general", // 常规设置
        jupyter: "jupyter", // Jupyter 设置
        xterm: "xterm", // Xterm 设置
    } as const;

    const TabKey = {
        global: "global", // 全局设置
        service: "service", // 服务设置
        execute: "execute", // 运行设置
        output: "output", // 输出设置
        import: "import", // 导入设置
    } as const;

    const panels_focus_key = PanelKey.general;
    const panels: ITab[] = [
        {
            key: PanelKey.general,
            text: i18n.settings.generalSettings.title,
            name: i18n.settings.generalSettings.title,
            icon: "#iconSettings",
        },
        {
            key: PanelKey.jupyter,
            text: i18n.settings.jupyterSettings.title,
            name: i18n.settings.jupyterSettings.title,
            icon: "#icon-jupyter-client",
        },
        {
            key: PanelKey.xterm,
            text: i18n.settings.xtermSettings.title,
            name: i18n.settings.xtermSettings.title,
            icon: "#icon-jupyter-client-terminal",
        },
    ];

    const jupyter_settings_tabs_focus_key = TabKey.global;
    const tabs = {
        jupyter: [
            {
                key: TabKey.global,
                text: i18n.settings.jupyterSettings.globalTab.title,
                name: i18n.settings.jupyterSettings.globalTab.title,
                icon: "⚙",
            },
            {
                key: TabKey.service,
                text: i18n.settings.jupyterSettings.serviceTab.title,
                name: i18n.settings.jupyterSettings.serviceTab.title,
                icon: "🌐",
            },
            {
                key: TabKey.execute,
                text: i18n.settings.jupyterSettings.executeTab.title,
                name: i18n.settings.jupyterSettings.executeTab.title,
                icon: "▶",
            },
            {
                key: TabKey.output,
                text: i18n.settings.jupyterSettings.outputTab.title,
                name: i18n.settings.jupyterSettings.outputTab.title,
                icon: "🖨️",
            },
            {
                key: TabKey.import,
                text: i18n.settings.jupyterSettings.importTab.title,
                name: i18n.settings.jupyterSettings.importTab.title,
                icon: "📤︎",
            },
        ] as ITab[],
    };
</script>

<Panels
    focus={panels_focus_key}
    {panels}
    let:focus={focusPanel}
>
    <!-- 常规设置面板 -->
    <Panel display={panels[0]?.key === focusPanel}>
        <!-- 重置设置 -->
        <Item
            text={i18n.settings.generalSettings.reset.description}
            title={i18n.settings.generalSettings.reset.title}
        >
            <Input
                slot="input"
                settingKey="Reset"
                settingValue={i18n.settings.generalSettings.reset.text}
                type={ItemType.button}
                on:clicked={resetOptions}
            />
        </Item>
    </Panel>

    <!-- jupyter 设置面板 -->
    <Panel display={panels[1]?.key === focusPanel}>
        <Tabs
            focus={jupyter_settings_tabs_focus_key}
            tabs={tabs.jupyter}
            let:focus={focusTab}
        >
            <!-- 标签页 1 - 全局设置 -->
            <div
                class:fn__none={tabs.jupyter[0]?.key !== focusTab}
                data-type={tabs.jupyter[0]?.name}
            >
                <!-- connect -->
                <Item
                    text={i18n.settings.jupyterSettings.globalTab.enable.description}
                    title={i18n.settings.jupyterSettings.globalTab.enable.title}
                >
                    <Input
                        slot="input"
                        settingKey="enable"
                        settingValue={config.jupyter.server.enable}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.server.enable = e.detail.value;
                            await updated(true);
                        }}
                    />
                </Item>

                <!-- 语言服务调用延时 -->
                <Item
                    text={i18n.settings.jupyterSettings.globalTab.delay.description}
                    title={i18n.settings.jupyterSettings.globalTab.delay.title}
                >
                    <Input
                        slot="input"
                        limits={{
                            min: 0,
                            max: Infinity,
                            step: 25,
                        }}
                        settingKey="delay"
                        settingValue={config.jupyter.edit.delay}
                        type={ItemType.number}
                        on:changed={async (e) => {
                            config.jupyter.edit.delay = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>
            </div>

            <!-- 标签页 2 - 服务设置 -->
            <div
                class:fn__none={tabs.jupyter[1]?.key !== focusTab}
                data-type={tabs.jupyter[1]?.name}
            >
                <!-- base url -->
                <Item
                    block={true}
                    text={i18n.settings.jupyterSettings.serviceTab.baseUrl.description}
                    title={i18n.settings.jupyterSettings.serviceTab.baseUrl.title}
                >
                    <Input
                        slot="input"
                        block={true}
                        placeholder={DEFAULT_SETTINGS.baseUrl}
                        settingKey="baseUrl"
                        settingValue={config.jupyter.server.settings.baseUrl}
                        type={ItemType.text}
                        on:changed={async (e) => {
                            config.jupyter.server.settings.baseUrl = e.detail.value;
                            await updated(true);
                        }}
                    />
                </Item>

                <!-- app url -->
                <Item
                    block={true}
                    text={i18n.settings.jupyterSettings.serviceTab.appUrl.description}
                    title={i18n.settings.jupyterSettings.serviceTab.appUrl.title}
                >
                    <Input
                        slot="input"
                        block={true}
                        placeholder={DEFAULT_SETTINGS.appUrl}
                        settingKey="appUrl"
                        settingValue={config.jupyter.server.settings.appUrl}
                        type={ItemType.text}
                        on:changed={async (e) => {
                            config.jupyter.server.settings.appUrl = e.detail.value;
                            await updated(true);
                        }}
                    />
                </Item>

                <!-- websocket url -->
                <Item
                    block={true}
                    text={i18n.settings.jupyterSettings.serviceTab.wsUrl.description}
                    title={i18n.settings.jupyterSettings.serviceTab.wsUrl.title}
                >
                    <Input
                        slot="input"
                        block={true}
                        placeholder={placeholder_wsUrl}
                        settingKey="wsUrl"
                        settingValue={config.jupyter.server.settings.wsUrl}
                        type={ItemType.text}
                        on:changed={async (e) => {
                            config.jupyter.server.settings.wsUrl = e.detail.value;
                            await updated(true);
                        }}
                    />
                </Item>

                <!-- token -->
                <Item
                    block={true}
                    text={i18n.settings.jupyterSettings.serviceTab.token.description}
                    title={i18n.settings.jupyterSettings.serviceTab.token.title}
                >
                    <Input
                        slot="input"
                        block={true}
                        settingKey="token"
                        settingValue={config.jupyter.server.settings.token}
                        type={ItemType.text}
                        on:changed={async (e) => {
                            config.jupyter.server.settings.token = e.detail.value;
                            await updated(true);
                        }}
                    />
                </Item>
            </div>

            <!-- 标签页 3 - 运行设置 -->
            <div
                class:fn__none={tabs.jupyter[2]?.key !== focusTab}
                data-type={tabs.jupyter[2]?.name}
            >
                <!-- 运行时跳转 -->
                <Item
                    text={i18n.settings.jupyterSettings.executeTab.executeGoto.description}
                    title={i18n.settings.jupyterSettings.executeTab.executeGoto.title}
                >
                    <Input
                        slot="input"
                        settingKey="goto"
                        settingValue={config.jupyter.execute.goto}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.goto = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 输入时跳转 -->
                <Item
                    text={i18n.settings.jupyterSettings.executeTab.inputGoto.description}
                    title={i18n.settings.jupyterSettings.executeTab.inputGoto.title}
                >
                    <Input
                        slot="input"
                        settingKey="input.goto"
                        settingValue={config.jupyter.execute.input.goto}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.input.goto = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 错误中断 -->
                <Item
                    text={i18n.settings.jupyterSettings.executeTab.stopOnError.description}
                    title={i18n.settings.jupyterSettings.executeTab.stopOnError.title}
                >
                    <Input
                        slot="input"
                        settingKey="content.stop_on_error"
                        settingValue={config.jupyter.execute.content.stop_on_error}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.content.stop_on_error = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>
            </div>

            <!-- 标签页 4 - 输出设置 -->
            <div
                class:fn__none={tabs.jupyter[3]?.key !== focusTab}
                data-type={tabs.jupyter[3]?.name}
            >
                <!-- 使用 Xterm 渲染输出内容 -->
                <Item
                    text={i18n.settings.jupyterSettings.outputTab.xterm.description}
                    title={i18n.settings.jupyterSettings.outputTab.xterm.title}
                >
                    <Input
                        slot="input"
                        settingKey="output.parser.xterm"
                        settingValue={config.jupyter.execute.output.parser.xterm}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.output.parser.xterm = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 转义标志符号 -->
                <Item
                    text={i18n.settings.jupyterSettings.outputTab.escaped.description}
                    title={i18n.settings.jupyterSettings.outputTab.escaped.title}
                >
                    <Input
                        slot="input"
                        settingKey="output.parser.escaped"
                        settingValue={config.jupyter.execute.output.parser.escaped}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.output.parser.escaped = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 解析控制字符 -->
                <Item
                    text={i18n.settings.jupyterSettings.outputTab.cntrl.description}
                    title={i18n.settings.jupyterSettings.outputTab.cntrl.title}
                >
                    <Input
                        slot="input"
                        settingKey="output.parser.cntrl"
                        settingValue={config.jupyter.execute.output.parser.cntrl}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.execute.output.parser.cntrl = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>
            </div>

            <!-- 标签页 5 - 导入设置 -->
            <div
                class:fn__none={tabs.jupyter[4]?.key !== focusTab}
                data-type={tabs.jupyter[4]?.name}
            >
                <!-- 使用 Xterm 渲染输出内容 -->
                <Item
                    text={i18n.settings.jupyterSettings.importTab.xterm.description}
                    title={i18n.settings.jupyterSettings.importTab.xterm.title}
                >
                    <Input
                        slot="input"
                        settingKey="import.parser.xterm"
                        settingValue={config.jupyter.import.parser.xterm}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.import.parser.xterm = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 转义标志符号 -->
                <Item
                    text={i18n.settings.jupyterSettings.importTab.escaped.description}
                    title={i18n.settings.jupyterSettings.importTab.escaped.title}
                >
                    <Input
                        slot="input"
                        settingKey="import.parser.escaped"
                        settingValue={config.jupyter.import.parser.escaped}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.import.parser.escaped = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>

                <!-- 解析控制字符 -->
                <Item
                    text={i18n.settings.jupyterSettings.importTab.cntrl.description}
                    title={i18n.settings.jupyterSettings.importTab.cntrl.title}
                >
                    <Input
                        slot="input"
                        settingKey="import.parser.cntrl"
                        settingValue={config.jupyter.import.parser.cntrl}
                        type={ItemType.checkbox}
                        on:changed={async (e) => {
                            config.jupyter.import.parser.cntrl = e.detail.value;
                            await updated();
                        }}
                    />
                </Item>
            </div>
        </Tabs>
    </Panel>

    <!-- xterm 设置面板 -->
    <Panel display={panels[2]?.key === focusPanel}>
        <!-- 字体设置 -->
        <Item
            text={i18n.settings.xtermSettings.fontFamily.description}
            title={i18n.settings.xtermSettings.fontFamily.title}
        >
            <Input
                slot="input"
                placeholder="--b3-font-family-code"
                settingKey="fontFamily"
                settingValue={config.xterm.options.fontFamily}
                type={ItemType.text}
                on:changed={async (e) => {
                    config.xterm.options.fontFamily = e.detail.value;
                    await updated();
                }}
            />
        </Item>
    </Panel>
</Panels>

<style lang="less">
</style>
