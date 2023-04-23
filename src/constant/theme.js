import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
const theme = {
    primaryColor:'#DAF7A6', 
    secondaryColor:'#FFC300',
    whiteColor:'#FFFFFF',
    grayColor:'#CCCCCC',
    blackColor: '#000000'
}
const THEME = createTheme({
    palette:{
        primary:{main: theme.primaryColor},
        secondary:{main: theme.secondaryColor},
        info:{main: theme.whiteColor},
        dark:{main: theme.blackColor }
    },
    typography:{
        h3: { 
            color: theme.whiteColor
        }
    },
    components:{
        MuiFormLabel:{
            styleOverrides:{root:{
                color: theme.whiteColor
            }}
        }        
    }
})

function useTheme() {

  return theme
}
export function MuiThemeProvider({children}) {

    return (
        <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    )
  }

export default useTheme