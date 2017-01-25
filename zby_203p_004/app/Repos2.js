//...187p.
import React, { Component } from 'react';
import NavLink from './NavLink' //...added since 07.

//...Ch12.Navigating Programatically.
//...Way1.First we can use the browserHistory singleton that we passed into Router in index.js
//        and push a new URL into the history.
//        There's a potential problem with this though.
//        If you pass a different history to Router than you use here, it won't work.
//        It's not very common to use anything other than browserHistory, so this is acceptable practice.
//...Way2.If you're concerned about it, you can make a module that exports the history you want to use across the app, or...
//        You can also use the router that Router provides on "context".
//        First, you ask for context in the component, and then you can use it:
//        This way you'll be sure to be pushing to whatever history gets passed to Router.
//        It also makes testing a bit easier since you can more easily stub context than singletons.

import { browserHistory } from 'react-router'; //...added since 12.Way1.

class Repos2 extends Component {

  constructor(){
    super(...arguments);
    this.state = {
      repositories: []
    };
  }

    componentDidMount(){
      fetch('https://api.github.com/users/pro-react/repos')
      .then((response) => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData) => {
        this.setState({repositories:responseData});
      })
      .catch((error) => {
        /*...200p.fetch 의 catch 문 안에서 pushState() 메서드를 이용함.
        198p.history객체의 탐색메서드 참조.
        pushState(속성, 경로), replaceState(), goBack(), goForward(), Go(),
        createHref()
        */
        this.props.history.pushState(null,'/error');
      });
    }

  /*...Ch12.Way2.ask for `router` from context
  https://medium.com/react-ecosystem/how-to-handle-react-context-a7592dfdcbc#.a1vas3jng
  http://reactkungfu.com/2016/01/react-context-feature-in-practice/
  //---------------------------------------------------------------
  contextTypes: {
    router: React.PropTypes.object
  }*/

  //...Ch12 : Let's make a little form in Repos that programmatically navigates.
  //...added since Ch12.
  zhandleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path);

    browserHistory.push(path); //...Way1.
    //this.context.router.push(path) //...Way2.
  }

  render() {
    var chapter = "REPOS2";

    let repos = this.state.repositories.map((repo) => (
      <li key={repo.id}>
        <NavLink to={"/repos2/"+repo.name}>{repo.name}</NavLink>
      </li>
    ));

    let child = this.props.children
                &&
                React.cloneElement(this.props.children,
                  { repositories: this.state.repositories }
                );

    return (
      <div>
        <h1>Github Repos</h1>
        <ul>
          {repos}
        </ul>
        {child}
      </div>
    );
  }
}

export default Repos2;
