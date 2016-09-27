//...160p.
/*
...cardCallbacks 속성을 받고 Card 로 전달함.
...사용자가 리스트 위로 드래그하는 동안 List 사양의 hover() 로 Card 의 콜백을
   호출해서 즉시 상태를 업데이트함.
*/
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from './zconstants';

//...S.162p.List 컴포넌트를 DropTarget 으로 설정함.
const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
};

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}
//...E.162p.List 컴포넌트를 DropTarget 으로 설정함.

class List extends Component {
  render() {
    //*...S.161p.List 컴포넌트를 DropTarget 으로 설정함.
    const { connectDropTarget } = this.props;
    //*...E.161p.List 컴포넌트를 DropTarget 으로 설정함.

    let cards = this.props.cards.map((card) => {
      /*
      ...Card 컴포넌트로 속성을 전달하면서 타이핑을 줄이기 위해 스프레드 연산자 사용함.
      */
      return <Card key={card.id}
                   taskCallbacks={this.props.taskCallbacks}
                   cardCallbacks={this.props.cardCallbacks}
                   {...card} />
    });

    //...S.161p.List 컴포넌트를 DropTarget 으로 설정함.
    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
    //...E.161p.List 컴포넌트를 DropTarget 으로 설정함.
  }
};
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired//...163p.added.
};

//...S.161p.List 컴포넌트를 DropTarget 으로 설정함.
export default DropTarget(constants.CARD, listTargetSpec, collectDrop)(List);
//...E.161p.List 컴포넌트를 DropTarget 으로 설정함.
