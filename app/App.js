//...190~p
import React, { Component } from 'react';
import { render } from 'react-dom';

//...리액트 라우터의 3가지 컴포넌트를 임포트함.
/*
Router, Route : 라우터를 선언적으로 애플리케이션의 화면 계층과 매핑하는 데 이용함.
Link : 올바른 href 로 완전 접근이 가능한 앵커 태그를 만드는 데 이용함.
         일반적으로 최종 사용자가 상호작용하는 주 형식임.
IndexRoute : 184p.root URL(/)을 라우트에서 표시함.
*/
import { Router, Route, IndexRoute, Link } from 'react-router';

import Home from './Home';
import About from './About';
import Repos from './Repos';
/*
...명명 매개변수인 repo_name 을 선언하고, details 라우트를 repos 라우트의
자식으로 구현하도록 Router 컴포넌트를 업데이트함.
*/
import RepoDetails from './RepoDetails';

class App extends Component {
  constructor(){
    super(...arguments);
    /*
    ...176p. 컴포넌트 생성자에서 URL 의 현재 해시 위치를 얻고 이를 route 상태에
    할당함.
    */
    this.state = {
      route: window.location.hash.substr(1)
    };//...E.this.state = {
  }//...E.constructor(){

  /*...S.181p.react-router 임포트 이후 주석처리함.
  react-router 가 자동으로 처리함.
  componentDidMount(){
    /*
    ...176p. 컴포넌트가 마운트 될 때 이벤트 리스너를 추가해 URL이 바뀔 때마다
    route 상태를 업데이트하고 컴포넌트를 다시 렌더링함.
    *-/
    window.addEventListener(
      'hashchange',
      ()=>{
        this.setState({
          route: window.location.hash.substr(1)
        });
      }
    );//...E.window.addEventListener(
  }//...E.componentDidMount(){
  ...E.181p.react-router 임포트 이후 주석처리함.*/

  render(){
    /*...S.181p.react-router 임포트 이후 주석처리함.
    react-router 가 자동으로 자식 속성을 현재 라우트를 기준으로 적절한 컴포넌트로
    설정함.
    var Child;
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/repos': Child = Repos; break;
      default : Child = Home;
    }//...E.switch (this.state.route) {
    ...E.181p.react-router 임포트 이후 주석처리함.*/

    return(
      <div>
        <header>App</header>
        <menu>
          <ul>
            {/*...S.181p.react-router 임포트 이후 Link 로 변경.
            ...변경전:
            <li><a href="./about">About</a></li>
            <li><a href="./repos">Repos</a></li>
            ...E.181p.react-router 임포트 이후 Link 로 변경.*/}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/repos">Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );//...E.return(

  }//...E.render()
}

/*...S.181p.react-router 임포트 이후 라우터 선언.
App 컴포넌트를 DOM 으로 렌더링하는 대신, 라우트 몇 개를 포함하는 Router 컴포넌트를
리액트 DOM render() 메서드로 전달함.
...변경전:
render(<App />, document.getElementById('root'));
...E.181p.react-router 임포트 이후 라우터 선언.*/
render(
  (
    <Router>
      <Route path="/" component={App}>
        {/*...184p.root URL(/)을 라우트에서 표시함*/}
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="repos" component={Repos} >
          {/*...UI 를 중첩하려는 위치에 라우트를 중첩해 추가함.
            라우트 안에 :repo_name 와 같은 동적 세그먼트를 선언하면
            리액트 라우터가 URL 의 해당 부분에 있는 데이터를 컴포넌트
            속성 내의 매개변수 특성으로 주입함.
          */}
          <Route path="details/:repo_name" component={RepoDetails} />
        </Route>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
