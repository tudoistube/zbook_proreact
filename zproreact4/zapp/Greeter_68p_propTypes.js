import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

class Greeter_propTypes extends Component{
  render(){
    return(
      <h1>{this.props.greetings}</h1>
    );
  }
}

Greeter_propTypes.propTypes = {
  //greetings: PropTypes.string.isRequired
  greetings: PropTypes.string
}
Greeter_propTypes.defaultProps = {
  greetings: "JoyWins uses propTypes defaultProps."
}

render(<Greeter_propTypes />
       , document.getElementById('zroot'));
