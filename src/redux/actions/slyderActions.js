import {
    SET_ERRORS,
    SET_SLYDER,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_SLYDER,
    SET_SUCCESS,
    CLEAR_SUCCESS,
    MARK_ALERTS_READ
  } from "../types";

  import adminUser from '../../util/adminUser';

  import axios from "axios";

  export const loginSlyder = (slyderData, history) => (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOADING_UI });
    const firebase = getFirebase();
    firebase.login({ email: adminUser.email, password: adminUser.password });
    axios
      .post("/login", slyderData)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getSlyderDetails());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/home");
      })
      .catch(err => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const logoutSlyder = () => dispatch => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = "/login";
  };

  export const signupSlyder = (newSlyderData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/signup", newSlyderData)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getSlyderDetails());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      })
      .catch(err => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const getSlyderDetails = () => dispatch => {
    dispatch({ type: LOADING_SLYDER })
    axios
      .get("/slyder")
      .then(res => {
        dispatch({
          type: SET_SLYDER,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };

  // Helper fxn for setting authorization header in various places
const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  };