import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/actionTypes';

const initialCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoryReducer = (state = initialCategoryState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    }
    case FETCH_CATEGORIES_FAILURE: {
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
