import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from '../screens/Auth/Signin';
import Signup from '../screens/Auth/Signup';
import ProfileCreation from '../screens/Auth/ProfileCreation';
import Splash from '../screens/Splash';
import Profile from '../screens/Profile';
import Dating from '../screens/Dating';
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Notifications from '../screens/Notifications';


function Router() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index path="/" element={<Splash />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />       
          <Route path="/ProfileCreation" element={<ProfileCreation />} /> 
          <Route path="/Profile" element={<Profile />} /> 
          <Route path="/Dating" element={<Dating />} /> 
          <Route path="/Home" element={<Home />} /> 
          <Route path="/Notifications" element={<Notifications />} /> 
          <Route path="/Messages" element={<Messages />} /> 

    </Routes>    
    </BrowserRouter>
    
  )
}

export default Router