import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';

import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaMicrosoft } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';

import AuthButton from '../../components/common/auth-button/AuthButton';
import Input from '../../components/common/input/Input';
import Button from '../../components/common/button/Button';

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const userId = localStorage.getItem('userId');
    if (!accessToken) {
      navigate('/signin');
    } else {
      navigate(`/user/${userId}`);
    }
  }, []);

  const validateForm = () => {
    if (!username || !password) {
      setError('Please fill all the fields');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const requestUrl = `http://localhost:3001/api/v1/user/access-token`;
      const requestBody = { username, password };
      const requestHeader = { headers: { 'Content-Type': 'application/json' }};
      const user = await axios.post(requestUrl, requestBody, requestHeader);
      localStorage.setItem('access-token', user.data.accessToken.accessToken);
      localStorage.setItem('userId', user.data.id);
      setTimeout(() => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('userId');
      }, 24 * 60 * 60 * 1000);
      navigate(`/user/${user.id}`);
    } catch (err) {
      setError('Error occurred while signing up. Please try again.');
      console.log('Error: ', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='signin-page'>
      <img src='/logo.png' className='signin-image' alt='Logo' />

      <div className='signin-form'>
        <h1 className='form-title'>Welcome Back</h1>

        {error && <p className='error-paragraph'> <IoIosInformationCircleOutline size={17} /> &nbsp; {error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='Email address'
            value={username}
            setValue={setUsername}
          />
          <Input
            type='password'
            label='Password'
            value={password}
            setValue={setPassword}
          />
          <Button
            text={isLoading ? 'Loading...' : 'Continue'}
            handleClick={handleSubmit}
            disabled={isLoading}
          />
        </form>

        <p className='form-text'>
          Don't have an account? <a className='form-anchor' onClick={() => navigate('/signup')}>Sign Up</a>
        </p>
        <div className='form-divider-wrapper'>
          <span>Or</span>
        </div>

        <AuthButton text='Continue with Google'>
          <FcGoogle size={17} className='auth-icon' />
        </AuthButton>
        <AuthButton text='Continue with Microsoft Account'>
          <FaMicrosoft size={17} className='auth-icon' />
        </AuthButton>
        <AuthButton text='Continue with Apple'>
          <FaApple size={17} className='auth-icon' />
        </AuthButton>
      </div>
    </div>
  );
}

export default Signin;
