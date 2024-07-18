import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaMicrosoft } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';

import AuthButton from '../../components/common/auth-button/AuthButton';
import Input from '../../components/common/input/Input';
import Button from '../../components/common/button/Button';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const userId = localStorage.getItem('userId');
    if (!accessToken) {
      navigate('/signup');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const requestUrl = `http://localhost:3001/api/v1/user`;
      const requestBody = { username, password };
      const requestHeader = { headers: { 'Content-Type': 'application/json' }};
      const user = await axios.post(requestUrl, requestBody, requestHeader);
      alert('Registration successful, Please sign in to access the Todo Application.');
      navigate('/signin');
    } catch (err) {
      setError('Error occurred while signing up. Please try again.');
      console.error('Error: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='signup-page'>
      <img src='/logo.png' className='signup-image' alt='Logo' />

      <div className='signup-form'>
        <h1 className='form-title'>Create an account</h1>

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
          Already have an account? <a className='form-anchor' onClick={() => navigate('/signin')}>Login</a>
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

export default Signup;
