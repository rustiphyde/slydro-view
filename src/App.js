import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import logo from './images/logo.png'

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
import { logoutSlyder, getSlyderDetails } from './redux/actions/slyderActions';


// Util
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';

// MUI Components
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import login from './pages/login';
import signup from './pages/signup';
import reset from './pages/reset';
import home from './pages/home';

axios.defaults.baseURL = "https://us-central1-slydro-2327.cloudfunctions.net/api";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutSlyder());
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getSlyderDetails());
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
            <Navbar/>
              
            
            <div className="container">
            
            <hr className="bar-separator"/>

                <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                exact
                path="/login"
                component={login}
                />
                <AuthRoute
                exact
                path="/signup"
                component={signup}
                />
                <AuthRoute
                exact
                path="/reset"
                component={reset}
                />
                </Switch>
            </div>
            <hr className="bar-separator"/>
            <Footer />
            </BrowserRouter>
          </ReactReduxFirebaseProvider>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;
