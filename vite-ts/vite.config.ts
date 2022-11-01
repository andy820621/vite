import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import path from "path";

export default defineConfig({
	plugins: [checker({ typescript: true })], // e.g. use TypeScript check
	build: {
		minify: false,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "./index.html"),
				product: path.resolve(__dirname, "./src/product.html"),
			},
			output: {
				// 分包策略
				manualChunks: (id: string) => {
					if (id.includes("node_modules")) return "vendor";
				},
			},
		},
	},
});
