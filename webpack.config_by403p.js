//..401~403p.
module.exports = {
	devtool: 'eval-source-map',

	entry: __dirname + "/zapp/main.js",

	output: {
		path: __dirname + "/zpublic",

		filename: "bundle.js"
	},

/*...401p.loader 설치.
웹팩 로더 설치.
스트립트와 도구를 통해 소스 파일을 전처리하고 다양한 변경과 변환을 적용할 수 있음.
JSON 파일을 일반 자바스크립트로 구문 분석하거나
JSX 등 차세대 자바스크립트 코드를 현재 브라우저가 이해할 수 있는 일반 자바스크립트로 변환함.

별도로 설치한 후, webpack.config.js의 "modules"키에서 구성함.

로더구성 설정 항목.
	test : 이 로더로 처리하기 위해 일치해야 하는 파일 확장자를 비교하는 정규 표현식(필수).
	loader : 로더의 이름(필수).
	include/exclude.
	query : 로더로 추가 옵션을 전달하는데 이용하는 쿼리 설정.
*/
	module: {
		loaders: [
		  {
			test: /\.json$/,
			loader: "json"
		  }
		]
	},

/*
...웹팩 개발 서버를 'devserver' 항목으로 구성함.
새로운 속성을 추가할 때 마다 이전 마지막 항목의 끝에 콤마(,) 추가 확인할 것.
*/
	devServer: {
		//...웹펙개발서버는 기본적으로 프로젝트 루트에 있는 파일을 서비스함.
		//...만약 다른 폴더의 파일을 서비스하려면 contentBase 에서 설정해야 함.
		contentBase: "./zpublic",

		//...port : 생략할 경우 기본값은 '8080' 임.

		//...서버가 터미널에 출력하는 내용 색상을 지정함.
		colors: true,

		//...HTML5 히스토리 API를 이용하는 단일 페이지 애플리케이션을 개발할 때 유용함.
		//...'true' 로 설정하면 기존 애셋과 매핑되지 않는 웹팩 개발 서버에 대한 모든
		//...요청이 곧바로 '/' 즉, index.html 파일로 라우팅됨.
		historyApiFallback: true,

		//...inline : 'true' 로 설정하면 작은 클라이언트 엔트리를 번들에 삽입해
		//            페이지가 변경되면 새로 고침됨.
		inline: true
	}
}
