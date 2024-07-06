import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAcessToken = () => {
      const accessToken = localStorage.getItem('access-token');
      if (!accessToken) {
        navigate('/signup');
      } else {
        navigate('/user');
      }
    }

    checkAcessToken();

    const interval = setInterval(checkAcessToken, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div>
      Hello world from landing!!!
    </div>
  );
}

export default Landing;
