import React from 'react';
import './Todo.css';

function Todo({ title, description, dueDate }) {
  return (
    <div className="todo-item">
      <h3 className="todo-title">{title}</h3>
      <p className="todo-description">{description}</p>
      <p className="todo-due-date">Due date: {dueDate}</p>
    </div>
  );
}

export default Todo;
