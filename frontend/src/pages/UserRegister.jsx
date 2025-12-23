import React, {  useState } from 'react';
import {  useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import '../styles/global.css';
import axios from 'axios';

const RoleSwitch = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const isPartner = loc.pathname.includes('partner');

  const btnStyle = (active) => ({
    padding: '8px 12px',
    borderRadius: 8,
    border: active ? 'none' : '1px solid rgba(15,23,42,0.06)',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'var(--accent-contrast)' : 'var(--text)',
    cursor: 'pointer',
    fontWeight: 600
  });

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <button style={btnStyle(!isPartner)} onClick={() => navigate('/user-register')}>User</button>
      <button style={btnStyle(isPartner)} onClick={() => navigate('/food-partner-register')}>Partner</button>
    </div>
  );
};

const UserRegister = () => {

  //  Hooks INSIDE component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({});
   const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password
    };
      const response = await axios.post('http://localhost:3000/api/v1/register', userData,{
        withCredentials: true
      })
      .then((response) => {
        console.log('Registration successful:', response.data);
         navigate('/');
      })
      .catch((error) => {
        console.error('There was an error registering!', error);
      });
    setData(userData);
    console.log(userData);
    setName('');
    setEmail('');
    setPassword('');
   
   
  };
    

  return (
    <form className="auth-page" onSubmit={SubmitForm}>
      <div className="card">
        <RoleSwitch />
        <h2>User Register</h2>
        <p className="help">Create a lightweight account</p>

        <div className="form-field">
          <label>Full name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="button button-primary">Register</button>
          <button type="reset" className="button">Clear</button>
        </div>

        <div className="help">
          Already have an account? <Link to="/user-login">Login</Link>
        </div>
      </div>
    </form>
  );
};

export default UserRegister;
