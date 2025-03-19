import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/Register.css';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <div className='reg-container'>
        <div className='reg-header'>
          <div className='signup'>Login</div>
          <div className='reg-underline'></div>
        </div>
        <form className='reg-inputs' onSubmit={handleLogin}>
          <div className='reg-input'>
            <img src={email_logo} alt="Email Icon" />
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='reg-input'>
            <img src={password_logo} alt="Password Icon" />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <h6 className='error'>{error}</h6>}
          <div className="forgot-password">
            Lost Password? <span>Click Here!</span>
          </div>
          <div className="submit-container">
            <button type="submit" className='submit'>
              LogIn
            </button>
            <button type="button" onClick={() => navigate('/register')} className='submit'>
              SignUp
            </button>

          </div>
        </form>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default Login;
