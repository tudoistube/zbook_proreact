//...184p.import React, { Component } from 'react';import { render } from 'react-dom';/*...리액트 라우터의 3가지 컴포넌트를 임포트함.Router, Route : 라우터를 선언적으로 애플리케이션의 화면 계층과 매핑하는 데 이용함.Link : 올바른 href 로 완전 접근이 가능한 앵커 태그를 만드는 데 이용함.일반적으로 최종 사용자가 상호작용하는 주 형식임.IndexRoute : 184p.root URL(/)을 라우트에서 표시함.*/import { Router, Route, IndexRoute, Link } from 'react-router';//%%%import createBrowserHistory from 'history/lib/createBrowserHistory'import About from './About';import Repos from './Repos';//%%%import RepoDetails from './RepoDetails';import Home from './Home';//%%%import ServerError from './ServerError';class App extends Component {  render() {    return (      <div>        <header>App</header>        <menu>          <ul>            <li><Link to="/about">About</Link></li>            <li><Link to="/repos">Repos</Link></li>          </ul>        </menu>        {this.props.children}      </div>    );  }}render((  <Router>    <Route path="/" component={App}>      {/*...184p.root URL(/)을 라우트에서 표시함*/}      <IndexRoute component={Home}/>      <Route path="about" component={About} />      <Route path="repos" component={Repos} />      {/*%%%        <Route path="/repo/:repo_name" component={RepoDetails} />      </Route>      <Route path="error" component={ServerError} /> %%%*/}    </Route>  </Router>), document.getElementById('root'));