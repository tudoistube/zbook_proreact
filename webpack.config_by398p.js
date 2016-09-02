//...398p.(2_6)
module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/zapp/zmain.js",
	output: {
		path: __dirname + "/zpublic/",
		filename: "zbundle.js"
	}
}
