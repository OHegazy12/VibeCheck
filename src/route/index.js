import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from '../screens/Auth/Signin';
import Signup from '../screens/Auth/Signup';


function Router() {
  return (
    <BrowserRouter>
    <Routes>
          <Route index path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />       
        
    </Routes>    
    </BrowserRouter>
    
  )
}

export default Router