/* Imports */

// Types
import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types";

/* State */

const initialState = {
  user: {},
  error: {},
  loading: false,
};

/* Reducer */

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
    case LOGIN_USER:
    case AUTH_USER:
      return { ...state, user: action.payload };

    case LOGOUT_USER:
      return { ...state, user: {} };

    case START_LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: {} };

    default:
      return state;
  }
};

/* Export */

export default usersReducer;
