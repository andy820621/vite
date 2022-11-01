// Implemente "vite-aliases"
// https://www.npmjs.com/package/vite-aliases

const fs = require("fs");
const { resolve } = require("path");
const srcPath = resolve(__dirname, "../src");

function getTotalDir(keyName) {
	const srcData = fs.readdirSync(srcPath);
	const diffResult = diffDirAndFiles(srcData, "../src");
	const resolveAliasesObj = {};
	diffResult.dirs.forEach((dirName) => {
		const key = `${keyName}${dirName}`;
		const path = srcPath + `/${dirName}/`;
		resolveAliasesObj[key] = path;
	});

	return resolveAliasesObj;
}

function diffDirAndFiles(dirFilesArr = [], basePath = "") {
	const result = {
		dirs: [],
		files: [],
	};
	dirFilesArr.forEach((name) => {
		const currentFileStat = fs.statSync(
			resolve(__dirname, basePath + "/" + name)
		);
		if (!currentFileStat.isDirectory()) result.files.push(name);
		else result.dirs.push(name);
	});

	return result;
}

module.exports = ({ keyName = "@" } = {}) => {
	return {
		// (config: UserConfig, env: { mode: string, command: string }) => UserConfig | null | void
		config(config, env) {
			const resolveAliasesObj = getTotalDir(keyName);
			return {
				resolve: {
					alias: resolveAliasesObj,
				},
			};
		},
	};
};
