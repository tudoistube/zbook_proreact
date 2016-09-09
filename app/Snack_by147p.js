//...145p.
//...dropSource 래퍼 없는 기본 구조 + 사양객체.
//...name 속성을 받고 이를 div 태그 안에 랜더링함.
import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

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

class Snack extends Component {
  render() {
    const { name } = this.props;

    const style = {
      opacity: opacity
    };

    return (
        <div className='snack' style={style}>
          {name}
        </div>
    );
  }
}

Snack.propTypes = {
  name: PropTypes.string.isRequired
};
