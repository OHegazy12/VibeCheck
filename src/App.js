import React from 'react'
import Router from './route'
import { MuiThemeProvider } from './constant/theme'

function App() {
  return (
    <MuiThemeProvider><Router /></MuiThemeProvider>
  )
}

export default App