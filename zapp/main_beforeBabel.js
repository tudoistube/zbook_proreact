/*
D:\WSpace_React_Tutorial\zwebpack_sample_project\app 생성.	
	원래 소스코드와 자바스크립트 모듈이 있음.
*/
//...393p.Greeter를 가져오고 반환된 요소를 페이지에 삽입함.
var greeter = require('./greeter.js');
document.getElementById('root').appendChild(greeter());