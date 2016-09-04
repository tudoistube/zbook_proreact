//...by14p.
//...자바스크립트에서 중괄호({}) 안에 있는 값은 자바스크립트 식으로 계산되고
//...마크업 안에 렌더링됨.
import React, {Component} from 'react';
import {render} from 'react-dom';

// Parent Component
class HiWorld extends Component {
  render() {
  	var name = "JoyWins";
    return (
        <h1>Hi, {name}</h1>
    );
  }
}

render(<HiWorld />, document.getElementById('zroot'));
