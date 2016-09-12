//...102~103p.
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
//...window.fetch() 이용.
import 'whatwg-fetch';

//...서버를 로컬에서 실행하는 경우 기본 URL은 localhost:8080 이며
//...온라인API: http://kanbanapi.pro-react.com 권한부여헤더가 필요함.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  /*
   * Change the Authorization to any string you like. It can be your pet's name,
   * your middle name, your favorite animal, your superpower of choice...
   * An unique authorization will allow you to have your own environment for cards and tasks
   */
  Authorization: 'JoyWins'
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

  addTask(cardId, taskName){}

  deleteTask(cardId, taskId, taskIndex){}

  toggleTask(cardId, taskId, taskIndex){}

  render() { return (
    <KanbanBoard cards={this.state.cards}
      /*
      세 함수는 매개변수로 cardId, taskId, taskIndex 를 받아야 함.
      세 함수는 컴포넌트의 계층 아래쪽으로 속성을 통해 전달하고, 이때 매번 속성을 생성하는 대신 세 함수를
      참조하는 단일 객체를 생성해서 단일 속성으로 전달하면 코드 작성을 줄일 수 있음.
      */
                  taskCallbacks={{toggle: this.toggleTask.bind(this),
                                  delete: this.deleteTask.bind(this),
                                  add: this.addTask.bind(this) }} />
    )
  }
}
export default KanbanBoardContainer;
