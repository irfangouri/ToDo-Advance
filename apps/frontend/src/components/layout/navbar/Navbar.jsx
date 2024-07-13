import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    navigate('/signin');
  }

  return (
    <div className='navbar'>
      <h1 className='navbar-header'>ToDo-Advance</h1>
      <button className='navbar-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
