import React from 'react';
import './Button.css';

function Button({ text, handleClick }) {
  return (
    <div>
      <button className='form-button' onClick={handleClick}>{text}</button>
    </div>
  );
}

export default Button;
