//...192~196p./*라우트 속성 전달하기.	깃헙 API(https://api.github.com/users/pro-react/repos) 를 처음 가져올 때 Repository 에 관한 세부 사항을	모두 반환했으므로, 이때 받은 모든 데이터를 속성으로서 전달해 repoDetails 컴포넌트에서 렌더링해야함.	리액트 라우터에서 속성을 전달하는데는 라우트 구성 객체에서 속성을 지정하거나 자식의 복제본에	속성을 주입하는 두가지 방법이 있음.	첫번째 방법은 모든 문제를 해결하지는 못하고, 두번째 방법은 유연하지만 엉성함.	방법1. 라우트 구성 객체에서 속성을 지정함.		<Route> 컴포넌트는 라우트를 선언적으로 구성하는 방법으로서 일반 리액트 컴포넌트처럼		렌더링되지 않고 '활성화될 때' 지정된 컴포넌트를 대신 렌더링함.		라우트에서 정의한 모든 추가 속성을 컴포넌트에서 접근할 수 있음.		지정된 컴포넌트를 대신 렌더링하는 것 외에도 리액트 라우터가 모든 라우터 속성을		컴포넌트의 속성으로 주입함.*/import React, { Component } from 'react';import { render } from 'react-dom';import { Router, Route, IndexRoute, Link } from 'react-router';//%%%import createBrowserHistory from 'history/lib/createBrowserHistory'import About from './About';import Repos from './Repos';import RepoDetails from './RepoDetails';import Home from './Home';//%%%import ServerError from './ServerError';class App extends Component {  render() {    return (      <div>        <header>App</header>        <menu>          <ul>            <li><Link to="/about" activeClassName="active">About</Link></li>            <li><Link to="/repos" activeClassName="active">Repos</Link></li>          </ul>        </menu>        {/*리액트 라우터는 자동으로 자식 속성을 현재 라우트를 기준으로 적절한 컴포넌트로 설정함.}        183p. 명명된 컴포넌트의 설명으로 this.props.children 은 라우트가 부모 컴포넌트를 통해 사용함.        Route 컴포넌트에 components 속성값은 this.props.children.components_속성값 으로        여러 개 표현할 수 있음.*/        /*...193p.속성이 동적인 경우 React Route가 속성으로 주입하는 child 컴포넌트를 복제해서 추가 속성을 전달할 수 있음.        Repo 컴포넌트에서 가져온 데이터를 RepoDetails 컴포넌트를 생성하고 전달하는 처리를 하지 않아도        React Route 가 자동으로 RepoDetails 컴포넌트를 생성하고 이를 Repo 컴포넌트의 props.children 으로 주입함.        이렇게 자동으로 하위 컴포넌트를 생성하고 속성을 전달하므로 중간에 속성을 조작할 수 있는 기회가 없음.        */}        {this.props.children}      </div>    );  }}render((  <Router>    <Route path="/" component={App}>      <IndexRoute component={Home}/>      /*...192p. About 컴포넌트가 라우터에서 속성을 통해 제목을 받도록      about 라우트에 임의의 "title" 속성을 추가함. */      <Route path="about" component={About} title="192p.About Us..."/>      <Route path="repos" component={Repos}>        <Route path="/repo/details/:repo_name" component={RepoDetails} />      </Route>      {/*%%%<Route path="error" component={ServerError} /> %%%*/}    </Route>  </Router>), document.getElementById('root'));