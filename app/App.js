import React from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard';

let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should **repeat** the **whole** book",
    color: "#BD8D31",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code 012345678901234567890",
    description: "**Code along** with the samples in the book",
    color: "#3A7E28",
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
  }
];

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));
