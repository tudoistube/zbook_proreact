import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

//...주 컴포넌트이며 SearchBar와 ContactList를 렌더링함.
class ContactsApp extends Component {

  //...상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.
  constructor(){
    super();
    this.state={
      filterText: 'Mara'
    };
  }

  render(){
    return (
      <div>
        {/*
          SearchBar(자신)는 ContactsApp(남)의 상태를 속성으로 받아서
          자신 내부에서는 props 로 처리함.
        */}
        <SearchBar filterText={this.state.filterText} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    );
  }
}; //...E.class ContactsApp

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

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


class ContactList extends Component {

  render(){

    let filteredContacts = this.props.contacts.filter(
      (contact)=>contact.name.indexOf(this.props.filterText)!= -1
    );

    return (
             <ul>
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
