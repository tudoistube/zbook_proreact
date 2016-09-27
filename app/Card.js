//...172~p.
/*
...172p.새로운 카드 위치와 상태 저장.
KanbanBoardContainer 컴포넌트에서 추가한 persistCardDrag() 메서드를 Card 컴포넌트
에서 호출할 수 있도록 cardCallbacks 객체 안에서 persistCardDrag() 메서드를 이용할 수
있게 함.
사용자가 드래그를 끝내면 Card 컴포넌트의 cardDragSpec 을 이용해 persistDrag 콜백을
호출함.
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
      id: props.id,
      status: props.status //...172p.새로운 카드 위치와 상태 저장.
    };
  },
  //...S.172p.새로운 카드 위치와 상태 저장.
  endDrag(props) {
    props.cardCallbacks.persistCardDrag(props.id, props.status);
  }
  //...E.172p.새로운 카드 위치와 상태 저장.
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
