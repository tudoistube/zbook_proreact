//...187p.
import React, { Component } from 'react';
/*
...특정 리포지토리의 세부사항을 표시할 수 있는 새로운 라우트를 만들고,
URL 을 /repos/details/repo_name 과 같이 만듦.
*/
import 'whatwg-fetch';
/*
...특정 리포지토리의 세부사항을 표시할 수 있는 새로운 라우트를 만들고,
URL 을 /repos/details/repo_name 과 같이 만듦.
*/
import { Link } from 'react-router';

class Repos extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      repositories: []
    };
  }

  componentDidMount(){
    fetch('https://api.github.com/users/pro-react/repos')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({repositories:responseData});
    });
  }//...E.componentDidMount()

  render() {
    let repos = this.state.repositories.map((repo) => (
      <Link to={"/repo/"+repo.name}>{repo.name}</Link>
    ));


    return (
      <div>
        <h1>Github Repos</h1>
        <ul>
          {repos}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default Repos;
