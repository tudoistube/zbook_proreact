//...169~p.
/*
...169p.새로운 카드 위치와 상태 저장.
업데이트된 카드 상태를 KanbanBoardContainer 컴포넌트의 updateCardStatus 와
updateCardPosition 메서드에 저장하면 카드를 드래그하는 동안 지속적으로 서버를 호출하고,
성능에도 좋지 않지만 서버 오류가 발생하면 인터페이스에서 롤백하기도 어려운 문제가 있음.

가장 좋은 방법은 사용자가 드래그를 시작할 때 원래 카드 ID 와 상태를 등록한 다음,
사용자가 드래그를 끝내면 서버를 호출하는 것임.
작업이 실패하면 원래 카드 상태로 되돌리 수 있음.

persistCardDrag() 메서드를 추가함.
이 메서드에서 fetch() 를 이용해 카드의 새로운 상태와 위치로 Kanban API 를 호출하며
이 작업이 실패하면 원래 카드 상태로 되돌림.
Card 컴포넌트에서 호출할 수 있도록 cardCallbacks 객체 안에서 persistCardDrag()
메서드를 이용할 수 있게 함.
*/
import React, { Component } from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill'; //...바벨 폴리필.

import KanbanBoard from './KanbanBoard';
import {throttle} from './zutils';


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
    //...S....167p. 콜백에 스로틀 적용.
    //...인수가 변경된 경우에만 updateCardStatus 를 호출함.
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    //...최대 500ms 마다 (또는 인수가 변경된 경우) updateCardPosition 을 호출함.
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
    //...E....167p. 콜백에 스로틀 적용.
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

//...S.169p.새로운 카드 위치와 상태 저장.
persistCardDrag (cardId, status) {
  // Find the index of the card
  let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
  // Get the current card
  let card = this.state.cards[cardIndex]

  fetch(`${API_URL}/cards/${cardId}`, {
    method: 'put',
    headers: API_HEADERS,
    body: JSON.stringify({status: card.status, row_order_position: cardIndex})
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
    console.error("Fetch error:",error);
    this.setState(
      update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: status }
          }
        }
      })
    );
  });
}
//...E.169p.새로운 카드 위치와 상태 저장.

  render() { return (
    <KanbanBoard cards={this.state.cards}
                 taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this) }}

                cardCallbacks={{
                     /*...S.167p. 콜백에 스로틀 적용.*/
                     updateStatus: this.updateCardStatus.bind(this),
                     updatePosition: this.updateCardPosition.bind(this),
                     /*...E.167p. 콜백에 스로틀 적용.*/
                     //...S.169p.새로운 카드 위치와 상태 저장.
                     persistCardDrag: this.persistCardDrag.bind(this)
                     //...E.169p.새로운 카드 위치와 상태 저장.
                   }}/>
    )
  }
}
export default KanbanBoardContainer;
