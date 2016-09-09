//...140p.
//...dropTarget 래퍼 없는 기본 구조 + 드래그 앤드 드랍 사양..
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

// ShoppingCart DND Spec :: 드래그 앤드 드랍 사양.
//...드랍대상 사양을 구현하고 메서드를 설정함.
//    "A plain object implementing the drop target specification"
//
//  - DropTarget Methods (All optional)
//    - drop: Called when a compatible item is dropped.
//    - hover: Called when an item is hovered over the component.
//    - canDrop: Use it to specify whether the drop target is able to accept
//               the item.
const ShoppingCartSpec = {
    //...drop 이벤트가 발생할 때 마다 문자열 하나를 반환함.
  drop() {
    return { name: 'ShoppingCart' };
  }
};

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
