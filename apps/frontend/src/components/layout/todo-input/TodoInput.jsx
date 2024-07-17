import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { FaArrowUp } from 'react-icons/fa';
import './TodoInput.css';

function TodoInput() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { userId } = useParams();
  const accessToken = localStorage.getItem('access-token');

  const handleClick = async () => {
    if (!title) {
      alert('Please add title');
      return;
    }

    if (!description) {
      alert('Please fill the description');
      return;
    }

    if (!dueDate) {
      alert('Please select a due date for your todo');
      return;
    }

    await axios.post(`http://localhost:3001/api/v1/user/${userId}/todo`, {
      title,
      description,
      startDate: new Date(),
      dueDate,
    }, {
      headers: {
        Authorization: accessToken,
      },
    });

    setTitle('');
    setDescription('');
    setDueDate('');
  }

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
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
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
        <button className="todo-input-button" onClick={handleClick}><FaArrowUp /></button>
      </div>
    </div>
  );
}

export default TodoInput;
