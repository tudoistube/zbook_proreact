//...186~187p.
import React, { Component } from 'react';
//%%%import { Link } from 'react-router';
/*
...186p.매개변수를 이용하는 라우트.
깃헙 API 를 이용해 데이터를 가져오게 함.
리포지터리에 대한 로컬 상태를 만들고 이전 예제와 마찬가지로 componentDidMount
수명주기 메서드에서 API 를 가져옴.
npm 을 이용해 whatwg-fetch 폴리필을 설치함.
*/
import 'whatwg-fetch';

class Repos extends Component {
  //...S.186p.깃헙 API 에서 데이터를 가져옴.
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
  //...E.186p.깃헙 API 에서 데이터를 가져옴.

  render() {
    let repos = this.state.repositories.map((repo) => (
      <li key={repo.id}>
        {/*%%%<Link to={"/repo/"+repo.name}>{repo.name}</Link>%%%*/}
        {repo.name}
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
      </div>
    );
  }
}

export default Repos;
