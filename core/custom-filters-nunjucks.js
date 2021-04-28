



module.exports = function (environment) {
	environment.addFilter("getLastElement", (arr) => arr[arr.length - 1])

	environment.addFilter("setAttribute", (arr) => {
		const singleTags = ["checked", "required", "disabled"]

		return arr[0] + "='" + arr[1] + "'"
		// if (arr[1] === "" || arr[1] === undefined) {
		// 	return ""
		// } else if (singleTags.includes(arr[1])) {
		// 	return arr[1]
		// } else {
		// 	return arr[1].length > 1
		// 		? `${arr[0]}=${arr[1].join(" ")}`
		// 		: `${arr[0]}=${arr[1]}`
		// }
	})

	// environment.addFilter('slug', function(str) {
	//   return str && str.replace(/\s/g, '-', str).toLowerCase();
	// });

	// environment.addGlobal('globalTitle', 'My global title')
}
