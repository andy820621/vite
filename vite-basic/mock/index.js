const mockJs = require("mockjs");

const userList = mockJs.mock({
	"data|100": [
		{
			name: "@name", // 生成不同的英文名
			// cname: "@cname", // 生成不同的中文名 (*** "@name", "@cname" 同時只有一種能被Random產生 ***)
			"id|+1": 1,
			time: "@time",
			date: "@date",
		},
	],
});

module.exports = [
	{
		method: "post",
		url: "/api/users",
		response: ({ body }) => {
			// body --> 請求體
			return {
				code: 200,
				message: "success",
				data: userList,
			};
		},
	},
];
