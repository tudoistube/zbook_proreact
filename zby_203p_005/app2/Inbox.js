/*...003.added.*/              
import React, { Component } from 'react';

class Inbox extends Component {
  render() {
    return (
      <div>
        <h2>INBOX</h2>
        {/* Render the child route component */}
        {this.props.children}
      </div>
    );
  }
}

export default Inbox;
