//..424p.
//...원래의 웹팩 개발 구성(webpack.config.js)에서 devtool, devServer, HMR 구성을
//...제거한 것임.

var zwebpack = require("webpack");
var ZhtmlWebpackPlugin = require("html-webpack-plugin");
var ZextractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: __dirname + "/zapp/zmain.js",
	output: {
		path: __dirname + "/build",
		filename: "[name]-[hash].js"
	},

	module: {
		loaders: [
		  {	test: /\.json$/, loader: "json" },
			{ test: /\.js$/, exclude: /node_modules/,
				loader: "babel"
				//...babelrc 파일 사용으로 query 제거하여 웹팩 구성 파일의 단순함 유지함.
		  },
			{ test: /\.css$/,
				//...로더 구성에서 느낌표("!")는 각기 다른 로더를 동일한 파일 형식으로
				//...연결하는데 사용함.
				//...PostCSS를 CSS 파일 포맷을 위한 새로운 로더로 추가함.
				//loader: 'style!css?modules!postcss'
        loader: ZextractTextPlugin.extract('style', 'css?modules!postcss')
			}
		]
	},

	//...Autoprefixer(PostCSS 플러그인)을 설정함.
	postcss: [
		require('autoprefixer')
	],

	plugins: [
		new zwebpack.BannerPlugin("Copyright tudoistube@gmail.com"),
		new ZhtmlWebpackPlugin({
						template: __dirname + "/zapp/zindex.template.html"
				}),
    new zwebpack.optimize.OccurenceOrderPlugin(),
    new zwebpack.optimize.UglifyJsPlugin(),
    new ZextractTextPlugin("[name]-[hash].css")
	]
}
