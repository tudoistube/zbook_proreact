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


class Repos extends Component {

  render() {
    var chapter = "REPOS";

    return (
      <div>
        {/*%%%
        <h1>{this.props.route.title}</h1>
        %%%*/}
        <h1>{chapter}</h1>
        <h3>after using NavLink : </h3>
        <ul>
          <li><NavLink to="/repos/reactjs">repos_reactjs</NavLink></li>
          <li><NavLink to="/repos/facebook">repos_facebook</NavLink></li>
        </ul>
        {/* ...added since 07 :
          will render `Repo.js` when at /repos/:userName/:repoName */}
        {this.props.children}
      </div>
    );
  }
}

export default Repos;
