//...194p.
import React, { Component } from 'react';
/*
...195p.Array.prototype.find() 는 이전 브라우저에서 지원되지 않으므로
npm install --save babel-polyfill 로 바벨의 폴리필을 설치하고
import 'babel-polyfill' 로 임포트함.
*/
import 'babel-polyfill';

class RepoDetails extends Component {

  /*XXX
  ...194p.RepoDetails 컴포넌트는 순수 컴포넌트로 취급되어 내부 상태를 갖지 않고 속성을 받고
  표시하기만 함.
  constructor, componentDidMount, componentWillReceiveProps, fetchData() 는 제거함.
  URL 매개변수를 기준으로 Repository 를 찾도록 render() 메서드를 수정함.

    constructor(){
      super(...arguments);
      this.state={
        repository:{}
      }
    }

    fetchData(repo_name){
      fetch('https://api.github.com/repos/pro-react/'+repo_name)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({repository:responseData});
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

    /*%%%renderRepository() {
      let repository = this.props.repositories.find((repo)=>repo.name === this.props.params.repo_name);
      let stars = [];
      for (var i = 0; i < repository.stargazers_count; i++) {
        stars.push('★');
      }
      return(
        <div>
          <h2>{repository.name}</h2>
          <p>{repository.description}</p>
          <span>{stars}</span>
        </div>
      );
    }%%%*-/

    render() {
      let stars = [];
      for (var i = 0; i < this.state.repository.stargazers_count; i++) {
        stars.push('★');
      }

      /*%%%if(this.props.repositories.length > 0 ){
        return this.renderRepository();
      } else {
        return <h4>Loading...</h4>;
      }%%%*-/

      return (
        <div>
          <h2>{this.state.repository.name}</h2>
          <p>{this.state.repository.description}</p>
          <span>{stars}</span>
        </div>
      );

    }
  XXX*/

  renderRepository() {
    let repository = this.props.repositories.find((repo)=>repo.name === this.props.params.repo_name);
    let stars = [];
    for (var i = 0; i < repository.stargazers_count; i++) {
      stars.push('★');
    }
    return(
      <div>
        <h2>{repository.name}</h2>
        <p>{repository.description}</p>
        <span>{stars}</span>
      </div>
    );
  }

  render() {
    if(this.props.repositories.length > 0 ){
      return this.renderRepository();
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

export default RepoDetails;
