//...73p.
import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task) => (
      <li key={task.id} className="checklist__task">
    {/* 체크박스 : 제어컴포넌트임*/}
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}{' '}
        <a href="#" className="checklist__task--remove" />
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
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
