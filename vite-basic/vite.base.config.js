import { defineConfig } from "vite";
const postcssPresetEnv = require("postcss-preset-env");
import MyViteAlias from "./plugins/viteAliases";
import MyCreateHtmlPlugin from "./plugins/createHtmlPlugin";
import { viteMockServe } from "vite-plugin-mock";
import MyViteMockServe from "./plugins/vitePluginMock";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
	plugins: [
		MyViteAlias(),
		MyCreateHtmlPlugin({
			inject: {
				data: {
					title: "主頁標籤",
				},
			},
		}),
		// viteMockServe(),
		MyViteMockServe(),
	],
	optimizeDeps: {
		exclude: [], // Dependencies to exclude from pre-bundling. (指定不進行依賴預構建的模組)
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `$injectedColor: orange;
				@import "./scss/variables";`,
			},
		},
		// 為了好debug可以設置為 true，default: false
		devSourcemap: true,
		postcss: {
			// https://www.npmjs.com/package/postcss-preset-env
			// npm i postcss-preset-env -D
			plugins: [
				postcssPresetEnv({
					// importFrom: path.resolve(__dirname, "./globalVariable.css"), // 需要被 postcss 儲存的全域參數
				}),
			],
		},
	},
});
