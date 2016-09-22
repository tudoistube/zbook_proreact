//...79~80p.
/*
...애플리케이션의 모든 컴포넌트는 속성을 통해 받은 데이터만 렌더링하는 순수 컴포넌트임.
*/
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

//...주 컴포넌트이며 SearchBar와 ContactList를 렌더링함.
//...필터 텍스트는 ContactsApp 에 상태로 유지되는 것이 개념상 맞음.
//...필터 텍스트를 속성을 통해 하위 컴포넌트로 전달함.
class ContactsApp extends Component {

  //...S.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.
  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }
  //...E.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.

  render(){
    return (
      <div>
        {/*SearchBar 는 ContactsApp 의 stage 를 자신은 속성으로 받아서
          자신 내부에서는 props 로 처리함.*/}
        <SearchBar filterText={this.state.filterText} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    );
  }
};//...E.class ContactsApp

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

//...앱에 필터 기능을 추가하려면 변경 가능 상태를 저장해야 함.
//...검색 텍스트를 표시해야 함.
class SearchBar extends Component {

  render(){
    return <input type="search" placeholder="search"
                  value={this.props.filterText}/>;
  }
}; //...E.class SearchBar

//...새로운 propTypes 요건을 추가함.
SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired
};


//...상태를 기준으로 연락처를 필터링해야 함.
class ContactList extends Component {

  render(){
    let filteredContacts = this.props.contacts.filter(
      (contact)=>contact.name.indexOf(this.props.filterText)!= -1);

    return (
             <ul>
               {/*XXX
               {this.props.contacts.map(
                   (contact)=><ContactItem key={contact.email}
                                           name={contact.name}
                                           email={contact.email} />
                )}
               XXX*/}
                {filteredContacts.map(
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
