import React from 'react';import { Link } from 'react-router'import { IndexLink } from 'react-router'import NavLink from './NavLink'import Home from './Home';export default React.createClass({  render() {    var chapter = "App :: 203p_002...";    return (<div>              <header>App</header>              <h1>It's nice 2DoIs2Be with {chapter}</h1>              <menu>                <ul role="nav">                  <li><NavLink to="/about">About---</NavLink></li>                  <li><NavLink to="/repos">Repos---</NavLink></li>                  <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>                </ul>              </menu>                {/*★One option is to see if we have any children in App,                  and if not, render Home.*/}                {this.props.children || <Home/>}            </div>);  }})