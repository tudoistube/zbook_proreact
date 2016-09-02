//..420p.
//...원래의 웹팩 개발 구성(webpack.config.js)에서 devtool, devServer, HMR 구성을
//...제거한 것임.

var zwebpack = require("webpack");
var ZhtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: __dirname + "/zapp/zmain.js",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
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
				loader: 'style!css?modules!postcss'
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
				})
	],

	devServer: {
		//...웹펙개발서버는 기본적으로 프로젝트 루트에 있는 파일을 서비스함.
		//...만약 다른 폴더의 파일을 서비스하려면 contentBase 에서 설정해야 함.
		//...HMR 사용으로 인해 zpublic 폴더 삭제로 주석 처리함.
		//contentBase: "./zpublic",

		//...port : 생략할 경우 기본값은 '8080' 임.

		//...서버가 터미널에 출력하는 내용 색상을 지정함.
		colors: true,

		//...HTML5 히스토리 API를 이용하는 단일 페이지 애플리케이션을 개발할 때 유용함.
		//...'true' 로 설정하면 기존 애셋과 매핑되지 않는 웹팩 개발 서버에 대한 모든
		//...요청이 곧바로 '/' 즉, index.html 파일로 라우팅됨.
		historyApiFallback: true,

		//...inline : 'true' 로 설정하면 작은 클라이언트 엔트리를 번들에 삽입해
		//            페이지가 변경되면 새로 고침됨.
		inline: true,

		hot: true

	}
}
