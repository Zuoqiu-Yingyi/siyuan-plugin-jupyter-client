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

import { resolve } from "node:path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import {
    defineConfig,

} from "vite";

import type { BuildOptions } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async (env) => ({
    base: `./`,
    plugins: [
        svelte({
            preprocess: [
                sveltePreprocess({
                    typescript: true,
                    less: true,
                }),
            ],
        }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
    build: {
        minify: true,
        // sourcemap: "inline",
        rollupOptions: {
            external: [
                "siyuan",
                /^@electron\/.*$/,
            ],
            output: {
                entryFileNames: (chunkInfo) => {
                    // console.log(chunkInfo);
                    switch (chunkInfo.name) {
                        case "index":
                            return "index.js";
                        case "jupyter":
                            return "workers/jupyter.js";

                        default:
                            return "entries/[name]-[hash].js";
                    }
                },
                assetFileNames: (assetInfo) => {
                    // console.log(chunkInfo);
                    switch (assetInfo.name) {
                        case "style.css":
                        case "index.css":
                            return "index.css";

                        default:
                            return "assets/[name]-[hash][extname]";
                    }
                },
            },
        },
        // eslint-disable-next-line ts/no-use-before-define
        ...build(env.mode),
    },
}));

function build(mode: string): BuildOptions {
    switch (mode) {
        // eslint-disable-next-line default-case-last
        default:
        case "plugin":
            return {
                emptyOutDir: true,
                lib: {
                    entry: resolve(import.meta.dirname, "src/index.ts"),
                    fileName: "index",
                    formats: ["cjs"],
                },
            };

        case "workers":
            return {
                emptyOutDir: false,
                lib: {
                    entry: resolve(import.meta.dirname, "src/workers/jupyter.ts"),
                    fileName: "jupyter",
                    formats: ["es"],
                },
            };
    }
}
