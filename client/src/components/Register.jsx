import React, { useState } from 'react';
import './style/Register.css';
import email_logo from '../assets/email.png';
import person_logo from '../assets/person.png';
import password_logo from '../assets/password.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate('/login');
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/signUp', { username, email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        navigate('/login');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
      });
  };

  return (
    <>
      <div className='reg-container'>
        <div className='reg-header'>
          <div className='signup'>Sign Up</div>
          <div className='reg-underline'></div>
        </div>
        <form className='reg-inputs' onSubmit={handleOnSubmit}>
          <div className='reg-input'>
            <img src={person_logo} alt="User" />
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='reg-input'>
            <img src={email_logo} alt="Email" />
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='reg-input'>
            <img src={password_logo} alt="Password" />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <h6 className='error'>{error}</h6>}
          <div className="submit-container">
            <button type="submit" className='submit'>Sign Up</button>
            <button type="button" onClick={handleSubmit} className='submit'>Log In</button>
          </div>
        </form>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default Register;
