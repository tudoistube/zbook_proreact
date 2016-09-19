//...395~397p.(2_5)
/*
...395p.웹팩 실행을 위한 빌드와 관련한 구성파일 정의.
웹팩은 로드한 모듈에 로더와 플러그인을 이용해 변환할 수 있고, 빌드 관련 정보를
모두 담는 webpack.config.js 파일을 생성해서 웹팩 실행을 쉽게 함.
*/
module.exports = {
	entry: __dirname + "/zapp/main.js",
	output: {
		path: __dirname + "/zpublic/",
		filename: "bundle.js"
	}
}
