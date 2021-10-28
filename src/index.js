import React from "react";
import GlobalStyle from "./globalStyles";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import AuthProvider from "./context/AuthContext";
import MovieProvider from "./context/MovieContext";

import "normalize.css";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MovieProvider>
          <Routes />
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
