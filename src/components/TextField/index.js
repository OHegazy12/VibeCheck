import { TextField } from '@mui/material'
import React from 'react'

function MuiTextField({...rest}) {
  return (
    <TextField {...rest} />
  )
}

export default MuiTextField