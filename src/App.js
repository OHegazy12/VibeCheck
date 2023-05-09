import React from "react";
import Router from "./route";
import { MuiThemeProvider } from "./constant/theme";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <MuiThemeProvider>
        <Router />
      </MuiThemeProvider>
    </ContextProvider>
  );
}

export default App;
