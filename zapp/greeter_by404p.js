//...403~404p.
//...로더 사용.
var config = require('./config.json');

//...393p.인사말을 포함하는 새로운 HTML요소를 반환함.
module.exports = function(){
	var greet = document.createElement('div');
	//greet.textContent = "Hi, JoyWins! Good! Now you have run the webpack-dev-server!";
	greet.textContent = config.greetText;
	return greet;
}
