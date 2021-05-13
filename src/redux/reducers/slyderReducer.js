import {
    SET_SLYDER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_SLYDER,    
    MARK_ALERTS_READ
  } from "../types";
  
  const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    alerts: [],
  };
  
  export default function(state = initialState, action) {
    // perform appropriate actions according to type
    switch (action.type) {
      //catch the various type cases
      case SET_AUTHENTICATED:
        return {
          // spreads the state as it already exists and then changes certain elements as specified
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_SLYDER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_SLYDER:
        return {
          ...state,
          loading: true
        };
      case MARK_ALERTS_READ:
        state.alerts.forEach(alert => alert.read = true);
        return {
          ...state
        }
      default:
        return state;
    }
  }
