//...187~194p.
import React, { Component } from 'react';
/*
특정 Repository 의 세부 사항을 표시하는 새로운 라우트를 '/repos/details/repo_name' 형태의 URL 로
만듦.
Repos 컴포넌트에서 Repository 리스트에 대한 링크를 추가하고 RepoDetails 를 중첩된 자식으로서 로드함.
라우트를 업데이트하고 RepoDetails 컴포넌트를 생성함.
*/
import { Link } from 'react-router';
import 'whatwg-fetch';

class Repos extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      repositories: []
    };
  }

  componentDidMount(){
    fetch('https://api.github.com/users/pro-react/repos')
    /*%%%
    .then((response) => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })%%%*/
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({repositories:responseData});
    });
    /*%%%
    .catch((error) => {
      this.props.history.pushState(null,'/error');
    });%%%*/
  }

  render() {
    let repos = this.state.repositories.map((repo) => (
      <li key={repo.id}>
        <Link to={"/repos/details/"+repo.name}>{repo.name}</Link>
      </li>
    ));

    /*%%%
    let child = this.props.children && React.cloneElement(this.props.children,
      { repositories: this.state.repositories }
    );%%%*/

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
