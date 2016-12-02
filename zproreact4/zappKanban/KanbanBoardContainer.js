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
const API_URL_REMOTE = 'http://kanbanapi.pro-react.com';
const API_URL_LOCAL = './cards.json';
const API_HEADERS_REMOTE = {
  'Content-Type': 'application/json',
  Authorization: 'This book helps me to get confident with React.Js'
};
const API_HEADERS_LOCAL = {};
const CONNECT_REMOTE = true;
var API_URL;
var API_HEADERS;


class KanbanBoardContainer extends Component {

  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
  }

  componentDidMount(){
    if(CONNECT_REMOTE)
    {
      API_URL = API_URL_REMOTE + '/cards';
      API_HEADERS = API_HEADERS_REMOTE;
    }else{
      API_URL = API_URL_LOCAL;
      API_HEADERS = API_HEADERS_LOCAL;
    }

    /*...fetch명령에 커스텀 헤더를 추가해야 서버가 올바르게 반응함.*/
    fetch(API_URL, {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});
//...낙관적인 UI 변경.
      window.state = this.state;
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
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    //...낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경전 원래 상태에 대한
    //...참조를 저장함.
    let prevState = this.state;

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

    if(CONNECT_REMOTE)
    {
      API_URL = (API_URL_REMOTE + '/cards/'+cardId+'/tasks');
      API_HEADERS = API_HEADERS_REMOTE;
    }else{
      API_URL = API_URL_LOCAL;
      API_HEADERS = API_HEADERS_LOCAL;
    }

    // Call the API to add the task on the server
    //...API 를 호출해 서버에 해당 태스크를 추가함.
    //fetch(`${API_URL}/cards/${cardId}/tasks`, {
    fetch(API_URL, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
/*.XXX.
    .then((response) => response.json())
...before/after : 낙관적 UI 롤백.*/
    .then((response) => {
      if(response.ok){ return response.json()}
      else{ throw new Error("addTask response is Error!")}
    })
    .then((responseData) => {
      // When the server returns the definitive ID
      // used for the new Task on the server, update it on React
      //...서버가 새로운 태스크를 추가하는데 이용한 확정 ID 를 반환하면
      //...리액트에서 ID 를 업데이트함.
      newTask.id=responseData.id
      this.setState({cards:nextState});
    })
    .catch((error) => {
          console.error("addTask error : ", error);
          this.setState(prevState);
    });
  }//...E.addTask(cardId, taskName)

  /*...deleteTask() 메서드 구현하기.
  	1. 카드의 ID를 이용해 원하는 카드의 INDEX 를 찾아야 함.
  	2. 불변성 도우미를 이용해 삭제할 태스크를 제외한 새로운 객체를 생성함.
  	3. 새로 생성된 객체로 setState() 를 호출한 다음 fetch 를 이용해 변경에 대해
    서버에 알림.
  */
  deleteTask(cardId, taskId, taskIndex){
    //...낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경전 원래 상태에 대한
    //...참조를 저장함.
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

    // Create a new object without the task
    let nextState = update(this.state.cards,
                          {
                            [cardIndex]: { tasks: {$splice: [[taskIndex,1]] } }
                          });

    // set the component state to the mutated object
    this.setState({cards:nextState});

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if(!response.ok){ throw new Error("addTask response is Error!")}
    })
    .catch((error) => {
          console.error("deleteTask error : ", error);
          this.setState(prevState);
    });
  }//...E.deleteTask(cardId, taskId, taskIndex)

  /*...toggleTask() 메서드 구현하기.
  	배열을 이어붙이는 대신 객체 계층에서 태스크의 done 속성까지 접근한 후
    함수를 이용해 직접 값을 조작함.
  */
  toggleTask(cardId, taskId, taskIndex){
    //...낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경전 원래 상태에 대한
    //...참조를 저장함.
    let prevState = this.state;

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

    if(CONNECT_REMOTE)
    {
      API_URL = (API_URL_REMOTE + '/cards/'+cardId+'/tasks/'+taskId);
      API_HEADERS = API_HEADERS_REMOTE;
    }else{
      API_URL = API_URL_LOCAL;
      API_HEADERS = API_HEADERS_LOCAL;
    }


    // Call the API to toggle the task on the server
    //...API 를 호출해 서버에서 해당 태스크를 토글함.
    //fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
    fetch(API_URL, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    })
    .then((response) => {
      if(!response.ok){ throw new Error("toggleTask response is Error!")}
    })
    .catch((error) => {
          console.error("toggleTask error : ", error);
          this.setState(prevState);
    });

  }//...E.toggleTask(cardId, taskId, taskIndex)

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



  render() {
    return <KanbanBoard cards={this.state.cards}
      /*...세함수를 참조하는 단일 객체
        세 함수는 매개변수로 cardId, taskId, taskIndex 를 받아야 함.
        세 함수는 컴포넌트의 계층 아래쪽으로 속성을 통해 전달하고,
        이때 매번 속성을 생성하는 대신 세 함수를 참조하는 단일 객체를 생성해서
        단일 속성으로 전달하면 코드 작성을 줄일 수 있음.
      */
                    taskCallbacks={{
                        toggleTask : this.toggleTask.bind(this),
                        deleteTask : this.deleteTask.bind(this),
                        addTask : this.addTask.bind(this)
                      }}
      /*...S.156p.카드 드래그 관련 메서드 추가.
      새로운 cardCallbacks 함수는 리스트 컴포넌트(카드를 다른 리스트 위로 드래그 할 때)와
      카드 자체(나중에 정렬 기능을 만들 때)에서 모두 호출되므로 이 속성을 받고 전달함.
      */
                    cardCallbacks={{
                         updateStatus: this.updateCardStatus.bind(this),
                         updatePosition: this.updateCardPosition.bind(this)}} />
  }
};

export default KanbanBoardContainer;
