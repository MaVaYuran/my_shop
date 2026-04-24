import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../actions/actionTypes';

const initialProductState = {
  products: [],
  pagination: { currentPage: 1, lastPage: 1, totalCount: 0 },
  loading: false,
  error: null,
};

export const productReducer = (state = initialProductState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: payload.data || [],
        pagination: payload.pagination || state.pagination,
        loading: false,
      };
    }
    case FETCH_PRODUCTS_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};
