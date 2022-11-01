import { defineConfig } from "vite";
const postcssPresetEnv = require("postcss-preset-env");
import { resolve } from "path";
import MyViteAlias from "./plugins/viteAliases";
import MyCreateHtmlPlugin from "./plugins/createHtmlPlugin";
import { viteMockServe } from "vite-plugin-mock";
import MyViteMockServe from "./plugins/vitePluginMock";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@assets": resolve(__dirname, "./src/assets"),
		},
	},
	optimizeDeps: {
		exclude: [], // Dependencies to exclude from pre-bundling. (指定不進行依賴預構建的模組)
	},
	envPrefix: "ENV_", // 設置vite客戶端環境參數較驗的enc前綴 (預設: VITE_)
	css: {
		// 覆蓋css模塊化的預設(ex: style.module.css)，最終設定會丟給 postcss-modules。
		modules: {
			// 設定key的展示形式
			localsConvention: "camelCaseOnly", // dashes, dashesOnly(default), camelCase, camelCaseOnly...
			// 設定模塊化為 scope 或是 global
			scopeBehaviour: "local", // local(default), global
			// 生成名字的類名
			generateScopedName: "[name]_[local]_[hash:5]", // (Rules: https://github.com/webpack/loader-utils#interpolatename)
			hashPrefix: "HsahMePlz", // 增加需要hash的值
			globalModulePaths: ["./main.module.css"], // 不想參與模塊化的路徑
		},
		// key(預處理器的名) + config
		preprocessorOptions: {
			less: {
				math: "always", // 總是執行數學計算，ex: (100px / 2) = 100px / 2 = 50px
				// global variables
				globalVars: {
					main: "red",
				},
			},
			// npm add -D sass
			scss: {
				// 導入 scss 全域參數 | 檔案
				additionalData: `$injectedColor: orange;
				@import "./scss/variables";`,
			},
		},
		// 為了好debug可以設置為true (default: false)
		devSourcemap: true,
		postcss: {
			// https://www.npmjs.com/package/postcss-preset-env
			// npm i postcss-preset-env -D
			plugins: [
				postcssPresetEnv({
					// importFrom: resolve(__dirname, "./globalVariable.css"), // 需要被 postcss 儲存的全域參數
				}),
			],
		},
	},
	build: {
		// 設置 rollup 的構建
		rollupOptions: {
			output: {
				assetFileNames: "[hash].[name].[ext]", // https://rollupjs.org/guide/en/#outputassetfilenames (default: [name].[hash].[ext])
			},
		},
		assetsInlineLimit: 4096, // 小於此閾值的導入或引用的資產將作為base64 URL內聯，以避免額外的 HTTP 請求
		outDir: "myDist", // default: "dist"
		assetsDir: "myAssets", // default: "assets"
		emptyOutDir: true, // default: true (if outDir is inside root)
		minify: false, // default: true
	},
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
		viteCompression(), // 因為gz文件從伺服器傳送回瀏覽器後，瀏覽器需要多做一步解壓，如果檔案沒有很大的話反而會適得其反，建議在檔案很大時才使用 plugin 去壓縮出 gzip
	],
	// server: 設定開發中的伺服器
	server: {
		// 設定跨來源請求(CORS)的解決方案
		proxy: {
			"/backend": {
				// 把所有是 "/backend" 開頭的請求都將其代理到 target 屬性設定的域名去
				target: "http://nexifytw.mynetgear.com:45000/api/Record/",
				changeOrigin: true, // 換源與否
				rewrite: (path) => path.replace(/^\/backend/, ""),
			},
		},
	},
});
