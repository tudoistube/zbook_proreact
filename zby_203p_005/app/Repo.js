import React, { Component } from 'react';
import 'babel-polyfill';

class RepoDetails extends Component {

  render() {
    var chapter = "Repo:-)";
    return ( <div>
              <h2>{chapter}</h2>
              <h2>userName : {this.props.params.userName}</h2>
              <h2>repoName : {this.props.params.repoName}</h2>
            </div> );
  }
}

export default RepoDetails;
