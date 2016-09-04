//...52p.
/*
...Card 의 부모 컴포넌트인 List 컴포넌트는 속성을 통해 3가지 특성(title, description, tasks)을
Card 컴포넌트로 전달하고, 이러한 특성에 color 를 추가함.
*/
import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    var cards = this.props.cards.map((card) => {
      return <Card id={card.id}
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
