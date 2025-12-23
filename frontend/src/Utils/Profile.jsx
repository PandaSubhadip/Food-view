import React from 'react'
import './Profile.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { data, useParams } from 'react-router-dom';

// const sampleTiles = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }))

const Profile = () => {
  const { id } = useParams();
  console.log(id);
  const [profile , setProfile]=useState( []);
  const [video , setVideo]=useState([]);

 useEffect(() => {
 const response =  axios.get(` http://localhost:3000/api/v1/foodpartner/${id}`, {
    withCredentials: true
  })
 

  .then((response) => {
    const partner = response.data.foodPartner;
    setProfile(partner);
    setVideo(partner.foodUploads || []);
  })
  .catch((error) => {
    console.error(error);
  });
}, [id]);

 
  




  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-top">
          <img className="avatar-img avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar"  />
          
          <div className="business-block">
            <div className="business-name">{profile.name }</div>
            <div className="address">Address</div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-value">{video.length}</div>
            <div className="stat-label">total meals</div>
          </div>
          <div className="divider" />
          <div className="stat">
            <div className="stat-value">15K</div>
            <div className="stat-label">customer serve</div>
          </div>
        </div>
      </section>

      <section className="video-grid">
        {video.map((tile) => (
          
          <div className="video-tile" key={tile._id}>
            <div className="video-placeholder">
              <video src={tile.video} />
             </div>
             
        
          </div>
        ))}
      </section>
    </div>
  )
}

export default Profile