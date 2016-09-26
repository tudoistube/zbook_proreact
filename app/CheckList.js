//...106~108p.
import React, { Component, PropTypes } from 'react';

class CheckList extends Component {

  /*...태스크 추가 콜백함수 호출하고 입력필드 지움.
  새 태스크를 추가할 때는 컴포넌트 안에서 taskCallbacks.add 콜백을 호출하기 전에
  사용자가 Enter 키를 눌렀는지 확인하고 콜백 함수를 호출한 후 입력 필드를 지움.
  */
  zcheckInputKeyPress(evt) {
      if (evt.key === 'Enter') {
          this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
          evt.target.value = '';
      }
  }

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
                placeholder="입력상자 : 비제어컴포넌트임"
                onKeyPress={this.zcheckInputKeyPress.bind(this)} />
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
