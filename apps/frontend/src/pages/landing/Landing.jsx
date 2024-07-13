import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navbar/Navbar.jsx';
import TodoInput from '../../components/layout/todo-input/TodoInput.jsx';

function Landing() {
  const navigate = useNavigate();

  const checkAcessToken = () => {
    const accessToken = localStorage.getItem('access-token');
    const userId = localStorage.getItem('userId');
    if (!accessToken) {
      navigate('/signup');
    } else {
      navigate(`/user/${userId}`);
    }
  }

  useEffect(() => {
    checkAcessToken();
    const interval = setInterval(checkAcessToken, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <TodoInput />
    </div>
  );
}

export default Landing;
