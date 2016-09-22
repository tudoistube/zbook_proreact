//...69p
import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';

class Greeter_propTypes extends Component {

	render() {
		/*
		...이 컴포넌트에서 greetings 속성은 문자열이며, 반드시 지정해야 함.
		greetings 속성값을 지정하지 않으면 빈값이 출력됨.
		이러한 상황을 안내하기 위해 propTypes를 사용함.
		*/
		return(
			<h1>
				{this.props.greetings}
			</h1>
			)
	}
}

Greeter_propTypes.propTypes = {
	greetings: PropTypes.string
}

Greeter_propTypes.defaultProps = {
	greetings: "JoyWins uses propTypes ^ ^!!!"
}

render(<Greeter_propTypes />,
       document.getElementById('root'));
