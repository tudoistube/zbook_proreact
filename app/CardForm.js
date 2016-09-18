
/*...204p.
작업개요>	라우트를 이용한 카드 작성(/new)과 편집(/edit/:card_id) 기능을 구현함.
	NewCard 와 EditCard 컴포넌트가 공통으로 이용하는 CardForm 컴포넌트를 생성함.
	CardForm 컴포넌트를 먼저 생성함.
	NewCard 와 EditCard 컴포넌트를 생성함.
	새로운 라우트를 설정하도록 App.js 를 수정함.
	KanbanBoardContainer 클래스에 카드 생성과 편집 메서드를 추가하여 컴포넌트를 전달함.

	리액트 라우터와 히스토리를 먼저 의존성 설치함.
  $ npm install --save react-router@1.x.x history@1.x.x 로 설치해야
  react-router@1.0.3, history@1.17.0 으로 설치됨.
  $ npm install --save react-router history 로 설치하면
  react-router@2.8.1, history@4.2.0 으로 설치되고 예제 실행시 오류가 발생함.

...205p.
CardForm 컴포넌트 : 상태를 포함하지 않는 순수 컴포넌트임.
*/
import React, {Component, PropTypes} from 'react';

class CardForm extends Component {

  handleChange(field, e){
    this.props.handleChange(field, e.target.value);
  }

  handleClose(e){
    e.preventDefault();
    this.props.handleClose();
  }

  render(){
    return (
      <div>
        <div className="card big">
          <form onSubmit={this.props.handleSubmit.bind(this)}>
  	        <input type='text'
                   value={this.props.draftCard.title}
                   onChange={this.handleChange.bind(this,'title')}
                   placeholder="Title"
                   required={true}
                   autoFocus={true} /><br />
            <textarea value={this.props.draftCard.description}
                      onChange={this.handleChange.bind(this,'description')}
                      placeholder="Description"
                      required={true} /><br />
            <label htmlFor="status">Status</label>
            <select id="status"
                    value={this.props.draftCard.status}
                    onChange={this.handleChange.bind(this,'status')}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <label htmlFor="color">Color</label>
            <input id="color"
                   value={this.props.draftCard.color}
                   onChange={this.handleChange.bind(this,'color')}
                   type="color"
                   defaultValue="#ff0000" />

            <div className='actions'>
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose.bind(this)}>
        </div>
      </div>
    );
  }
}

CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default CardForm;
