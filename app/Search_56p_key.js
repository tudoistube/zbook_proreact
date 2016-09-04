//...56p.
import React, { Component } from 'react';
import {render} from 'react-dom';

class Search_56p_key extends Component {

	constructor(){
		super();
		this.state = {
			searchTerm : "JoyWins React"
		};
	}

	handleChange(event){
		//this.setState({searchTerm : event.target.value});
		//...사용자 입력을 10자로 제한할 수 있음.
		this.setState({searchTerm : event.target.value.substr(0, 10)});
	}

  render(){
    return (
      <div>
        Search Term :
        <input type="search" value={this.state.searchTerm}
        											onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

render(<Search_56p_key />, document.getElementById('root'));
