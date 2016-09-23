//...101~102p.
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
//...window.fetch() 이용. $ npm install --save whatwg-fetch 설치 필요.
import 'whatwg-fetch';

//...서버를 로컬에서 실행하는 경우 기본 URL은 localhost:8080 이며
//...원격서버 : http://kanbanapi.pro-react.com
//...로컬서버에는 권한부여헤더가 필요없음.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  /*
   * Change the Authorization to any string you like. It can be your pet's name,
   * your middle name, your favorite animal, your superpower of choice...
   * An unique authorization will allow you to have your own environment for cards and tasks
   ...로컬서버의 경우 권한 부여가 필요 없음.
   */
  Authorization: 'JoyWins gets confident about React.Js with this book.'
};

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
  }

  componentDidMount(){
    /*...fetch명령에 커스텀 헤더를 추가해야 서버가 올바르게 반응함.*/
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return <KanbanBoard cards={this.state.cards} />
  }
};

export default KanbanBoardContainer;
