import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes';

const initialUserState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    }
    default:
      return state;
  }
};
