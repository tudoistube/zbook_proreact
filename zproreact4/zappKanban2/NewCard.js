//...208p.
import React,{Component, PropTypes} from 'react';
import CardForm from './CardForm'

class NewCard extends Component{

  //...컴포넌트는 마운팅될 때 기본값이 설정됨.
  componentWillMount(){
    this.setState({
      id: Date.now(),
      title:'',
      description:'',
      status:'todo',
      color:'#c9c9c9',
      tasks:[]
    });
  }

  handleChange(field, value){
    this.setState({[field]: value});
  }

  //...양식을 제출하면 KanbanBoardContainer 로 부터 속성을 통해 전달된
  //...cardCallbacks.addCard() 를 호출해 새로운 카드를 저장함.
  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.pushState(null,'/');
  }

  handleClose(e){
    this.props.history.pushState(null,'/');
  }

  render(){
    return (
      <CardForm draftCard={this.state}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
    );
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object,
};


export default NewCard;
