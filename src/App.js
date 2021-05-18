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

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    // store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    // store.dispatch(getUserDetails());
  }
} 

firebase.initializeApp(config);
firebase.firestore();

const rrfConfig = {
  userProfile: 'Slyders',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
            <div className="container">
                
            </div>
            </BrowserRouter>
          </ReactReduxFirebaseProvider>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;
