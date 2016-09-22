//...68p
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

//...컴포넌트의 인스턴스를 생성할 때 propTypes 의 요건이 충족되지 않으면
//...console.warn 항목이 로깅됨.
//...예를 들어, 속성을 지정하지 않고 Greeter_propTypes 컴포넌트를
//...렌더링하려면 Warning 경고가 출력됨.
//...Warning: Failed propTypes: Required prop 'greetings' was not specified
//...in 'Greeter_propTypes'.
Greeter_propTypes.propTypes = {
	greetings: PropTypes.string.isRequired
}

render(<Greeter_propTypes />,
       document.getElementById('root'));
