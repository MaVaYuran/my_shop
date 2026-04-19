import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from '../actions/actionTypes';

const initialUserState = {
  users: [],
  loading: false,
  error: null,
};

export const UserReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_USERS_SUCCESS: {
      return { ...state, loding: false, users: payload };
    }
    case FETCH_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};
