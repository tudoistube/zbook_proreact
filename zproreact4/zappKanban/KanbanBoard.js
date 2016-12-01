import React, { Component, PropTypes } from 'react';

import List from './List';

class KanbanBoard extends Component {
  render() {
    return (
      <div className="app">
{/*...필터와 맵함수를 이용해 cards 배열의 데이터를 처리함.*/}
        <List id="todo" title="To Do"
              cards={this.props.cards.filter((card)=>card.status==="todo")}
              taskCallbacks={this.props.taskCallbacks}/>
        <List id="in-progress" title="In-Progress"
              cards={this.props.cards.filter((card)=>card.status==="in-progress")}
              taskCallbacks={this.props.taskCallbacks}/>
        <List id="done" title="Done"
              cards={this.props.cards.filter((card)=>card.status==="done")}
              taskCallbacks={this.props.taskCallbacks}/>
      </div>
    );
  }
}

KanbanBoard.propTypes={
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default KanbanBoard;
