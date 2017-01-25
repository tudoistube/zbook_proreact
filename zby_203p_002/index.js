import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './app/App'
import About from './app/About'
import Repos from './app/Repos'
import Repo from './app/Repo'
import Home from './app/Home'
import ServerError from './app/ServerError';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:repoName" component={Repo}/>{/*...added since 06.*/}
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
