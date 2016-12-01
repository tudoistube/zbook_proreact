import React, { Component, PropTypes } from 'react';

import CheckList from './CheckList';
import marked from 'marked';

//...Custom propTypes 유효성 검사기.
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


/*
1. showDetails라는 키를 컴포넌트의 상태로 정의하는 생성자 함수 추가.
2. render()의 JSX를 수정해 showDetails 상태 속성이 true일 때만 카드 세부사항을 렌더링함.
3. 클릭 이벤트 핸들러를 추가해서 showDetails를 토글함.
*/
class Card extends Component {

  constructor(){
    super(...arguments);
    this.state={ showDetails: false }
  }

  /*...카드제목을 클릭함에 따라 토글되어 카드 세부내용을 보이게 함.*/
  toggleDetails(){
    this.setState({showDetails: !this.state.showDetails});
  }//...E.toggleDetails()

  render() {
    let cardDetails;

    if(this.state.showDetails){
      cardDetails=(
        <div className="card__details">
{/*.XXX.{this.props.description}.
...before/after : Markup 적용 : HTML 태그가 그대로 나옴./
          {marked(this.props.description)}
/*...before1/after1 : */}
          <span dangerouslySetInnerHTML={
              {__html:marked(this.props.description)}
            }/>

          <CheckList cardId={this.props.id}
                     tasks={this.props.tasks}
                     taskCallbacks={this.props.taskCallbacks}/>
        </div>
      );//...E.cardDetails.
    }//...E.if(this.state.showDetails).

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };//...E.sideColor.

    return (
      /*...Card 컴포넌트에 className 특성이 사용된 것에 주의할 것.
      JSX는 자바스크립트이므로 class 같은 XML 특성이 있는 식별자와 구분하기 위함.*/
      <div className="card">
        <div style={sideColor}/>

{/*.XXX.
        <div className="card__title"
...before/after: 삼항식 조건에 따라 카드 제목에 className 을 다르게 넣음.*/}
        <div className={this.state.showDetails? "card__title card__title--is--open"
                                              : "card__title"}
/*.XXX.
             onClick={()=>this.setState({showDetails: !this.state.showDetails})}>
...before/after: toggleDetails() */
             onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  //title: PropTypes.string.isRequired,
  title: ztitlePropType, //...73p.Custom propTypes 유효성 검사기.
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default Card;
