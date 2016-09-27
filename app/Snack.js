//...151~152p.
//...drogSource 래퍼 없는 기본 구조 + 사양객체 + 콜렉팅함수 구현.
//...name 속성을 받고 이를 div 태그 안에 랜더링함.
import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import zconstants from './zconstants';

//  snack Drag'nDrop spec :: 사양객체.
//...이벤트 구현.
//    - Required: beginDrag 이벤트 발생시 문자열 하나 반환함.
//    - Optional: endDrag 이벤트 발생시 반환된 두값을 콘솔로 출력함.
//    - Optional: canDrag
//    - Optional: isDragging
const snackSpec = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
    }
  }
};

// Snack DragSource collect collecting function. :: 컬렉팅 함수.
//  - connect: An instance of DragSourceConnector.
//             You use it to assign the drag source role to a DOM node.
//
//  - monitor: An instance of DragSourceMonitor.
//    You use it to connect state from the React DnD to your component’s properties.
//    Available functions to get state include canDrag(), isDragging(), getItemType(),
//    getItem(), didDrop() etc.
let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Snack extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    const style = {
      opacity: opacity
    };

    return (
      //...div 를 반환하는 대신 div 를 connectDragSource 에 래핑함.
      connectDragSource(
        <div className='snack' style={style}>
          {name}
        </div>)
    );
  }
}

Snack.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};
//...고차컴포넌트를 DragSource 래퍼를 이용해 내보내야 함.
export default DragSource(zconstants.SNACK, snackSpec, collect)(Snack);
