//...64p.
import React, { Component } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task) => (
      //...64p.체크리스트에도 배열이 있어서 여기에 키를 추가함.
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
}

export default CheckList;
