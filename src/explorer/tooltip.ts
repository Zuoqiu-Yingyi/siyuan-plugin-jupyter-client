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

import type MonacoEditorPlugin from "@/index";
import { FileTreeNodeType } from "@workspace/components/siyuan/tree/file";
import { parse } from "@workspace/utils/path/browserify";
import { Icon } from "./icon";

/* 提示信息管理 */
export class Tooltip {
    protected readonly i18n: MonacoEditorPlugin["i18n"];
    constructor(
        public readonly plugin: InstanceType<typeof MonacoEditorPlugin>, // 插件对象
    ) {
        this.i18n = this.plugin.i18n;
    }

    /* 根据节点信息生成提示信息 */
    public make(type: FileTreeNodeType, path: string): string {
        switch (type) {
            case FileTreeNodeType.Root:
                return this.i18n.explorer.workspace.name;
            case FileTreeNodeType.Folder:
                return this.i18n.explorer.folder.ariaLabel;
            case FileTreeNodeType.File: {
                const info = parse(path); // 节点路径信息
                switch (true) {
                    case info.ext === ".sy": // 思源文件
                        return this.i18n.explorer.tooltips.siyuanDoc;
                    default:
                        return this.i18n.explorer.file.ariaLabel;
                }
            }
        }
    }
}
