//...104p.
import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    let cards = this.props.cards.map((card) => {
      /*
      ...Card 컴포넌트로 속성을 전달하면서 타이핑을 줄이기 위해 스프레드 연산자 사용함.
      */
      return <Card key={card.id}
                   taskCallbacks={this.props.taskCallbacks}
                   {...card} />
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
};
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default List;
