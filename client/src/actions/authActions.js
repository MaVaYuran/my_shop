import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './actionTypes';
import { request } from '../utils/request.js';

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});
export const registerSuccess = data => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

export const userRegister = (email, password, name) => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await request('/register', 'POST', { email, password, name });
    console.log('response', response);

    dispatch(registerSuccess(response));
    return response;
  } catch (e) {
    dispatch(registerFailure(e.message));
    throw e;
  }
};

export const login = (email, password) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await request('/login', 'POST', { email, password });

    localStorage.setItem('token', response.token);
    console.log('loc Stor token', localStorage.getItem('token'));

    dispatch(loginSuccess(response));
    return response;
  } catch (e) {
    dispatch(loginFailure(e.message));
    throw e;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return logout();
};

export const restoreSession = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
    return;
  }
  dispatch(loginRequest());
  try {
    const userData = await request('/me');
    if (!userData || !userData.user) {
      throw new Error('Inalid user data from server');
    }
    dispatch(loginSuccess({ token, user: userData.user }));
  } catch (error) {
    console.error('Session restore failed', error.message);
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes('unauthorized') ||
      errorMsg.includes('invalid token') ||
      errorMsg.includes('401') ||
      errorMsg.includes('expired')
    ) {
      localStorage.removeItem('token');
      dispatch(logout());
    } else if (errorMsg.includes('network') || errorMsg.includes('failed')) {
      dispatch(loginFailure('Failed to connect to server. Please check your internet connection.'));
    } else {
      dispatch(loginFailure(error.message));
    }
  }
};
