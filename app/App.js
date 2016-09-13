import React, { Component } from 'react';
import {render} from 'react-dom';

import About from './About';
import Home from './Home';
import Repos from './Repos';

class App extends Component {
  constructor(){
    super(...arguments);
    /*
    ...176p. 컴포넌트 생성자에서 URL 의 현재 해시 위치를 얻고 이를 route 상태에
    할당함.
    */
    this.state={
      rout:window.location.hash.substr(1)
    };
  }//...E.constructor(){

  componentDidMount(){
    /*
    ...176p. 컴포넌트가 마운트 될 때 이벤트 리스너를 추가해 URL이 바뀔 때마다
    route 상태를 업데이트하고 컴포넌트를 다시 렌더링함.
    */
    window.addEventListener('hashchange',
        ()=>{
          this.setState({
            route: window.location.hash.substr(1)
          });
        });
  }//...E.componentDidMount(){

  render() {
      var Child;
      switch(this.state.route){
        case '/about': Child = About; break;
        case '/repos': Child = Repos; break;
        default: Child = Home;
      }

      return (
        <div>
          <header>App</header>
          <menu>
            <ul>
              <li><Link to="/about" activeClassName="active">About</Link></li>
              <li><Link to="/repos" activeClassName="active">Repos</Link></li>
            </ul>
          </menu>
          {this.props.children}
        </div>
      );//...E.return (
    }//...E.render() {

render(<App />, document.getElementById('root'));
