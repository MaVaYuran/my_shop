import { FETCH_CART_FAILURE, FETCH_CART_REQUEST, FETCH_CART_SUCCESS } from '../actions/actionTypes';

const initialCartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case FETCH_CART_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case FETCH_CART_SUCCESS: {
      return { ...state, items: payload.items, loading: false };
    }
    case FETCH_CART_FAILURE: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};
