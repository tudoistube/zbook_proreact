//...210p.
//...카드 ID 를 이용해 카드 정보를 필터링하고 사용자가 편집하려는 값으로 초안 카드의
//...상태를 설정할 수 있음.
import React,{Component, PropTypes} from 'react';
import CardForm from './CardForm';
// Polyfills
import 'babel-polyfill';

class EditCard extends Component{

  componentWillMount(){
    let card = this.props.cards.find((card)=>card.id == this.props.params.card_id);
    this.setState(Object.assign({},card));
  }

  handleChange(field, value){
    this.setState({[field]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null,'/');
  }

  handleClose(e){
    this.props.history.pushState(null,'/');
  }

  render(){
    return (
      <CardForm draftCard={this.state}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
    )
  }
}

EditCard.propTypes = {
  cardCallbacks: PropTypes.object,
}


export default EditCard;
