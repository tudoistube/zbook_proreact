//...188p.
/*
...리액트 라우터는 repo_name 매개변수를 컴포넌트의 속성에 주입함.
이 값을 이용해 깃허브 API 에서 프로젝트의 세부사항에 관한 데이터를 가져옴.
...컴포넌트가 마운팅된 후(componentDidMount) 데이터를 가져왔지만,
RepoDetails 컴파운드가 마운팅된 후에는 componentDidMount 는 다시 호출되지
않으므로, 사용자가 다른 리포지터리를 클릭하면 새로운 매개변수를 받을 수 있도록
componentWillReceiveProps 를 호출함.
*/
import React, { Component } from 'react';
import 'babel-polyfill';

class RepoDetails extends Component {

  constructor(){
    super(...arguments);
    this.state={ repository: {} }
  }

  fetchData(repo_name){
    fetch('https://api.github.com/repos/pro-react/'+repo_name)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({repositories:responseData});
    });
  }//...E.fetchData(repo_name)

  componentDidMount(){
    //...라우터가 매개변수 속성에 키 'repo_name' 을 주입함.
    let repo_name = this.props.params.repo_name;
    this.fetchData(repo_name)
  }//...E.componentDidMount()

  componentWillReceiveProps(nextProps){
    //...라우터가 매개변수 속성에 키 'repo_name' 을 주입함.
    let repo_name = this.props.params.repo_name;
    this.fetchData(repo_name)
  }//...E.componentWillReceiveProps(nextProps)


  render() {
    let stars = [];
    for (var i = 0; i < repository.stargazers_count; i++) {
      stars.push('★');
    }

    return(
      <div>
        <h2>{this.state.repository.name}</h2>
        <p>{this.state.repository.description}</p>
        <span>{stars}</span>
      </div>
    );
  }
}

export default RepoDetails;
