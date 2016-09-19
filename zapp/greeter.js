/*...바벨 사용 전, 주석처리함.
var config = require('./config.json');//...로더 사용.
module.exports = function(){
	var greet = document.createElement('div');
	greet.textContent = config.greetText;
	return greet;
}
*/

//...405~p. 바벨 사용.
import React, {Component} from 'react';
import config from './config.json';

class Zgreeter extends Component {
	render(){
		return (
			<div>
				{config.greetText}
			</div>
		);
	}
}

export default Zgreeter;
