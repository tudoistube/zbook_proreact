//...73~p.
import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';

/*...S.73p.Card 컴포넌트 :: Custom propTypes 유효성 검사기.
...유효성 검사기는 기본적으로 속성의 리스트, 검사할 속성명, 컴포넌트 이름을 받는 함수임.
...카드 제목이 20자를 초과할 경우 경고하는 커스텀 유효성 검사기.
*/
let ztitlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 20) {
      return new Error(
        `${propName} in ${componentName} is longer than 20 characters`
      );
    }
  }
};
/*...E.73p.Card 컴포넌트 :: Custom propTypes 유효성 검사기. */

class Card extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    }
  };

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
          <span
           dangerouslySetInnerHTML={
            {__html: marked(this.props.description)}
           } />

          <CheckList cardId={this.props.id}
                     tasks={this.props.tasks} />
        </div>
      );
    }


    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };


    return (
      <div className="card">
        <div style={sideColor}/>
        <div className={this.state.showDetails? "card__title card__title--is-open" : "card__title"}
             onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    )
  }
};

Card.propTypes = {
  id: PropTypes.number,
  title: ztitlePropType, //...73p.Custom propTypes 유효성 검사기.
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default Card;
