//...91p.
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update';

class Ticket extends Component {
  constructor(){
    super();
    this.state={
        passengers:[
          'Simon, Robert A',
          'Taylor, Kathleen R'
        ],
        ticket: {
          company: 'Delta',
          flightNo: '0990',
          departure: {
            airport: 'LAS',
            time: '2016-08-21T10:00:00.000Z'
          },
          arrival: {
            airport: 'MIA',
            time: '2016-08-21T14:41:00.000Z'
          },
          codeshare:[
            {company: 'GL', flightNo: '9840'},
            {company: 'TM', flightNo: '5010'}
          ]
        }
    };
  }

  render(){
    let updatedPassengers = this.state.passengers.concat('New Passenger C.');

    return ( this.setState({passengers: updatedPassengers}) );
  }

}


/*
...92p.1. passengers 배열에 승객 1명 추가.
방법1. 배열 메서드 사용(참조 객체 역시 원본이라는 문제점 있음).
	문제는 자바스크립트에서 객체와 배열은 참조로 전달된다는 점으로 인해
	배열 메서드 push() 를 이용하면 내부 상태를 직접 변경함.
	let updatedPassengers1 = this.state.passengers;
	updatedPassengers1.push('Mr.New, Vincent M.');
	this.setState({passengers: updatedPassengers1});

방법2. 비파괴 메서드 이용.
	자바스크립트에서 실제 배열의 복사본을 만들려면 원래 배열을 변경하는 대신
	원하는 변경이 적용된 배열을 반환하는 비파괴 메서드를 이용해야 함.
	▷updatedPassengers2 는 concat 에서 반환하는 새로운 배열임.
	let updatedPassengers2 = this.state.passengers.concat('Mr.New, Vincent M.');
	this.setState({passengers: updatedPassengers2});

방법3. 대안 : Object.assign() 이용.
	Object.assign() 등을 이용해 변경이 적용된 객체를 새로 생성함.
	Object.assign() 은 지정한 객체의 모든 속성을 대상 객체로 병합함.
	Object.assign(target, source_1, …, source_n);
	먼저 source_1의 모든 열거 가능 속성을 대상으로 복사한 후 source_2 로 진행해
	같은 작업을 함.
	▷updatedTicket1 은 this.state.ticket 의 원래 속성과 새로운 flightNo 를 병합한
	새로운 객체임.
	let updatedTicket1 = Object.assign({},
												 this.state.ticket, {flightNo: '1010'});
	this.setState({ticket: updatedTicket1});

*/

/*
...96p.2.도착정보(arrival)를 변경하고 객체를 새로 만들기.
	react-addons-update 에서 변경할 사항을 지정하고 중첩된 객체를 객체의 이름과
	함께 유지하면 됨.
*/
let originalTicket = {
          company: 'Delta',
          flightNo: '0990',
          departure: {
            airport: 'LAS',
            time: '2016-08-21T10:00:00.000Z'
          },
          arrival: {
            airport: 'MIA',
            time: '2016-08-21T14:41:00.000Z'
          },
          codeshare:[
            {company: 'GL', flightNo: '9840'},
            {company: 'TM', flightNo: '5010'}
          ]
}

/*...97p.이제 originalTicket 과 newTicket 의 arrival 은 동일한 객체를 공유하지 않음. */
let newTicket = update(originalTicket,
								{
									{arriaval: {$set: 'MCO'}}
								}
							);

/*
...97p.배열인덱스.
	배열인덱스를 이용해 변경할 위치를 찾을 수 있음.
	첫번째 codeshare 객체(0번 인덱스에 있는 배열 요소)를 변경하는 것은 다음과 같음.
*/
let newTicket2 = update(originalTicket,
								{
									codeshare: {
										0: {$set: {company: 'AZ', flightNo: '7320'}}
									}
								});
