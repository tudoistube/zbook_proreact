//...22p.
import React, { Component } from 'react';
import Card from './Card';
/*
...List컴포넌트는 목록의 이름과 그 안에 든 모든 Card컴포넌트를 렌더링함.
List컴포넌트는 속성을 통해 cards 배열을 받은 다음 제목, 설명과 같은 개별정보를
다시 속성을 통해 Card 컴포넌트로 전달함.
*/
class List extends Component {
  render() {
    var cards = this.props.cards.map((card) => {
      return <Card id={card.id}
                   title={card.title}
                   description={card.description}
                   tasks={card.tasks} />
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
};

export default List;
