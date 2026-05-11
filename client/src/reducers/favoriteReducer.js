import {
  ADD_FAVORITE_FAILURE,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  FETCH_FAVORITE_FAILURE,
  FETCH_FAVORITE_REQUEST,
  FETCH_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
} from '../actions/actionTypes.js';
const initialFavoriteState = {
  items: [],
  loading: false,
  error: null,
};

export const favoriteReducer = (state = initialFavoriteState, { type, payload }) => {
  switch (type) {
    case FETCH_FAVORITE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_FAVORITE_SUCCESS: {
      return { ...state, loading: false, items: payload };
    }
    case FETCH_FAVORITE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }

    case ADD_FAVORITE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ADD_FAVORITE_SUCCESS: {
      return { ...state, items: [...state.items, payload] };
    }
    case ADD_FAVORITE_FAILURE: {
      return { ...state, loading: false, error: payload };
    }

    case REMOVE_FAVORITE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case REMOVE_FAVORITE_SUCCESS: {
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== payload)],
        loading: false,
      };
    }

    case REMOVE_FAVORITE_FAILURE: {
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
