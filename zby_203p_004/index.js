import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './app/App'
import About from './app/About'
import Repos from './app/Repos'
import Repos2 from './app/Repos2'
import Repo from './app/Repo'
import RepoDetails from './app/RepoDetails'
import Home from './app/Home'
import ServerError from './app/ServerError';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>{/*...added since 06.*/}
      </Route>
      <Route path="/repos2" component={Repos2}>
        <Route path="/repos2/:repo_name" component={RepoDetails}/>{/*...added since 06.*/}
      </Route>
      <Route path="/error" component={ServerError} />
    </Route>
  </Router>
), document.getElementById('root'))
