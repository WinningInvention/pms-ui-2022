import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../Actions";
  
  const token = JSON.parse(localStorage.getItem("token"));
  
  const initialState = token
    ? { isLoggedIn: true, token }
    : { isLoggedIn: false, token: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          token: payload.token,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
        };
      default:
        return state;
    }
  }