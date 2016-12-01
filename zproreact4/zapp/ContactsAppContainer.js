import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import 'whatwg-fetch';

class ContactsAppContainer extends Component{

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

}

class ContactsApp extends Component{

  //...S.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.
  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }
  //...E.79p.상태는 컴포넌트의 생성자에 정의된 기본값에서 시작함.

  /*...S.81p.filterText 상태를 변경하는 로컬함수.
  이 함수를 속성을 통해 SearchBar 컴포넌트에 전달함.*/
  handleUserInput(searchTerm){
    this.setState({filterText: searchTerm})
  }
  /*...E.81p.filterText 상태를 변경하는 로컬함수*/

  render(){
    return(
      <div>
{/*.XXX.
        <SearchBar />
...before/after :*/}
        <SearchBar filterText={this.state.filterText}
/*...81p.속성을 통해 콜백을 받고, 입력필드의 onChange 이벤트에 반응해
콜백을 호출함. */
                      onUserInput={this.handleUserInput.bind(this)}/>
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
      </div>
    );
  }
}//...E.class ContactsApp.

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

//...사용자가 검색 폼을 수정할 때 마다 사용자 입력을 반영해 상태를 업데이트해야 함.
//...SearchBar 컴포넌트는 속성을 통해 콜백을 받고 입력 필드의 onChange 이벤트에
//...반응해 콜백을 호출함.
//...부모에서 속성을 통해 filterText(문자열)와 onUserInput(콜백함수)을 받는
//...순수 컴포넌트.
//...검색 텍스트를 표시해야 함.
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

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
};

//...상태를 기준으로 연락처를 필터링해야 함.
class ContactList extends Component {

  render(){

    let filteredContacts = this.props.contacts.filter(
          (contact)=>contact.name.indexOf(this.props.filterText)!= -1);

    return (
             <ul>
{/*.XXX.
                {this.props.contacts.map(
...before/after : */}
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

/*.XXX.
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
...before/after : contacts.json 생성.*/
render(<ContactsAppContainer />,
       document.getElementById('zroot'));
