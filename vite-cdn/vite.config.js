import { defineConfig } from "vite";
import importToCDN from "vite-plugin-cdn-import";

export default defineConfig({
	plugins: [
		importToCDN({
			modules: [
				{
					name: "lodash",
					var: "_",
					path: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js`,
				},
			],
		}),
	],
});
