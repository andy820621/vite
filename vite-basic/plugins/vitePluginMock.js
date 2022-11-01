const fs = require("fs");
const { resolve } = require("path");

module.exports = (options) => {
	return {
		// (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>
		configureServer(server) {
			const mockStat = fs.statSync("mock");
			let mockResult = [];

			if (mockStat.isDirectory()) {
				const path = resolve(process.cwd(), "mock/index.js");
				mockResult = require(path);
				console.log("mockResult", mockResult);
			}

			server.middlewares.use((req, res, next) => {
				const matchItem = mockResult.find(
					(mockDescriptor) => mockDescriptor.url === req.url
				);

				if (matchItem) {
					const responseData = matchItem.response(req);
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify(responseData));
				} else {
					next();
				}
			});
		},
	};
};
