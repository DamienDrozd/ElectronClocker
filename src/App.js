import React from "react";
import { Main } from "./screens/main";
import { ThemeProvider } from 'styled-components';import { GlobalStyle } from "./config/globalStyles";

import { theme } from "./config/theme";

function App() {

 
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
  );
}

export default App;
