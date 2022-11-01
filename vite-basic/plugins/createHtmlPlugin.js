// Implemente "vite-html-plugin"
// https://www.npmjs.com/package/vite-html-plugin

module.exports = (options) => {
	return {
		// IndexHtmlTransformHook | { enforce?: 'pre' | 'post', transform: IndexHtmlTransformHook }
		transformIndexHtml: {
			enforce: "pre", // 提前調用此插件
			transform: (html, ctx) => {
				return html.replace(/<%= title %>/g, options.inject.data.title);
			},
		},
	};
};
