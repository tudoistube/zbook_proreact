//...13p.
/*...S.by12p.
import React from 'react';
//import {render} from 'react-dom'; //...방법1.
import ReactDOM from 'react-dom'; //...방법2.
...E.by12p.*/

import React, {Component} from 'react';
//import {render} from 'react-dom'; //...방법1.
import ReactDOM from 'react-dom'; //...방법2.

// Parent Component
//class HiWorld extends React.Component { //...by12p.ref434p.
class HiWorld extends Component {
  render() {
    return (
        <h1>Hi, 2DoIs2Be</h1>
    );
  }
}

//render(<HiWorld />, document.getElementById('zroot')); //...방법1.
ReactDOM.render(<HiWorld />, document.getElementById('zroot')); //...방법2.
