import React, { Component, PropTypes } from 'react';

import Card from './Card';

class List extends Component {
  render() {

    let cards=this.props.cards.map((card)=>{
/*.XXX.
      return <Card key={card.id}
                   id={card.id}
                   title={card.title}
                   description={card.description}
                   color={card.color} //...52p.
                   tasks={card.tasks}/>
...before/after : 스프레드 연산자 사용.*/
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
}

List.propTypes={
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default List;
