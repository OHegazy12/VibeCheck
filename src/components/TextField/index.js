import { TextField } from '@mui/material'
import React from 'react'

function MuiTextField({label, onChange, variant}) {
  return (
    <TextField label={label} variant={variant} onChange={onChange} />
  )
}

export default MuiTextField