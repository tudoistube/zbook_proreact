/*...23p.
Card 컴포넌트는 사용자 상호작용이 주로 수행됨.
각 카드에는 제목, 설명, 체크리스트가 포함됨.
*/
import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {

  render() {
    return (
      /*...Card 컴포넌트에 className 특성이 사용된 것에 주의할 것.
      JSX는 자바스크립트이므로 class 같은 XML 특성이 있는 식별자와 구분하기 위함.*/
      <div className="card">
        <div className="card__title">{this.props.title}</div>
        <div className="card__details">
          {this.props.description}
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>

      </div>
    );
  }
}

export default Card;
