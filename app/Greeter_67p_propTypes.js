import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';

class Greeter_67p_propTypes extends Component {

	render() {
		//...greetings 속성값을 지정하지 않으면 빈값이 출력됨.
		//...이러한 상황을 안내하기 위해 propTypes를 사용함.
		return( 
			<h1>
				{this.props.greetings}
			</h1>
			)
	}
}

Greeter_67p_propTypes.propTypes = {
	greetings: PropTypes.string
}

Greeter_67p_propTypes.defaultProps = {
	greetings: "JoyWins"
}

render(<Greeter_67p_propTypes />, 
       document.getElementById('root'));