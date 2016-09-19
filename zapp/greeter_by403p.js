//...393p.인사말을 포함하는 새로운 HTML요소를 반환함.
module.exports = function(){
	var greet = document.createElement('div');
	greet.textContent = "Hi there and greetings^^!";
	return greet;
}
