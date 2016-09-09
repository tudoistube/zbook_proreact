//...140p.
//...dropTarget 래퍼 없는 기본 구조.
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

class ShoppingCart extends Component {
  render() {
    const style = {
      backgroundColor: '#FFFFFF'
    }

    return (
      <div className='shopping-cart' style={style}>
        Drag Here to order!
      </div>
    );
  }
}
