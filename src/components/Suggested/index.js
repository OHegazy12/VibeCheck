import React, { useState } from 'react'
import './style.css'
import { Avatar, IconButton, Typography } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'
import MuiButton from '../Button'

function Suggested({SuggestedPeopleData}) {
    const [more, setMore] = useState(3)
  return (
    <div className='SuggestedPeople'>
    <Typography variant='h5' fontWeight={700} marginBottom={2} >People you may known</Typography>
    {
      SuggestedPeopleData.slice(0, more).map(data => {
        return (
          <div className="UserInformation">

        <Avatar alt="ProfilePicture" src={data.avatar} sx={{ width: 65, height: 65 }} />
          <div className="UserInformationDetail">
          <Typography variant='subtitle1'>{data.name}</Typography>
        <Typography variant='subtitle2' fontSize={12} color="#cccccc" fontWeight={300} >{data.location}</Typography>
          </div>
          <IconButton color="dark" >
            <PersonAdd/>
          </IconButton>
        </div>
        )
      })
    }      
      {SuggestedPeopleData.length > more && <MuiButton label="see more" variant="dark" onClick={()=> setMore(more + 3)} />}

    </div>
  )
}

export default Suggested