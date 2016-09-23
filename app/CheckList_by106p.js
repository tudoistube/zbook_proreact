//...105p.
import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist__task">
    {/* 체크박스 : 제어컴포넌트임
        before :
        <input type="checkbox" defaultChecked={task.done} />
        after :
    */}
        <input type="checkbox"
               checked={task.done}
               onChange={ this.props.taskCallbacks.toggle.bind(null,
                                                               this.props.cardId,
                                                               task.id,
                                                               taskIndex) } />
        {task.name}{' '}
        {/*...before :
          <a href="#" className="checklist__task--remove" />
          after :
        */}
        <a href="#"
           className="checklist__task--remove"
           onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex) } />
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
    {/* 입력상자 : 비제어컴포넌트임*/}
        <input type="text" className="checklist--add-task"
                placeholder="입력상자 : 비제어컴포넌트임" />
      </div>
    );
  }
};

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default CheckList;
