import React, {Component} from 'react';
import {render} from 'react-dom';

class Greeter_67p_propTypes extends Component{
  render(){
    return(
      <h1>{this.props.greetings}</h1>
    );
  }
}

render(<Greeter_67p_propTypes greetings="Hi, JoyWins"/>
       , document.getElementById('zroot'));
