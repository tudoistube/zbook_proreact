//...202p.import React, { Component } from 'react';import { render } from 'react-dom';import { Router, Route, IndexRoute, Link } from 'react-router';/*...202p.브라우저 히스토리 설정을 이용하도록 함.리액트 라우터는 history 라이브러리에 기반을 두고, URL 과 세션 관리를 추상화함.리액트 라우터는 URL 의 해시(#) 부분을 기준으로 라우트를 생성함(예. example.com/#/path).해시 히스토리가 기본 설정인 이유는 기존 IE8, IE9 와 같은 브라우저에서도 작동하며추가 서버 구성이 필요 없기 때문임.애플리케이션을 이전 브라우저에서 실행할 필요가 없고 서버를 필요에 맞게 구성할 수 있는경우, 실제 URL(예. example.com/path) 을 생성하는 브라우저 히스토리 설정을 사용하는 것이 좋음.브라우저 히스토리 설정을 이용하면 페이지를 다시 로드할 필요가 없는 실제 URL 과 비슷하게보이는 URL 을 생성할 수 있음.그런데 사용자가 다중 중첩 URL 을 새로 고치거나 북마크로 등록하면, 이러한 URL 은브라우저에서 동적으로 생성되므로 서버 상의 실제 경로와 연결되지 않음.URL 을 처음 요청할 때는 항상 서버에서 처리해야 하므로 "페이지 찾을 수 없음" 오류가 반환될가능성이 높음.브라우저 히스토리 설정이 제대로 작동하게 하려면 사용자가 브라우저에서 /some-path 와 같은URL 로 이동할 때 서버가 인덱스 페이지를 제공해 리액트 라우터가 올바른 뷰를 렌더링할 수있도록 서버에서 rewrite 구성을 만들어야 함.웹팩 개발 서버에는 알 수 없는 경로에 대해 항상 인덱스 페이지를 렌더링하는 historyApiFallback옵션이 있음.아파치와 Nginx 를 비롯해 일반적인 웹 서버와 node.js 에도 이러한 구성이 있음.브라우저 히스토리 설정을 구현하려면 히스토리 라이브러리에서 createBrowserHistory()메서드를 임포트하고, 생성된 브라우저 히스토리 구성을 라우터 컴포넌트의 히스토리속성을 통해 전달하면서 이 메서드를 호출함.*/import createBrowserHistory from 'history/lib/createBrowserHistory'import About from './About';import Repos from './Repos';import RepoDetails from './RepoDetails';import Home from './Home';import ServerError from './ServerError';class App extends Component {  render() {    return (      <div>        <header>App</header>        <menu>          <ul>            <li><Link to="/about" activeClassName="active">About</Link></li>            <li><Link to="/repos" activeClassName="active">Repos</Link></li>          </ul>        </menu>        {/*리액트 라우터는 자동으로 자식 속성을 현재 라우트를 기준으로 적절한 컴포넌트로 설정함.}        183p. 명명된 컴포넌트의 설명으로 this.props.children 은 라우트가 부모 컴포넌트를 통해 사용함.        Route 컴포넌트에 components 속성값은 this.props.children.components_속성값 으로        여러 개 표현할 수 있음.*/        /*...193p.속성이 동적인 경우 React Route가 속성으로 주입하는 child 컴포넌트를 복제해서 추가 속성을 전달할 수 있음.        Repo 컴포넌트에서 가져온 데이터를 RepoDetails 컴포넌트를 생성하고 전달하는 처리를 하지 않아도        React Route 가 자동으로 RepoDetails 컴포넌트를 생성하고 이를 Repo 컴포넌트의 props.children 으로 주입함.        이렇게 자동으로 하위 컴포넌트를 생성하고 속성을 전달하므로 중간에 속성을 조작할 수 있는 기회가 없음.        */}        {this.props.children}      </div>    );  }}render((  <Router history={createBrowserHistory()}>    <Route path="/" component={App}>      <IndexRoute component={Home}/>      <Route path="about" component={About} title="192p.About Us..."/>      <Route path="repos" component={Repos}>        /*...196p.다소 긴 URL('/repos/details/:repo_name')을 간략한 형태의 URL        ('/repo/:repo_name') 으로 바꾸면서도 RepoDetails 컴포넌트를 App > Repos        내부에 중첩해 렌더링할 수 있는 방법으로, 리액트 라우터는 라우터 정의에        절대 경로를 이용하는 방법을 사용하여 이러한 구성을 지원함.        UI 는 중첩된 계층을 유지하지만 이와 분리된 커스텀 라우트를 이용함.        RepoDetails 컴포넌트를 import 하면 {RepoDetails} 의 위치를 인식하는 것 같음.        그래서, Route 컴포넌트의 path 속성에 부여하는 경로에는 자유롭게 지정해도 인식하는 것 같음.        ...before:        <Route path="/repo/details/:repo_name" component={RepoDetails} />        */              <Route path="/repo/:repo_name" component={RepoDetails} />      </Route>      <Route path="error" component={ServerError} />    </Route>  </Router>), document.getElementById('root'));