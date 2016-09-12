//...160~p.
/*
...152p. 카드 토글 애니메이션.
먼저 ReactCSSTransitionGroup 를 설치가 필요함.
$ npm install --save react-addons-css-transition-group
ReactCSSTransitionGroup 를 임포트하고, cardDetails 를 래퍼로 감쌈.
스타일 시트에는 max-height 속성을 변경하는 CSS 트랜지션을 추가함.
*/
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';

import { DragSource } from 'react-dnd';
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
    //*...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
    const { connectDragSource } = this.props;
    //*...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.

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

    //*...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
    return connectDragSource(
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
    );
    //*...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
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
  connectDragSource: PropTypes.func.isRequired
};

//...S.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
//...E.160p.DragSource 로 설정할 Card 컴포넌트 사양에는 beginDrag() 만 구현함.
