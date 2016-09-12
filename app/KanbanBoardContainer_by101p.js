//...99p.
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
  }

  render() { return (
    <KanbanBoard cards={this.state.cards} />
    )
  }
}
export default KanbanBoardContainer;
