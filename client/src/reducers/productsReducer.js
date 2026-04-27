import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from '../actions/actionTypes';

const initialProductState = {
  products: [],
  pagination: { currentPage: 1, lastPage: 1, totalCount: 0 },
  loading: false,
  error: null,
  selectedProduct: null,
};

export const productsReducer = (state = initialProductState, { type, payload }) => {
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
    case FETCH_PRODUCT_REQUEST: {
      return { ...state, loading: true, error: null, selectedProduct: null };
    }
    case FETCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        selectedProduct: payload,
        loading: false,
      };
    }
    case FETCH_PRODUCT_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
      };
    }
    case ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: state.products.filter(product => product.id !== payload),
      };
    }
    case DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: state.products.map(product => (product.id === payload.id ? payload : product)),
      };
    }
    case UPDATE_PRODUCT_FAILURE: {
      return {
        ...state,
        laoding: false,
        error: payload,
      };
    }

    default:
      return state;
  }
};
