import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config.js";
import viteDevConfig from "./vite.dev.config.js";
import viteProdConfig from "./vite.prod.config.js";

// 策略模式
const envResolver = {
	// config for production mode
	build: () => {
		console.log("生產環境");
		return { ...viteBaseConfig, ...viteProdConfig };
	},
	// config for development mode
	serve: () => {
		console.log("開發環境");
		return Object.assign({}, viteBaseConfig, viteDevConfig);
	},
};

export default defineConfig(({ command, mode }) => {
	// command: build | serve
	// mode: production| development
	// process.cwd() => get the file's base directory
	// const env = loadEnv(mode, process.cwd(), "");
	// console.log("env: ", env);
	return envResolver[command]();
});
