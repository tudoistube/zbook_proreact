//...15~16p.import React, { Component } from 'react';import {render} from 'react-dom';// Parent Componentclass GroceryList extends Component {  render() {    return (      <ul>        <ListItem quantity="1">Bread</ListItem>        <ListItem quantity="6">Eggs</ListItem>        <ListItem quantity="2">Milk</ListItem>      </ul>    );  }}// Child Componentclass ListItem extends Component {  render() {    return (      <li>        {/*...props.childern 속성을 이용해 열기 태그와 닫기 태그 사이에              내용을 참조할 수 있음(Bread, Eggs, Milk 등이 출력됨).*/}        {this.props.quantity} × {this.props.children}      </li>    );  }}render(<GroceryList />, document.getElementById('zroot'));