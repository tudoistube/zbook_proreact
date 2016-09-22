//...60p.
import React, { Component } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task) => (
      <li className="checklist__task">
    {/* 체크박스 : 제어컴포넌트임*/}
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}
        <a href="#" className="checklist__task--remove" />
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
    {/* 입력상자 : value 속성이 없으므로 입력이 자유로와서 비제어컴포넌트임*/}
        <input type="text" className="checklist--add-task"
                placeholder="입력상자 : 비제어컴포넌트임" />
      </div>
    );
  }
}

export default CheckList;
