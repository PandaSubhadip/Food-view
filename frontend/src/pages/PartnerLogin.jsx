import React from 'react';
import { useNavigate, useLocation, Link ,} from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';
import { useState } from 'react';


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

const PartnerLogin = ()=>{
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
        const response = await  axios.post('http://localhost:3000/api/v1/foodlogin', userData,{
          withCredentials: true
        })
        .then((response) => {
          console.log('Registration successful:', response.data);
          navigate('/FoodUploder');
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
        <h2>Food Partner Login</h2>
        <p className="help">Partner sign in</p>
        <div className="form-field">
          <label>Partner Email</label>
          <input type="email" name="email" placeholder="partner@example.com"
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
          <button className="button">Cancel</button>
        </div>
        <div className="help">New partner? <Link className="small-link" to="/food-partner-register">Register</Link></div>
      </div>
    </form>
  )
}
export default PartnerLogin;