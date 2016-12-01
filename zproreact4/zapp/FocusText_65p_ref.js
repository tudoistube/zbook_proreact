import React, { Component } from 'react';
import {render} from 'react-dom';

class FocusText_65p_ref extends Component{
  handleClick(){
    this.refs.myTextInput.focus();
    console.log("handleClick triggered");
  }

  render(){
    return(
      <div>
        <input type="text" ref="myTextInput"/>
        <input type="button"
               value="Focus the text input"
               onClick={this.handleClick.bind(this)}/>
      </div>
    );
  }
}

render(<FocusText_65p_ref />, document.getElementById('zroot'));
