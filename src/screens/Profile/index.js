import React from 'react'
import MuiAppBar from '../../components/AppBar'
import './style.css'
import { Avatar, Typography } from '@mui/material'
import RobertPicture from '../../assets/profilepicture/image1.jpg'

function Profile() {
  return (
    <div className="profileContainer">
      <MuiAppBar />
      <div className="ProfileScreen" >
        <div className="ProfileBox" >
          <Avatar alt="Robert" src={RobertPicture} sx={{ width: 100, height: 100 }} />
          <div className="ProfileDetails">
            <div className="ProfileInfo" >
            <Typography variant='h5'>Robert Downey Jr</Typography>
            <Typography variant='body1'>New York, New York</Typography>

            </div>
            <div className="ProfileReach" >
            <div className="ProfileInfo" >
            <Typography variant='h6'>Posts</Typography>
            <Typography variant='subtitle2'>100</Typography>

            </div>
            <div className="ProfileInfo" >
            <Typography variant='h6'>Followings</Typography>
            <Typography variant='subtitle2'>3k</Typography>

            </div>
            <div className="ProfileInfo" >
            <Typography variant='h6'>Followers</Typography>
            <Typography variant='subtitle2'>6.5k</Typography>

            </div>
            </div>
          </div>
          </div>
      </div>
      </div>
  )
}

export default Profile