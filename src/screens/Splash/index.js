import React, { useEffect } from 'react'
import './style.css'
import logo from '../../assets/logo.png'

function Splash() {
    useEffect(() => {
      setTimeout(() => {
        window.location.href="/Signin"
      }, 5000);
    
      
    }, [])
    

  return (
    <div className="splashContainer">
        {/* <div className="splashBox" > */}
            <img src={logo} alt="logo" height={400} width={250} />

    {/* </div> */}

    </div>
  )
}

export default Splash