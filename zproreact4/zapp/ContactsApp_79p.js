import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';

class ContactsApp extends Component{

  //...S.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.
  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }
  //...E.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.

  render(){
    return(
      <div>
{/*.XXX.
        <SearchBar />
...before/after :*/}
        <SearchBar filterText={this.state.filterText}/>
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    );
  }
}//...E.class ContactsApp.

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

class SearchBar extends Component {

  render(){
    return <input type="search" placeholder="search"
                  value={this.props.filterText}/>;
  }
}; //...E.class SearchBar

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
{/*.XXX.
                {filteredContacts.map(
...before/after : */}
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
       document.getElementById('zroot'));
