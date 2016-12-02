import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';


/*.XXX.
...DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
카드를 다른 리스트 위로 드래그하는 동안 리스트를 바꾸므로 endDrag() 는 구현하지 않음.
import { DragSource } from 'react-dnd';
...before/after: 164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
카드 정렬.
리액트 DnD 를 이용해 항목 정렬을 구현할 때 핵심은 한 요소를 DragSource 와 DropTarget 으로
함께 설정하는 것임.
이렇게 하면 사용자가 한 요소 위로 드래그할 때 hover 핸들러로 어떤 요소 위로 드래그하는지
감지하고 위치를 바꿀 수 있음.
Card 컴포넌트는 이미 DragSource 로 설정되 있고, 여기에다 다시 DropTarget 으로 설정해서
드롭대상으로 작동할 때 필요한 collect 함수와 spec 속성을 추가하여, 다른 카드가 위로
드래그 될 때 이를 감지하는 것은 List 컴포넌트의 cardDropSpect의 hover() 를 이용한 것과
같은 방법을 이용함.
updatePosition 콜백을 호출하여 두 카드의 위치를 서로 바꾸고, DropTarget 고차 컴포넌트를
이용해 적절하게 Card 를 DropTarget 으로 내보냄.*/
import { DragSource, DropTarget } from 'react-dnd';

import constants from './zconstants';

//...Custom propTypes 유효성 검사기.
let ztitlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 20) {
      return new Error(
        `${propName} in ${componentName} is longer than 20 characters`
      );
    }
  }
};

/*...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
카드를 다른 리스트 위로 드래그하는 동안 리스트를 바꾸므로 endDrag() 는 구현하지 않음.
*/
const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
}
let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}
//*...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.

//...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}
//...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.


/*
1. showDetails라는 키를 컴포넌트의 상태로 정의하는 생성자 함수 추가.
2. render()의 JSX를 수정해 showDetails 상태 속성이 true일 때만 카드 세부사항을 렌더링함.
3. 클릭 이벤트 핸들러를 추가해서 showDetails를 토글함.
*/
class Card extends Component {

  constructor(){
    super(...arguments);
    this.state={ showDetails: false }
  }

  /*...카드제목을 클릭함에 따라 토글되어 카드 세부내용을 보이게 함.*/
  toggleDetails(){
    this.setState({showDetails: !this.state.showDetails});
  }//...E.toggleDetails()

  render() {
/*.XXX.
...160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
const { connectDragSource } = this.props;
...before/after: 164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.*/
    const { connectDragSource, connectDropTarget } = this.props;

    let cardDetails;

    if(this.state.showDetails){
      cardDetails=(
        <div className="card__details">
{/*.XXX.{this.props.description}.
...before/after : Markup 적용 : HTML 태그가 그대로 나옴./
          {marked(this.props.description)}
/*...before1/after1 : */}
          <span dangerouslySetInnerHTML={
              {__html:marked(this.props.description)}
            }/>

          <CheckList cardId={this.props.id}
                     tasks={this.props.tasks}
                     taskCallbacks={this.props.taskCallbacks}/>
        </div>
      );//...E.cardDetails.
    }//...E.if(this.state.showDetails).

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };//...E.sideColor.

    //...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
    return connectDropTarget(
      //*...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
      connectDragSource(
        /*...Card 컴포넌트에 className 특성이 사용된 것에 주의할 것.
        JSX는 자바스크립트이므로 class 같은 XML 특성이 있는 식별자와 구분하기 위함.*/
        <div className="card">
          <div style={sideColor}/>

  {/*.XXX.
          <div className="card__title"
  ...before/after: 삼항식 조건에 따라 카드 제목에 className 을 다르게 넣음.*/}
          <div className={this.state.showDetails? "card__title card__title--is--open"
                                                : "card__title"}
  /*.XXX.
               onClick={()=>this.setState({showDetails: !this.state.showDetails})}>
  ...before/after: toggleDetails() */
               onClick={this.toggleDetails.bind(this)}>
              {this.props.title}
          </div>
          {/*...transitionEnterTimeout : ztoggle 을 클릭해서 펼때.
            transitionLeaveTimeout : ztoggle 을 클릭해서 접을때. */}
          <ReactCSSTransitionGroup transitionName="ztoggle"
                                   transitionEnterTimeout={250}
                                   transitionLeaveTimeout={950}>
                                   {cardDetails}
          </ReactCSSTransitionGroup>
        </div>
      )
      //*...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
    );
  //...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.

  }
}

Card.propTypes = {
  id: PropTypes.number,
  //title: PropTypes.string.isRequired,
  title: ztitlePropType, //...73p.Custom propTypes 유효성 검사기.
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  //...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  //...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
  //...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
  connectDropTarget: PropTypes.func.isRequired
  //...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
};


/*.XXX.
export default Card;
.XXX.before/after: 160p.DragSource 로 설정할 Card 컴포넌트 사양에는
                 beginDrag() 만 구현함
export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
...before/after: 164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.*/
const dragSourceCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropSortCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragSourceCard);
export default dragDropSortCard;
