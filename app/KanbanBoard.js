//...21p.
import React, { Component } from 'react';
import List from './List';

class KanbanBoard extends Component {
  render(){
    return (
      <div className="app">
              {/*...필터와 맵함수를 이용해 cards 배열의 데이터를 처리함.*/}
        <List id='todo'
              title="To Do"
              cards={this.props.cards.filter((card) => card.status === "todo")} />
        <List id='in-progress'
              title="In Progress"
              cards={this.props.cards.filter((card) => card.status === "in-progress")} />
        <List id='done'
              title='Done'
              cards={this.props.cards.filter((card) => card.status === "done")} />
      </div>
    );
  }
};

export default KanbanBoard;
