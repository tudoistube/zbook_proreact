import React, {Component} from 'react';
import {render} from 'react-dom';

class Search_56p_key extends Component{

  constructor(){
    super();
    this.state = {
      searchTerm: "JoyWins React"
    };
  }

  handleChange(event){
    /*.XXX.
    this.setState({searchTerm: event.target.value});
    ...before/after : */
    this.setState({searchTerm: event.target.value.substr(0,20)});
  }



  render(){
    return(
      <div>
        Search Term :
{/*.XXX.
        <input type="search" value="React" />
...before/after : */}
        <input type="search" value={this.state.searchTerm}
                             onChange={this.handleChange.bind(this)}/>
         <Zform />
      </div>
    );
  };
}

class Zform extends Component{

  handleSubmit(event){
    console.log("Submitted values are :",
                event.target.name.value,
                event.target.email.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="formGroup">
            Name : <input name="name"type="text" />
          </div>
          <div className="formGroup">
            Email : <input name="email"type="mail" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

render (<Search_56p_key />, document.getElementById('zroot'));
