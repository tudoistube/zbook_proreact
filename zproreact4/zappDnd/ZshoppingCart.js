//...141~151p.
//...dropTarget 래퍼 없는 기본 구조 + DnD사양객체 + 콜렉트함수(connector + monitor).
import React, { PropTypes, Component } from 'react';

import { DropTarget } from 'react-dnd';

var snackNameInCart = '';
var snackNameInSpec = '';

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

    //...drop 이벤트가 발생할 때 마다 문자열 하나를 반환하고,
    //...이를 Snack 컴포넌트가 이용함.
  drop(props, monitor) {
    //return { name: 'ShoppingCart' };
    snackNameInSpec = monitor.getItem().name;
    console.log('snackNameInSpec : ' + snackNameInSpec);
    //console.log('snackName : ' + monitor.getDropResult());//...(False).null.
    //let snackNameInCart = monitor.getItem().name;

    //console.log('name2 : ' + props.name2);//...(Failed) undefined.
    //props.setSnackName(snackNameInCart);//...(Failed) Uncaught TypeError: props.setSnackName is not a function(…)
    return { name: 'ShoppingCart' };
  }
};

// ShoppingCart DropTarget - collect :: 콜렉트 함수(connect + monitor).
//...리액트 DnD 커넥터(connect)와 상태(monitor)를 컴포넌트의 속성과 연결하는
//...collect 함수.
//...connectDropTarget 속성 : 이 컴포넌트 DOM 의 어떤 부분이 드래그 가능한 객체를
//...                     위한  대상 영역인지 지정함(예제에서는 간단하게 전체 div를
//...                     드래그 대상으로 만듦).
//...DnD Connector 와 상태를 컴포넌트의 속성과 연결함.
//  "The collecting function.
//
//  - connect: An instance of DropTargetConnector.
//             DropTargetConnector 의 인수.
//             You use it to assign the drop target role to a DOM node.
//             Drop 대상 역할을 DOM 노드에 할당하는데 이용함.
//
//  - monitor: An instance of DropTargetMonitor.
//             DropTargetMonitor 의 인수.
//             You use it to connect state from the React DnD to props.
//             리액트 DnD 에서 속성으로 상태를 연결하는데 이용함.
//             Available functions to get state include canDrop(), isOver() and didDrop()
//             상태를 얻는데 이용할 수 있는 함수는 canDrop(), isOver(), didDrop().
//
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),//...필수 커넥터.
    /*...142p.다른 이름으로 쓸 수도 있다.
      예)booleanDraggingSomethingOverMe: monitor.isOver(),
    */
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class ShoppingCart extends Component{

    constructor(){
      super(...arguments);
      this.state={ snackName: 'Empty ShoppingCart' };
    }
    setSnackName(pName){
      this.setState({snackName: pName});
    }//...E.setSnackName(pName)

/* ...143p.
    render() 메서드.
    1. canDrop, isDrop, connectDropTarget 속성에 대한 간소한 접근을 위해 구조분해
    할당을 이용해서, ShoppingCart.propTypes 를 사용하여 this.props.canDrop
    대신 canDrop 만 입력해도 됨.
    connectDropTarget 속성 : 이 컴포넌트 DOM 의 어떤 부분이 드래그 가능한 객체를
                         위한 대상 영역인지 지정함(예제에서는 간단하게 전체 div를
                         드래그 대상으로 만듦).
    2. 배경색은 사용자가 항목을 드래그하고 있는지 여부와 장바구니 위로 드래그하고
    있는지 여부에 따라 달라짐.
    3. 텍스트도 사용자가 항목을 장바구니 위로 드래그하면 다르게 표시됨.
    4. 이전과 달리 div 를 반환하는 대신 div 를 connectDropTarget 에 래핑함.
*/
  render() {

    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#FFFFFF';
    if (isActive) {
      backgroundColor = '#F7F7BD';
    } else if (canDrop) {
      backgroundColor = '#F7F7F7';
    }

    const style = {
      backgroundColor: backgroundColor
    };

{/*.XXX.
    return (
      <div className='shopping-cart' style={style}>
        Drag Here to order!
      </div>
    );
...before/after: */}
    return connectDropTarget(
      <div className='shopping-cart' style={style}>
        {isActive ?
          snackNameInSpec :
          'Drag here to order!'
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}
/*
...고차컴포넌트를 DropTarget 래퍼를 이용해 내보내야 함.
DropTarget 고차 래퍼의 타입 매개변수는 이 컴포넌트로 드래그할 수 있는 드래그 원본의
타입(이 예제에서는 'snack')을 지정함.
*/
export default DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart);
