//...29p.
import React, { Component } from 'react';
import CheckList from './CheckList';

/*
1. showDetails라는 키를 컴포넌트의 상태로 정의하는 생성자 함수 추가.

2. render()의 JSX를 수정해 showDetails 상태 속성이 true일 때만 카드 세부사항을 렌더링함.

3. 클릭 이벤트 핸들러를 추가해서 showDetails를 토글함.
*/

class Card extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    }
  };


  render() {
    let cardDetails;
    if(this.state.showDetails){
      cardDetails = (
        <div className="card__details">
          {this.props.description}
          <CheckList cardId={this.props.id}
                     tasks={this.props.tasks} />
        </div>
      );
    }


    return (
      <div className="card">
        <div className="card__title"
             onClick={()=>this.setState({showDetails: !this.state.showDetails})}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;
