//...36p.
import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    }
  };

/*...36p.31p에서 굵은 화살표('( )=>')를 이용해서 onClick 이벤트 핸들러 안에
인라인 함수로 추가하는 방법은 유연하지 않아서, 클래스 안에서 toggleDetails라는
새로운 메서드를 이용해 이벤트를 처리함.

현재 리액트 버전에서는 개발자가 함수를 명시적으로 컨텍스트에 바인딩해야 함.
이를 위해 .bind(this)를 이용해 바인딩된 함수를 만드는 방법이 가장 간단함.
ES6클래스 사용되기 전에는 모든 메서드가 자동으로 바인딩되었으나 제거됨..
aaa
*/
  toggleDetails(){
    this.setState(
      {showDetails: !this.state.showDetails}
    );
  }

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
             onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;
