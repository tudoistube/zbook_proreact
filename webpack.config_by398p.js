//...398p.(2_6)
module.exports = {
/*
웹팩 구성 옵션 중 하나인 소스맵 생성.
패키지의 모든 자바스크립트 모듈을 하나의 번들 파일로 만들면 디버깅할 때 문제점을 찾기
어려운 단점을	해결하기 위해 소스맵을 이용함.
소스맵은 번들 파일 내의 코드를 원래 소스 파일로 연결하여 브라우저에서 코드를 읽고
디버깅하기 쉽게 함.

원래 작성된 파일을 가리키는 소스맵을 생성하는 devtool 옵션.
source-map
		장점>	모든 기능이 완전하고 최고 품질의 소스맵 생성.
		단점>	빌드 프로세스가 느려짐.

cheap-module-source-map
		컬럼 매핑을 제외한 소스맵 생성.

eval-source-map
		개발중에는 유용하지만 실무 버전에선 성능과 보안 문제로 사용하지 말것.

cheap-module-eval-source-map
		빌드 중에 소스맵을 생성하는 가장 빠른 방법임.
		실무용 번들 생성에는 적합하지 않음.

*/
	devtool: 'eval-source-map',
	entry: __dirname + "/zapp/main.js",
	output: {
		path: __dirname + "/zpublic/",
		filename: "bundle.js"
	}
}
