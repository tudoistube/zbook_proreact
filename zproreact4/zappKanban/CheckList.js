import React, { Component, PropTypes } from 'react';


class CheckList extends Component {

  zcheckInputKeyPress(evt){
    if(evt.key==='Enter'){
      this.props.taskCallbacks.addTask(this.props.cardId.evt.target.value);
      evt.target.value='';
    }
  }

  render() {
/*.XXX.
    let tasks = this.props.tasks.map((task) => (
...before/after: added taskIndex. */
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id}
          className="checklist__task">
{/*...체크박스 : 제어컴포넌트임.*/}
        <input type="checkbox" defaultChecked={task.done}
          onChange={this.props.taskCallbacks.toggleTask.bind(null,this.props.cardId, task.id, taskIndex)}/>
        {task.name}{' '}
        <a href="#" className="checklist__task--remove"
          onClick={this.props.taskCallbacks.deleteTask.bind(null,this.props.cardId, task.id, taskIndex)}/>
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
{/*...입력상자 : value 속성이 없으므로 입력이 자유로운 비제어컴포넌트임.*/}
        <input type="text" className="checklist--add-task"
               placeholder="value 속성이 없어 입력이 자유로운 비제어컴포넌트임."
               onKeyPress={this.zcheckInputKeyPress.bind(this)}/>
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
