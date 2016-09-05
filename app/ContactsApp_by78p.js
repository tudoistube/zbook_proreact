//...77p.
/*
...애플리케이션의 모든 컴포넌트는 속성을 통해 받은 데이터만 렌더링하는 순수 컴포넌트임.
*/
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

//...주 컴포넌트이며 SearchBar와 ContactList를 렌더링함.
//...필터 텍스트는 ContactsApp 에 상태로 유지되는 것이 개념상 맞음.
//...필터 텍스트를 속성을 통해 하위 컴포넌트로 전달함.
class ContactsApp extends Component {

  render(){
    return (
      <div>
        <SearchBar />
        <ContactList contacts={this.props.contacts} />
      </div>
    );
  }
};

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

//...앱에 필터 기능을 추가하려면 변경 가능 상태를 저장해야 함.
//...검색 텍스트를 표시해야 함.
class SearchBar extends Component {

  render(){
    return <input type="search" placeholder="search" />;
  }
}; //...E.class SearchBar

//...상태를 기준으로 연락처를 필터링해야 함.
class ContactList extends Component {

  render(){
    return (
             <ul>
                {this.props.contacts.map(
                    (contact)=><ContactItem key={contact.email}
                                            name={contact.name}
                                            email={contact.email} />
                 )}
             </ul>
           );
  }
}; //...E.class ContactList

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

class ContactItem extends Component {
  render() {
    return <li>{this.props.name} - {this.props.email}</li>;
  }
}; //...E.class ContactItem

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

//...연락처 리스트 데이터는 전역 변수에 저장됨.
let contacts = [
    { name: "Mara", email: "mara@email.com"},
    { name: "Sara", email: "sara@email.com"},
    { name: "Romain", email: "romain@email.com"},
    { name: "Shinobu", email: "shinobu@email.com"},
    { name: "Olivie", email: "olivie@email.com"},
    { name: "Tip", email: "tip@email.com"}
]

render(<ContactsApp contacts={contacts} />,
       document.getElementById('root'));
