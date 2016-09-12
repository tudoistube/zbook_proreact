//...155~p.
/*
...155p.카드 드래그.
카드를 정렬 가능하게 만들어 여러 리스트 사이로 드래그하게 하고, 카드 위치를 다른 카드
위치로 바꿀 수 있게 함.
리액트 DND2 와 HTML5 백엔드를 설치함.
$ npm install --save react-dnd@2.x.x react-dnd-html5-backend@1.x.x

카드 상태(카드가 속한 리스트)를 업데이트하는 메서드와 카드 위치를 업데이트하는 메서드를 추가함.
이전에 작성한 태스크 조작 메서드 및 콜백과 마찬가지로 카드 ID 를 받고, 카드 인덱스를 찾은 다음,
불변성 도우미를 이용해 상태 정보를 업데이트한 후 마지막으로 상태를 설정함.
(아직 서버에 결과를 저장하지는 않음).
*/
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill'; //...바벨 폴리필.

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  /*
   * Change the Authorization to any string you like. It can be your pet's name,
   * your middle name, your favorite animal, your superpower of choice...
   * An unique authorization will allow you to have your own environment for cards and tasks
   */
  Authorization: 'CHANGE THIS VALUE'
};

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
  }
  componentDidMount(){
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});

      window.state = this.state;
    });

  }


  addTask(cardId, taskName){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Create a new task with the given name and a temporary ID
    let newTask = {id:Date.now(), name:taskName, done:false};
    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask] }
      }
    });

    // set the component state to the mutated object
    this.setState({cards:nextState});

    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok){
        return response.json()
      } else {
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .then((responseData) => {
      // When the server returns the definitive ID
      // used for the new Task on the server, update it on React
      newTask.id=responseData.id
      this.setState({cards:nextState});
    })
    .catch((error) => {
      this.setState(prevState);
    });
  }

  deleteTask(cardId, taskId, taskIndex){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex,1]] }
      }
    });

    // set the component state to the mutated object
    this.setState({cards:nextState});

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error)
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    // Save a reference to the task's 'done' value
    let newDoneValue;

    // Using the $apply command, we will change the done value to its opposite
    let nextState = update(
      this.state.cards, {
        [cardIndex]: {
          tasks: {
            [taskIndex]: {
              done: { $apply: (done) => {
                newDoneValue = !done
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    // set the component state to the mutated object
    this.setState({cards:nextState});

    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error)
      this.setState(prevState);
    });
  }

//...S.156p.카드 드래그 관련 메서드 추가.
  updateCardStatus(cardId, listId) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Get the current card
    let card = this.state.cards[cardIndex]

    // Only proceed if hovering over a different list
    if(card.status !== listId){
      // set the component state to the mutated object
      this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
      }));
    }
  }

  updateCardPosition(cardId , afterId){
    // Only proceed if hovering over a different card
    if(cardId !== afterId) {
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
      // Get the current card
      let card = this.state.cards[cardIndex]
      // Find the index of the card the user is hovering over
      let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);

      // Use splice to remove the card and reinsert it a the new index
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }
//...E.156p.카드 드래그 관련 메서드 추가.


  render() { return (
    <KanbanBoard cards={this.state.cards}
                 taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this) }}
/*...S.156p.카드 드래그 관련 메서드 추가.
새로운 cardCallbacks 함수는 리스트 컴포넌트(카드를 다른 리스트 위로 드래그 할 때)와
카드 자체(나중에 정렬 기능을 만들 때)에서 모두 호출되므로 이 속성을 받고 전달함.
*/
                cardCallbacks={{
                     updateStatus: this.updateCardStatus.bind(this),
                     updatePosition: this.updateCardPosition.bind(this)}}
/*...E.156p.카드 드래그 관련 메서드 추가.*/
                    />
    )
  }
}
export default KanbanBoardContainer;
