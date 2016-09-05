//...99p.
//...실행하면 데이터 없이 ToDo, InProgress, Done 항목만 출력됨.
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';


class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
  }

  render() {
    return <KanbanBoard cards={this.state.cards} />
  }
};

export default KanbanBoardContainer;
