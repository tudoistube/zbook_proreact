import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

//...주 컴포넌트이며 SearchBar와 ContactList를 렌더링함.
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

class SearchBar extends Component {

  render(){
    return <input type="search" placeholder="search" />;
  }
}; //...E.class SearchBar

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
