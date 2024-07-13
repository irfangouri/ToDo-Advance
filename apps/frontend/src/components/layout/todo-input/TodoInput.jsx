import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './TodoInput.css';

function TodoInput() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="todo-input-container">
      <div className="todo-input-row">
        <input
          className="todo-input-title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="todo-input-date"
          type="date"
          placeholder="Enter Due Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="todo-input-row">
        <input
          className="todo-input-description"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="todo-input-button"><FaArrowUp /></button>
      </div>
    </div>
  );
}

export default TodoInput;
