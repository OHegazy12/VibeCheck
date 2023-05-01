import React from 'react'
import './style.css'
import { Avatar, Typography } from '@mui/material'

function ProfileDetails({avatar, userName, location, numberOfPost, numberOfFollowings, numberOfFollowers}) {
  return (
    <div className="ProfileBox" >
          <Avatar alt="ProfilePicture" src={avatar} sx={{ width: 100, height: 100 }} />
          <div className="ProfileDetails">
            <div className="ProfileInfo" >
            <Typography variant='h5'>{userName}</Typography>
            <Typography variant='body1'>{location}</Typography>

            </div>
            <div className="ProfileReach" >
            <div className="ProfileInfo" >
            <Typography variant='h6'>Posts</Typography>
            <Typography variant='subtitle2'>{numberOfPost}</Typography>

            </div>
            <div className="ProfileInfo" >
            <Typography variant='h6'>Followings</Typography>
            <Typography variant='subtitle2'>{numberOfFollowings}</Typography>

            </div>
            <div className="ProfileInfo" >
            <Typography variant='h6'>Followers</Typography>
            <Typography variant='subtitle2'>{numberOfFollowers}</Typography>

            </div>
            </div>
          </div>
          </div>
  )
}

export default ProfileDetails