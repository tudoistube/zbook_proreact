//...88~90p.
//...ContactsApp_85p 를 복사해서 생성하고 ContactsAppContainer
//...컴포넌트를 추가함.
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

//...S.컨테이너 컴포넌트 생성.
class ContactsAppContainer extends Component {

  constructor(){
    super();
    this.state={
      contacts: []
    };
  }

  componentDidMount(){
    fetch('./contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({contacts: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render(){
    return (
      <ContactsApp contacts={this.state.contacts} />
    );
  }

}; //...E.class ContactsAppContainer
//...E.컨테이너 컴포넌트 생성.

//...주 컴포넌트이며 SearchBar와 ContactList를 렌더링함.
//...filterText 상태와 handleUserInput 콜백을 속성을 통해 전달함.
class ContactsApp extends Component {

  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }

  handleUserInput(searchTerm){
    this.setState({filterText: searchTerm})
  }

  render(){
    return (
      <div>
        {/*
          SearchBar(자신)는 ContactsApp(남)의 속성을 state 로 받아서
          자신 내부에서는 props 로 처리함.
        */}
        <SearchBar filterText={this.state.filterText}
                    onUserInput={this.handleUserInput.bind(this)}/>
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    );
  }
}; //...E.class ContactsApp

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

//...부모에서 속성을 통해 filterText(문자열)와
//...onUserInput(콜백함수)을 받는 순수 컴포넌트.
class SearchBar extends Component {
  handleChange(event){
    this.props.onUserInput(event.target.value)
  }


  render(){
    return <input type="search" placeholder="search"
                  value={this.props.filterText}
                  onChange={this.handleChange.bind(this)} />;
  }
}; //...E.class SearchBar

//...새로운 propTypes 요건을 추가함.
SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
};

//...속성을 통해 contacts와 filterText를 받는 순수 컴포넌트임.
//...연락처를 필터링한 후 이를 표시함.
//...순수 컴포넌트라고 하는 이유는 동일한 contacts와 filterText
//...속성을 전달하면 동일한 내용을 표시하기 때문임.
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

/* contacts 데이터를 contacts.json 파일로 이동함.*/
//...이제 ContactsApp 이 아닌 ContactsAppContainer 를 렌더링함.
render(<ContactsAppContainer />,
       document.getElementById('root'));
