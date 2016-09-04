//...63p.
import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    let cards = this.props.cards.map((card) => {
      //...카드의 데이터에는 각 카드의 ID 가 포함되있으므로 이를 List 컴포넌트에서 key 속성으로 이용함.
      return <Card key={card.id}
                   id={card.id}
                   title={card.title}
                   description={card.description}
                   color={card.color}
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
