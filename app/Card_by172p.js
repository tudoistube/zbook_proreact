//...164~172p.
/*
...152p. 카드 토글 애니메이션.
먼저 ReactCSSTransitionGroup 를 설치가 필요함.
$ npm install --save react-addons-css-transition-group
ReactCSSTransitionGroup 를 임포트하고, cardDetails 를 래퍼로 감쌈.
스타일 시트에는 max-height 속성을 변경하는 CSS 트랜지션을 추가함.
*/
/*
...164p. 카드 정렬.
리액트 DnD 를 이용해 항목 정렬을 구현할 때 핵심은 한 요소를 DragSource 와 DropTarget 으로
함께 설정하는 것임.
이렇게 하면 사용자가 한 요소 위로 드래그할 때 hover 핸들러로 어떤 요소 위로 드래그하는지
감지하고 위치를 바꿀 수 있음.

Card 컴포넌트는 이미 DragSource 로 설정되 있고, 여기에다 다시 DropTarget 으로 설정해서
드롭대상으로 작동할 때 필요한 collect 함수와 spec 속성을 추가하여, 다른 카드가 위로
드래그 될 때 이를 감지하는 것은 List 컴포넌트의 cardDropSpect의 hover() 를 이용한 것과
같은 방법을 이용함.

updatePosition 콜백을 호출하여 두 카드의 위치를 서로 바꾸고, DropTarget 고차 컴포넌트를
이용해 적절하게 Card 를 DropTarget 으로 내보냄.
*/
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';
//...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
import { DragSource, DropTarget } from 'react-dnd';
//...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
import constants from './zconstants';

let ztitlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 30) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
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

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    //...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
    const { connectDragSource, connectDropTarget } = this.props;
    //...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.

    let cardDetails;

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
            {/*...taskCallbacks 속성을 전달받음. */}
            <CheckList cardId={this.props.id}
                       tasks={this.props.tasks}
                       taskCallbacks={this.props.taskCallbacks} />
        </div>
      );
    }

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    //...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
    return connectDropTarget(connectDragSource(
      <div className="card">
        <div style={sideColor} />
        <div className={
            this.state.showDetails? "card__title card__title--is-open" : "card__title"
          } onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        <ReactCSSTransitionGroup transitionName="ztoggle"
                                 transitionEnterTimeout={250}
                                 transitionLeaveTimeout={250}>
                                 {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    ));
    //...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
  }
}
Card.propTypes = {
  id: PropTypes.number,
  title: ztitlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  //...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
  connectDropTarget: PropTypes.func.isRequired
  //...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
};

//...S.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
const dragSortCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropSortCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragSortCard);
export default dragDropSortCard;
//...E.164p.Card 컴포넌트를 DragSource 와 DropTarget 으로 모두 설정함.
