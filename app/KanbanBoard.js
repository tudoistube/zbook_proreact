/*
...215p.
NewCard 와 EditCard 컴포넌트는 KanbanBoard 의 자식임.
'/new' 또는 '/edit' 라우트로 이동하면 라우터가 해당하는 컴포넌트를 자식 속성으로
KanbanBoard 에 주입함.
카드리스트 및 카드 콜백과 새로운 속성을 추가히기 위해 자식 속성을 복제하고 렌더링함.
*/
import React, { Component, PropTypes } from 'react';
//...S.163p.KanbanBoard 컴포넌트를 DnD Context 로 설정함.
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//...E.163p.KanbanBoard 컴포넌트를 DnD Context 로 설정함.
import { Link } from 'react-router';
import List from './List';

class KanbanBoard extends Component {
  render(){
    //...S.215p.NewCard 와 EditCard 렌더링.
    let cardModal=this.props.children
                    &&
                  React.cloneElement(this.props.children, {
                    cards: this.props.cards,
                    cardCallbacks: this.props.cardCallbacks
                  });
    //...E.215p.NewCard 와 EditCard 렌더링.

    return (
      <div className="app">
        {/*...216p.new 라우트로부터 시작해 라우트 전환을 처리하는 기능.*/}
        <Link to='/new' className="float-button">+</Link>

        <List id='todo'
              title="To Do"
              cards={this.props.cards.filter((card) => card.status === "todo")}
              cardCallbacks={this.props.cardCallbacks}
              taskCallbacks={this.props.taskCallbacks} />
        <List id='in-progress'
              title="In Progress"
              cards={this.props.cards.filter((card) => card.status === "in-progress")}
              cardCallbacks={this.props.cardCallbacks}
              taskCallbacks={this.props.taskCallbacks} />
        <List id='done'
              title='Done'
              cards={this.props.cards.filter((card) => card.status === "done")}
              cardCallbacks={this.props.cardCallbacks}
              taskCallbacks={this.props.taskCallbacks} />
        {cardModal}
      </div>
    );
  }
};
KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object,
  taskCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
