import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/global.css';
import { useState } from 'react';
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
    <div style={{display:'flex',gap:8,marginBottom:16}}>
      <button style={btnStyle(!isPartner)} onClick={()=>navigate('/user-login')}>User</button>
      <button style={btnStyle(isPartner)} onClick={()=>navigate('/food-partner-login')}>Partner</button>
    </div>
  )
}

const UserLogin = ()=>{


  
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
     const navigate = useNavigate();
    const SubmitForm = async (e) => {
    e.preventDefault();

    const userData = {
           email,
      password
    };
      const response = await  axios.post('http://localhost:3000/api/v1/login', userData,{
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
    
    setEmail('');
    setPassword('');
         

   
  };
   
  return (
    <form className="auth-page" onSubmit={SubmitForm }>
      <div className="card">
        <RoleSwitch />
        <h2>User Login</h2>
        <p className="help">Sign in to your account</p>
        <div className="form-field">
          <label>Email</label>
          <input type="email" name="email" placeholder="you@example.com" 
           value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" name="password" placeholder="••••••••"
           value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{display:'flex',gap:12,marginTop:8}}>
          <button className="button button-primary">Login</button>
          <button className="button" style={{background:'transparent',border:'1px solid rgba(15,23,42,0.06)'}}>Cancel</button>
        </div>
        <div className="help">Don't have an account? <Link className="small-link" to="/user-register">Register</Link></div>
      </div>
    </form>
  )
}
export default UserLogin;