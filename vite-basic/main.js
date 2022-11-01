import "./src/imageLoader";

fetch("/api/users", {
	method: "post",
})
	.then((data) => console.log("data", data))
	.catch((err) => console.log("error", err));

// console.log("meta", import.meta.env);
