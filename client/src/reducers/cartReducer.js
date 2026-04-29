import {
  CART_ADD_PRODUCT_SUCCESS,
  FETCH_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  FETCH_CART_REQUEST,
  FETCH_CART_FAILURE,
  CART_UPDATE_ITEM_QUANTITY_SUCCESS,
  CART_UPDATE_ITEM_QUANTITY_REQUEST,
  CART_UPDATE_ITEM_QUANTITY_FAILURE,
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_FAILURE,
  REMOVE_FROM_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
} from '../actions/actionTypes';

const initialCartState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

export const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case FETCH_CART_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case FETCH_CART_SUCCESS: {
      return { ...state, items: payload.items, totalPrice: payload.totalPrice, loading: false };
    }

    case FETCH_CART_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case CART_UPDATE_ITEM_QUANTITY_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case CART_UPDATE_ITEM_QUANTITY_SUCCESS: {
      const { productId, quantity } = payload;
      const newItems = state.items.map(item =>
        item.product._id === productId ? { ...item, quantity: item.quantity + quantity } : item,
      );

      const newTotalPrice = newItems.reduce(
        (total, item) => total + item.price * item.quantity,
        state.totalPrice,
      );
      return { ...state, items: newItems, totalPrice: newTotalPrice, loading: false };
    }

    case CART_UPDATE_ITEM_QUANTITY_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case CART_ADD_PRODUCT_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case CART_ADD_PRODUCT_SUCCESS: {
      const { product, quantity } = payload;
      const existingItemIndex = state.items.findIndex(item => item.product._id === product.id);
      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          existingItemIndex === index ? { ...item, quantity: item.quantity + quantity } : item,
        );
      } else {
        newItems = [...state.items, { product, quantity, price: product.price }];
      }
      const newTotalPrice = newItems.reduce(
        (total, item) => total + item.price * item.quantity,
        state.totalPrice,
      );

      return {
        ...state,
        items: newItems,
        totalPrice: newTotalPrice,
        loading: false,
      };
    }
    case CART_ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case REMOVE_FROM_CART_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case REMOVE_FROM_CART_SUCCESS: {
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== payload),
        loading: false,
      };
    }
    case REMOVE_FROM_CART_FAILURE: {
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
