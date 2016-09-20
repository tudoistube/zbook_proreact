/*...S.by12p.
 Error Message : Unexpected token "<"
 https://codedump.io/share/3woX0EK9XhBT/1/babel-loader-jsx-syntaxerror-unexpected-token
 1. npm install babel-preset-react 을 실행해서 설치함.
 2. webpack.config.js 파일에서 babel 로더의 query 속성값을 설정함.
 3. ReactDOM 을 사용해서 렌더링하도록 App.js 파일을 변경함.

 Error Message : Uncaught TypeError: _react2.default.render is not a function
 http://react-china.org/t/-react2-default-render-is-not-a-function/5896/10
 방법1.	React.render(<HiWorld />, document.getElementById('zroot')); 를
 	render(<HiWorld />, document.getElementById('zroot')); 로 변경함.

 방법2.	1. import {render} from 'react-dom'; 를 import ReactDOM from 'react-dom'; 로 변경함.
 	2. render(<HiWorld />, document.getElementById('zroot')); 를
 	    ReactDOM.render(<HiWorld />, document.getElementById('zroot')); 로 변경함.  
*/
import React from 'react';
//import {render} from 'react-dom'; //...방법1.
import ReactDOM from 'react-dom'; //...방법2.
/*...E.by12p.*/

/*...by13p.
import React, {Component} from 'react';
import {render} from 'react-dom';*/

// Parent Component
class HiWorld extends React.Component { //...by12p.ref434p.
//class HiWorld extends Component {
  render() {
    return (
        <h1>Hi, 2DoIs2Be</h1>
    );
  }
}

//render(<HiWorld />, document.getElementById('zroot')); //...방법1.
ReactDOM.render(<HiWorld />, document.getElementById('zroot')); //...방법2.
