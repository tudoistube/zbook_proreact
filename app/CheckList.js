//...105p.
import React, { Component, PropTypes } from 'react';

class CheckList extends Component {

  //...태스크 추가 콜백함수 호출하고 입력필드 지움.
  zcheckInputKeyPress(evt) {
      if (evt.key === 'Enter') {
          this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
          evt.target.value = '';
      }
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist__task">
        {/* 체크박스 : 제어컴포넌트임*/}
        <input type="checkbox"
               checked={task.done}
               onChange={ this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex) } />
        {task.name}{' '}
        <a href="#"
           className="checklist__task--remove"
           onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex) } />
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        {/* 입력상자 : 비제어컴포넌트임*/}
        <input type="text"
          className="checklist--add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.zcheckInputKeyPress.bind(this)} />
      </div>
    );
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};
export default CheckList;
