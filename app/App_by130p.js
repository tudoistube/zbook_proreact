//...130p.
import React, { Component } from 'react';
import { render } from 'react-dom';
/*...애니메이션을 적용하려는 자식 요소는 ReactCSSTransitionGroup 요소로 래핑해야 함.
ReactCSSTransitionGroup 은 다음 3개의 속성을 포함함.
transitionName ( 실제 애니메이션 정의를 포함하는 CSS 클래스 이름으로 매핑됨),
transitionEnterTimeout,
transitionLeaveTimeout (밀리초 단위 지속 시간).
*/
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends Component {
  constructor(){
    super(...arguments);

    // Create an "items" state pre-populated with some shopping items
    this.state={
      items: [
        {zid:1, zname: 'Milk'},
        {zid:2, zname: 'Yogurt'},
        {zid:3, zname: 'Orange Juice'},
      ]
    }
  }

  // Called when the user changes the input field
  zhandleChange(evt) {
    if(evt.key === 'Enter'){
      // Create a new item and set the current time as it's id
      let znewItem = {zid:Date.now(), zname:evt.target.value}
      // Create a new array with the previous items plus the value the user typed
      let znewItems = this.state.items.concat(znewItem);
      // Clear the text field
      evt.target.value='';
      // Set the new state
      this.setState({items: znewItems});
    }

  }

  // Called when the user Clicks on a shopping item
  zhandleRemove(i) {
    // Create a new array without the clicked item
    var znewItems = this.state.items;
    znewItems.splice(i, 1);
    // Set the new state
    this.setState({items: znewItems});
  }

  render(){
    let zshoppingItems = this.state.items.map((item, i) => (
      <div key={item.zid} className="item"
           onClick={this.zhandleRemove.bind(this, i)}>
           {item.zname}
      </div>
    ));

    return(
      <div>
        {zshoppingItems}
        <input type="text" value={this.state.znewItem}
                           onKeyDown={this.zhandleChange.bind(this)}/>
      </div>
    );
  }
};

render(<AnimatedShoppingList />, document.getElementById('root'));
