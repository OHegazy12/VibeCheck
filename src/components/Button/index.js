import { Button } from '@mui/material'
import React from 'react'

function MuiButton({ label, variant,onClick,color }) { 
  // console.log(props)
  // const { label, variant } = props

  // var means variable
  // const means constant
  // var variableName = variableValue (i.e. a variable itself or a string value)
  //var text = "ABC"

  // Button is tag here
  // onClick= is an attribute of a button
  // ={click} is a value to that attribute
  // <Button onClick={click} />

  // function get initiated when function get call
  // Button is the name of function
  // (arg) is an argument to that function
  //function Button(arg) {}

  return (
    <Button variant={variant} onClick={onClick} color={color} >{label}</Button>
  )
}

export default MuiButton