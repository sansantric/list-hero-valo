import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material";
import Anta from './Anta-Regular.ttf'
const theme = createTheme({
  typography: {    
    fontFamily: "Anta, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Anta';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Anta'), local('Anta-Regular'), url(${Anta}) format('ttf');
        }
      `,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
