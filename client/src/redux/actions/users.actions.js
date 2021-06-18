/* Imports */

// External Modules
import axios from "axios";

// Types
import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  START_LOADING,
  STOP_LOADING,
  CLEAR_ERROR,
  SET_ERROR,
} from "../types";

/* Actions */

export const signup = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/users/signup", data);
    dispatch({ type: SIGNUP_USER, payload: response.data.user });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: {
        status: err.response.status,
        message: err.response.data.message,
      },
    });
    dispatch({ type: STOP_LOADING });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/users/login", data);
    dispatch({ type: LOGIN_USER, payload: response.data.user });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: {
        status: err.response.status,
        message: err.response.data.message,
      },
    });
    dispatch({ type: STOP_LOADING });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await axios.get("/api/users/logout");
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: {
        status: err.response.status,
        message: err.response.data.message,
      },
    });
    dispatch({ type: STOP_LOADING });
  }
};

export const auth = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/users/auth");
    dispatch({ type: AUTH_USER, payload: response.data.user });
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: {
        status: err.response.status,
        message: err.response.data.message,
      },
    });
    dispatch({ type: STOP_LOADING });
  }
};
