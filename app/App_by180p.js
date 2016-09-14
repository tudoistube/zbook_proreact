//...175p.
import React, { Component } from 'react';
import { render } from 'react-dom';

//%%%import { Router, Route, IndexRoute, Link } from 'react-router';
//%%%import createBrowserHistory from 'history/lib/createBrowserHistory'

import About from './About';
import Repos from './Repos';
//%%%import RepoDetails from './RepoDetails';
import Home from './Home';
//%%%import ServerError from './ServerError';


class App extends Component {
  constructor(){
    super(...arguments);
    /*...176p.컴포넌트 생성자에서 URL 의 현재 해시 위치를 얻고 이를 route 상태에
    할당함.*/
    this.state = {
      route: window.location.hash.substr(1)
    };//...E.this.state
  }//...E.constructor()

  componentDidMount(){
      /*
      ...176p. 컴포넌트가 마운트 될 때 이벤트 리스너를 추가해 URL이 바뀔 때마다
      route 상태를 업데이트하고 컴포넌트를 다시 렌더링함.
      */
      window.addEventListener(
        'hashchange',
        ()=>{
          this.setState({
            route: window.location.hash.substr(1)
          });
        }
      );//...E.window.addEventListener(
    }//...E.componentDidMount()

  render() {
    var Child;
    //...176p.root 를 기준으로 해당 컴포넌트를 렌더링함.
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/repos': Child = Repos; break;
      default : Child = Home;
    }//...E.switch (this.state.route)

    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            {/*%%%<li><Link to="/about">About</Link></li>
            <li><Link to="/repos">Repos</Link></li>%%%*/}
            <li><a href="./about">About</a></li>
            <li><a href="./repos">Repos</a></li>
          </ul>
        </menu>
        {/*%%%{this.props.children}%%%*/}
      </div>
    );
  }
}

/*%%%
render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="repos" component={Repos}>
        <Route path="/repo/:repo_name" component={RepoDetails} />
      </Route>
      <Route path="error" component={ServerError} />
    </Route>
  </Router>
), document.getElementById('root')); %%%*/
render(<App />, document.getElementById('root'));
