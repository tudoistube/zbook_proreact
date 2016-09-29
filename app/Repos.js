//...194~197p.
import React, { Component } from 'react';
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

  /*
  방법2. 자식의 복제본에 속성 주입.
  속성이 동적인 경우 리액트 라우터가 속성으로 주입하는 child 컴포넌트를 복제하는 방법이 유용함.

  Repo 컴포넌트에서 가져온 Repository 데이터를 라우터가 제공한 this.props.children 을
  이용해서 그대로 렌더링하여 RepoDetails 컴포넌트로 전달하는 대신,  이를 복제하고 추가
  속성을 주입해서 Repository 데이터를 RepoDetails 컴포넌트로 전달함.

  라우터가 제공한 자식에 React.cloneElement 를 이용해 추가 속성을 전달함.
  */
  render() {
    let repos = this.state.repositories.map((repo) => (
                <li key={repo.id}>
                  <Link to={"/repo/details/"+repo.name}>
                    {repo.name}
                  </Link>
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

export default Repos;