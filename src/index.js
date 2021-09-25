import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

ReactDom.render(
  <BrowserRouter>
    <ToastContainer autoClose={3000} />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
