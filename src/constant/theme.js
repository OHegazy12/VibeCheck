import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
const theme = {
  primaryColor: "#DAF7A6",
  secondaryColor: "#FFC300",
  whiteColor: "#FFFFFF",
  grayColor: "#CCCCCC",
  blackColor: "#000000",
  customeSuccessColor: "#86d28a",
};
const THEME = createTheme({
  palette: {
    primary: { main: theme.primaryColor },
    secondary: { main: theme.secondaryColor },
    light: {
      main: theme.whiteColor,
      light: theme.whiteColor,
      contrastText: theme.grayColor,
      dark: theme.whiteColor,
    },
    dark: { main: theme.blackColor },
    success: {
      main: theme.customeSuccessColor,
    },
  },
  typography: {
    h3: {
      color: theme.whiteColor,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          // color: theme.whiteColor
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: theme.grayColor,
          },
          ".MuiInputLabel-outlined": {
            color: theme.grayColor,
          },
        },
      },
    },
  },
});

function useTheme() {
  return theme;
}
export function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}

export default useTheme;
