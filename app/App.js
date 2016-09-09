//...137p.
//...먼저 $ npm install --save react-dnd@2.x.x react-dnd-html5-backend@1.x.x
//...설치가 필요함.
import React, { Component } from 'react';
import {render} from 'react-dom';
import Container from './Container';

class App extends Component {
  render(){
    return (
      <Container />
    );
  }
}

render(<App />, document.getElementById('root'));
