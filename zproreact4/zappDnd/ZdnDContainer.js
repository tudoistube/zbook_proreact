//...138p.
//...모든 드래그 앤드 드랍 상호작용이 수행됨.
//...각기 다른 name 속성을 포함하는 Snack 컴포넌트 여러 개를 랜더링하고,
//...아래에 ShoppingCart 컴포넌트를 렌더링함.
import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
//...리액트 DnD 용 HTML5 백엔드를 임포트함.
import HTML5Backend from 'react-dnd-html5-backend';

import ShoppingCart from './ZshoppingCart';
import Snack from './Zsnack';

class Container extends Component{

  render() {
    return (
      <div>
        <Snack name='Chips' />
        <Snack name='Cupcake' />
        <Snack name='Donut' />
        <Snack name='Doritos' />
        <Snack name='Popcorn' />
        <ShoppingCart />
      </div>
    );
  }
}

//...모듈이 Container 컴포넌트를 내보내는 것이 아니라 Container 에 기반을 두는
//...DragDropContext 고차 컴포넌트에 모든 드래그앤드드랍 상태와 함수가 주입됨.
export default DragDropContext(HTML5Backend)(Container);
