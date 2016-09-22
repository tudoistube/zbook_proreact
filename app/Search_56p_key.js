/*
...56p.2nd.
사용자가 값을 변경할 수 있게 하기 위해 컴포넌트 상태로 처리해야 함.
생성자에서 상태값을 설정하고, input 태그의 값에 생성자의 상태값을 담아서 값을 표현함.
input 태그의 값을 바꿀 때는 이벤트의 메서드를 this 에 바인딩시킴.

이 방법은 다음과 같은 장점이 있음.
	리액트가 컴포넌트를 다루는 방법을 준수함.
	상태가 인터페이스 바깥의 자바스크립트 코드에서 완전히 관리됨.
	이 패턴은 사용자 상호작용에 반응하거나 유효성을 검사하는 인터페이스를 구현하는데
	유리함(예. 사용자 입력을 10자로 제한할 수 있음).
*/
import React, { Component } from 'react';
import {render} from 'react-dom';

class Search_56p_key extends Component {

	constructor(){
		super();
		this.state = {
			searchTerm : "JoyWins React..."
		};
	}

	handleChange(event){
		//this.setState({searchTerm : event.target.value});
		//...사용자 입력을 20자로 제한할 수 있음.
		this.setState({searchTerm : event.target.value.substr(0, 20)});
	}

  render(){
    return (
      <div>
        Search Term :
			  {/*XXX
        <input type="search" value= "React" />
				XXX*/}
        <input type="search" value={this.state.searchTerm}
                             onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

render(<Search_56p_key />, document.getElementById('root'));
