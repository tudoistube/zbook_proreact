import React, { Component } from 'react';
import { render } from 'react-dom';

class Voucher_91p extends Component {

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

    let updatedPassengers = this.state.passengers.concat('New Passenger C.');

    return ( this.setState({passengers: updatedPassengers}) );
  }


};//...E.class Voucher_91p


render(<Voucher_91p />,
       document.getElementById('root'));
