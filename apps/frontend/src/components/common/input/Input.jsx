import React from 'react';
import './Input.css';

function Input({ type, label, value, setValue }) {
  return (
    <div class="input-container">
      <input
        type={type}
        id={label}
        placeholder=""
        value={value}
        onChange={(e) => 
          setValue(e.target.value)
        }
        className='input'
        required
      />

      <label for={label} className='input-label'>
        {label}*
      </label>
    </div>
  );
}

export default Input;
