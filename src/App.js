import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Firebase
import firebase from 'firebase/app';
import { config } from './util/config';
import 'firebase/firestore';
import 'firebase/auth';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';


// Util
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';

// MUI Components
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components

// Pages

import SlydroLogo from './icons/SlydroLogo';

axios.defaults.baseURL = "https://us-central1-slydro-2327.cloudfunctions.net/api";

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <div className="App">
      <div className="splash">
      <h1>SLYDRO</h1>
      <h2>COMING SOON</h2>
      <SlydroLogo className="slydro-logo"/>
      </div>
    </div>
  );
}

export default App;
