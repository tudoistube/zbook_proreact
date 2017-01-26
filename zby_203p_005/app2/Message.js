/*...003.created.
https://github.com/ReactTraining/react-router/blob/latest/docs/Introduction.md
*/
import React, { Component } from 'react';
import 'babel-polyfill';

class Message extends Component {

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    const id = this.props.params.id;
  }


  render() {
    var chapter = "Messages:-)";
    return ( <div>
              <h2>{chapter}</h2>
              <h2>id : {this.props.params.id}</h2>
            </div> );
  }
}

export default Message;
