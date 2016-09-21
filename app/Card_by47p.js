//...43~47p.
import React, {Component} from 'react';
import CheckList from './CheckList';
/*%%% import marked from 'marked'; %%%*/

class Card extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    };

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render() {
        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = (
              <div className = "card__details" >
              {/*%%%
                dangerouslySetInnerHTML 속성을 사용해서 동적으로 생성한 HTML 을 랜더링함.*-/}
                <span	dangerouslySetInnerHTML={
                      {__html: marked(this.props.description)}	} />
                %%%*/}
                {this.props.description}
                <CheckList cardId = {this.props.id}
                           tasks = {this.props.tasks}/>
              </div>
            );
        }

        /*%%%
        let sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: this.props.color
        };
        %%%*/


        return (
          <div className = "card" >
            { /*%%% <div style={sideColor}/> %%%*/ }
            { /*...조건에 따라 카드 제목에 className을 추가하는 삼항식을 넣음.*/ }
            <div className = {this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
                 onClick = {this.toggleDetails.bind(this)} >
                 {this.props.title}
            </div>
              {cardDetails}
            </div>
        );
    }
}

export default Card;
