/*...바벨 사용 전, 주석처리함.
var config = require('./zconfig.json');
module.exports = function(){
	var greet = document.createElement('div');
	greet.textContent = config.greetText;
	return greet;
}
*/

//...405p. 바벨 사용.
import React, {Component} from 'react';
import config from './zconfig.json';

//...410p. CSS 모듈 사용.
import zstyles from './zstyle_greeter.css';

class Zgreeter extends Component {
	render(){
		return (
			<div className={zstyles.zroot}>
				{config.greetText}
			</div>
		);
	}
}

export default Zgreeter;
