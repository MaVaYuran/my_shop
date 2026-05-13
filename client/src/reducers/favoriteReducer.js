import {
  ADD_FAVORITE_FAILURE,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  FETCH_FAVORITE_FAILURE,
  FETCH_FAVORITE_PRODUCTS_FAILURE,
  FETCH_FAVORITE_PRODUCTS_REQUEST,
  FETCH_FAVORITE_PRODUCTS_SUCCESS,
  FETCH_FAVORITE_REQUEST,
  FETCH_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
} from '../actions/actionTypes.js';
const initialFavoriteState = {
  favoriteIds: [],
  idsLoading: false,
  idsError: null,
  favoriteProducts: [],
  productsLoading: false,
  productsError: null,
};

export const favoriteReducer = (state = initialFavoriteState, { type, payload }) => {
  switch (type) {
    case FETCH_FAVORITE_REQUEST: {
      return {
        ...state,
        idsLoading: true,
        idsError: null,
      };
    }
    case FETCH_FAVORITE_SUCCESS: {
      return { ...state, idsLoading: false, favoriteIds: payload };
    }
    case FETCH_FAVORITE_FAILURE: {
      return {
        ...state,
        idsLoading: false,
        idsError: payload,
      };
    }
    case FETCH_FAVORITE_PRODUCTS_REQUEST: {
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };
    }
    case FETCH_FAVORITE_PRODUCTS_SUCCESS: {
      return { ...state, productsLoading: false, favoriteProducts: payload };
    }
    case FETCH_FAVORITE_PRODUCTS_FAILURE: {
      return {
        ...state,
        productsLoading: false,
        productsError: payload,
      };
    }

    case ADD_FAVORITE_REQUEST: {
      return {
        ...state,
        idsLoading: true,
        idsError: null,
      };
    }
    case ADD_FAVORITE_SUCCESS: {
      return { ...state, favoriteIds: [...state.favoriteIds, payload] };
    }
    case ADD_FAVORITE_FAILURE: {
      return { ...state, idsLoading: false, idsError: payload };
    }

    case REMOVE_FAVORITE_REQUEST: {
      return {
        ...state,
        idsLoading: true,
        idsError: null,
      };
    }
    case REMOVE_FAVORITE_SUCCESS: {
      return {
        ...state,
        favoriteIds: [...state.favoriteIds.filter(item => item.id !== payload)],
        idsLoading: false,
      };
    }

    case REMOVE_FAVORITE_FAILURE: {
      return {
        ...state,
        idsLoading: false,
        idsError: payload,
      };
    }
    default:
      return state;
  }
};
