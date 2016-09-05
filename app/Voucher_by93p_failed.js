//...91~93p.
/*
실행> npm install --save babel-polyfill
*/
import React, { Component } from 'react';
import { render } from 'react-dom';

class Voucher extends Component {

  constructor(){
    super(...arguments);
    this.state={
      passengers: [
      	'Simon, Robert A.',
      	'tAYLOR, Kathleen R.'
      ],
      ticket: {
      	company: 'Singapore Aireline',
      	flightNo: '0990',
      	departure: {
      		airport: 'SEL',
      		time: '2016-08-19T10:00:00.000Z'
      	},
      	arrival: {
      		airport: 'SIN',
      		time: '2016-08-19T14:00:00.000Z'
      	},
      	codeshare:[
      		{company: 'GL', flightNo: '9690'},
      		{company: 'ML', flightNo: '5610'}
      	]
      }
    }
  }

  render(){
    /*
    ...방법1. updatedPassengers 는 concat() 에서 반환하는 새로운 배열임.*/
    let updatedPassengers = this.state.passengers.concat('New Passenger C.');
    return ( this.setState({passengers: updatedPassengers}) );

    /*
    ...방법2. updatedTicket 은 this.state.ticket 의 원래 속성과 새로운
    flightNo 를 병합한 새로운 객체임.

    let updatedTicket = Object.assign({},
                                      this.state.ticket,
                                      {'New Passenger C.'});
    return ( this.setState({ticket: updatedTicket}) );*/
  }


};//...E.class Voucher


render(<Voucher />,
       document.getElementById('root'));
