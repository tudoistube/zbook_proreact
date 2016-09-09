//...145p.
//...dropSource 래퍼 없는 기본 구조.
//...name 속성을 받고 이를 div 태그 안에 랜더링함.
import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

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
