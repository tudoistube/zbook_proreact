/*
D:\WSpace_React_Tutorial\zproreact2_webpack_390p\zapp 생성.	
	원래 소스코드와 자바스크립트 모듈이 있음.
*/
//...393p.인사말을 포함하는 새로운 HTML요소를 반환함.
module.exports = function(){
	var greet = document.createElement('div');
	greet.textContent = "Hi there and greetings^^!";
	return greet;
}
