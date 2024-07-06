import React from 'react';
import './AuthButton.css';

function AuthButton({ children, text}) {
  return (
    <div className='auth-wrapper'>
      <button className='auth-button'>
        {children}
        <span className='auth-label'>{text}</span>
      </button>
    </div>
  );
}

export default AuthButton;
