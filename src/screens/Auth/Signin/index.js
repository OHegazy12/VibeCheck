import React from 'react'
import './style.css'
import MuiButton from '../../../components/Button'
import useTheme from '../../../constant/theme'
import { Typography } from '@mui/material'

function Signin() {

    const theme = useTheme()

  return (
    <div className="signinContainer" >
      <div className="siginBox" >
      <Typography variant="h3">Signin</Typography>
      <div className="buttonBox">
    <MuiButton label="Sign in" variant="contained" color='primary'/>
    <MuiButton label="Sign up" variant="text" color='secondary' />
        
      </div>
      
    

      </div>      
    </div>
  )
}

export default Signin