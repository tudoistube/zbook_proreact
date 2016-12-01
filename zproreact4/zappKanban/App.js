/*...15~16p.
컴포넌트 조합과 속성.
	부모 컴포넌트에서 자식 컴포넌트로 속성 데이터를 전달하고,
  속성은 자식 컴포넌트 안에서	변경할 수 없고,
  부모 컴포넌트가 전달하고 소유함.
*/
import React, { Component } from 'react';
import {render} from 'react-dom';

import KanbanBoardContainer from './KanbanBoardContainer';

/*.XXX.
let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should **make** my app after following the whole book",
    color: "#BD8D31", //...52p.
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description: "**Repeat** Coding along with the samples in the book",
    color: "#3A7E28", //...52p.
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "ContactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  },
  {
    id: 3,
    title: "Make KanbanBoard Example",
    description: "**Practise** a sample source",
    color: "#3A7E28", //...52p.
    status: "done",
    tasks: []
  }
];

render(<KanbanBoard cards={cardsList} />
     , document.getElementById('zroot'));
...before/after : KanbanBoardContainer 사용.*/

render(<KanbanBoardContainer />
     , document.getElementById('zroot'));
