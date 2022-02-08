import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

import { green, grey } from '@mui/material/colors';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: '', // auto-gen from main if blank
      main: '#1ad1ff',
      // dark: '', // auto-gen from main if blank
      // contrastText: '#fff',
    },
    secondary: {
      // light: '#598e89', // auto-gen from main if blank
      main: '#F26142',
      // dark: '#99d5cf', // auto-gen from main if blank
      // contrastText: '#000',
    },
    success: {
      // light: '#598e89', // auto-gen from main if blank
      main: green[300],
      // dark: '#99d5cf', // auto-gen from main if blank
      // contrastText: '#000',
    },
    info: {
      // light: '#598e89', // auto-gen from main if blank
      main: '#2C373A',
      // dark: '#99d5cf', // auto-gen from main if blank
      // contrastText: '#000',
    },
    warning: {
      // light: '#598e89', // auto-gen from main if blank
      main: '#666699',
      // dark: '#99d5cf', // auto-gen from main if blank
      // contrastText: '#000',
    },
    error: {
      // light: '#598e89', // auto-gen from main if blank
      main: '#666699',
      // dark: '#99d5cf', // auto-gen from main if blank
      // contrastText: '#000',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
