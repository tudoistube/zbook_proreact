/*...S.by12p.
import React from 'react';
import {render} from 'react-dom';
...E.by12p.*/

//...by13p.
import React, {Component} from 'react';
import {render} from 'react-dom';

// Parent Component
//class HiWorld extends React.Component { //...by12p.ref434p.
class HiWorld extends Component {
  render() {
    return (
        <h1>Hi, 2DoIs2Be</h1>
    );
  }
}

render(<HiWorld />, document.getElementById('zroot'));
