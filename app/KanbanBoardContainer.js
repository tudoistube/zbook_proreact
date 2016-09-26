//...109~112p.
import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
//...window.fetch() 이용. $ npm install --save whatwg-fetch 설치 필요.
import 'whatwg-fetch';
/*...크롬과 파이어폭스만 새로운 array.prototype.find() 와 array.prototype.findIndex()
메서드를 지원할 수 있어서 의존성을 추가한 후 바벨 폴리필을 임포트해야 함.*/
import 'babel-polyfill'

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
   */
  Authorization: 'This book helps me to get confident with React.Js'
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

  /*...addTask() 메서드 구현하기.
  	모든 태스크에 ID 가 필요하므로 서버에 저장하기 전까지 임시 ID 를 생성해야 하며,
    나중에 서버가 반환한	확정 ID 로 태스크 ID 를 업데이트해야 함.
  	임시 ID 는 밀리초 단위의 현재 시간과 같이 간단한 값을 이용할 수 있음.
  */
  addTask(cardId, taskName){
    {/* Find the index of the card
    ...카드의 인덱스를 찾음.*/}
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    // Create a new task with the given name and a temporary ID
    //...지정된 이름과 임시 ID 로 새로운 태스크를 생성함.
    let newTask = {id:Date.now(), name:taskName, done:false};

    // Create a new object and push the new task to the array of tasks
    //...새로운 객체를 생성하고 태스크의 배열로 새로운 태스크를 푸시함.
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask] }
      }
    });

    // set the component state to the mutated object
    //...변경된 객체로 컴포넌트 상태를 설정함.
    this.setState({cards:nextState});

    // Call the API to add the task on the server
    //...API 를 호출해 서버에 해당 태스크를 추가함.
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((responseData) => {
      // When the server returns the definitive ID
      // used for the new Task on the server, update it on React
      //...서버가 새로운 태스크를 추가하는데 이용한 확정 ID 를 반환하면
      //...리액트에서 ID 를 업데이트함.
      newTask.id=responseData.id
      this.setState({cards:nextState});
    });
  }//...E.addTask(cardId, taskName)

  /*...deleteTask() 메서드 구현하기.
  	1. 카드의 ID를 이용해 원하는 카드의 INDEX 를 찾아야 함.
  	2. 불변성 도우미를 이용해 삭제할 태스크를 제외한 새로운 객체를 생성함.
  	3. 새로 생성된 객체로 setState() 를 호출한 다음 fetch 를 이용해 변경에 대해
    서버에 알림.
  */
  deleteTask(cardId, taskId, taskIndex){
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
        });
  }//...E.deleteTask(cardId, taskId, taskIndex)

  /*...toggleTask() 메서드 구현하기.
  	배열을 이어붙이는 대신 객체 계층에서 태스크의 done 속성까지 접근한 후
    함수를 이용해 직접 값을 조작함.
  */
  toggleTask(cardId, taskId, taskIndex){
    // Find the index of the card
    //...카드의 인덱스를 찾음.
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Save a reference to the task's 'done' value
    //...태스크의 'done' 값에 대한 참조를 저장함.
    let newDoneValue;
    // Using the $apply command, we will change the done value to its opposite
    //...$apply 명령을 이용해 'done' 값을 현재와 반대로 변경함.
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
    //...변경된 객체로 컴포넌트 상태를 설정함.
    this.setState({cards:nextState});

    // Call the API to toggle the task on the server
    //...API 를 호출해 서버에서 해당 태스크를 토글함.
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    });
  }//...E.toggleTask(cardId, taskId, taskIndex)

  render() {
    return <KanbanBoard cards={this.state.cards}
      /*...세함수를 참조하는 단일 객체
        세 함수는 매개변수로 cardId, taskId, taskIndex 를 받아야 함.
        세 함수는 컴포넌트의 계층 아래쪽으로 속성을 통해 전달하고,
        이때 매번 속성을 생성하는 대신 세 함수를 참조하는 단일 객체를 생성해서
        단일 속성으로 전달하면 코드 작성을 줄일 수 있음.
      */
                        taskCallbacks={{
                            toggle: this.toggleTask.bind(this),
                            delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this)
                          }} />
  }
};

export default KanbanBoardContainer;
