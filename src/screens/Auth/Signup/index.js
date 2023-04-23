import React, { useState } from 'react'
import './style.css'
import MuiButton from '../../../components/Button'
import { Typography } from '@mui/material'
import MuiTextField from '../../../components/TextField'

function Signup() {
  const [userName, setUserName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const handleSignUp = () => {
    console.log(" user name: " + userName)
    console.log(" email: " + email)
    console.log(" password: " + password)
   }
  return (
    <div className="signupContainer" >
      <div className="signupBox" >
      <Typography variant="h3"  >Sign Up</Typography>
      
      <div className="signUpInputBox">
      <MuiTextField label="user name" variant= "outlined" color='info' type= "text" onChange= {(event) => setUserName(event.target.value)} value={userName} />
        <MuiTextField label="email" variant= "outlined" color='info' type= "email" onChange= {(event) => setEmail(event.target.value)} value={email} />
        <MuiTextField label="password" variant= "outlined" color='info' type= "password" onChange= {(event) => setPassword(event.target.value)} value={password} />
      </div>
      {/* <div className="signUpbuttonBox">
        
      </div> */}
    <MuiButton  label="Sign up" onClick={handleSignUp} variant="contained" color='info' fullWidth href="/ProfileCreation" />   
    

      </div>      
    </div>
  )
}

export default Signup