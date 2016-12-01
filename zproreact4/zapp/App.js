/*.XXX
import React from 'react';
...before/after : 13p. 타이핑 수고 줄이기.*/
import React, {Component} from 'react';
import {render} from 'react-dom';//...방법1.
//import ReactDOM from 'react-dom';//...방법2.

/*.XXX.
class HiWorld extends React.Component{
...before/after : 13p. 타이핑 수고 줄이기.*/
class HiWorld extends Component{
  render(){
    var myName = "JoyWins! Nice to meet you^_____^"
    return(
      <h1>Hi, {myName}</h1>
    );
  }
}

render(<HiWorld />, document.getElementById('zroot'));//...방법1.
//ReactDOM.render(<HiWorld />, document.getElementById('zroot'));//...방법2.
