import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
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
    case ADD_CATEGORY_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case ADD_CATEGORY_SUCCESS: {
      return { ...state, loading: false, categories: [...state.categories, payload] };
    }
    case ADD_CATEGORY_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    case DELETE_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(category => category.id !== payload),
      };
    }
    case DELETE_CATEGORY_FAILURE: {
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
