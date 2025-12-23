import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/global.css';

import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import PartnerLogin from '../pages/PartnerLogin';
import PartnerRegister from '../pages/PartnerRegister';
import Home from '../pages/Home';
import FoodUploder from '../pages/FoodUploder';
import Profile from '../Utils/Profile';

const UserRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/user-login" element={<UserLogin/>} />
            <Route path="/user-register" element={<UserRegister/>} />
            <Route path="/food-partner-login" element={<PartnerLogin/>} />
            <Route path="/food-partner-register" element={<PartnerRegister/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/FoodUploder" element={<FoodUploder/>} />
             <Route path="/Utils/:id" element={<Profile/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default UserRoutes