//...196p./*...UI 는 중첩된 계층을 유지하지만 이와 분리된 커스텀 라우트를 이용함.*/import React, { Component } from 'react';import { render } from 'react-dom';import { Router, Route, IndexRoute, Link } from 'react-router';//%%%import createBrowserHistory from 'history/lib/createBrowserHistory'import About from './About';import Repos from './Repos';import RepoDetails from './RepoDetails';import Home from './Home';//%%%import ServerError from './ServerError';class App extends Component {  render() {    return (      <div>        <header>App</header>        <menu>          <ul>            <li><Link to="/about" activeClassName="active">About</Link></li>            <li><Link to="/repos" activeClassName="active">Repos</Link></li>          </ul>        </menu>        {this.props.children}      </div>    );  }}render((  <Router>    <Route path="/" component={App}>      <IndexRoute component={Home}/>      <Route path="about" component={About} title="192p.About Us..."/>      <Route path="repos" component={Repos}>        /*...196p.다소 긴 URL('/repos/details/:repo_name')을 간략한 형태의 URL        ('/repo/:repo_name') 으로 바꾸면서도 RepoDetails 컴포넌트를 App > Repos        내부에 중첩해 렌더링할 수 있는 방법으로, 리액트 라우터는 라우터 정의에        절대 경로를 이용하는 방법을 사용하여 이러한 구성을 지원함.        UI 는 중첩된 계층을 유지하지만 이와 분리된 커스텀 라우트를 이용함.        ...before:        <Route path="/repo/details/:repo_name" component={RepoDetails} />        */        <Route path="/repo/:repo_name" component={RepoDetails} />      </Route>      {/*%%%<Route path="error" component={ServerError} /> %%%*/}    </Route>  </Router>), document.getElementById('root'));