import { request } from '../utils/request';
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
} from './actionTypes';

export const addFavoriteRequest = () => ({
  type: ADD_FAVORITE_REQUEST,
});

export const addFavoriteSuccess = item => ({
  type: ADD_FAVORITE_SUCCESS,
  payload: item,
});

export const addFavoriteFailure = error => ({
  type: ADD_FAVORITE_FAILURE,
  payload: error,
});

const removeFavoriteRequest = () => ({ type: REMOVE_FAVORITE_REQUEST });
const removeFavoriteSuccess = id => ({ type: REMOVE_FAVORITE_SUCCESS, payload: id });
const removeFavoriteFailure = error => ({ type: REMOVE_FAVORITE_FAILURE, payload: error });
const fetchFavoriteRequest = () => ({ type: FETCH_FAVORITE_REQUEST });
const fetchFavoriteSuccess = items => ({ type: FETCH_FAVORITE_SUCCESS, payload: items });
const fetchFavoriteFailure = error => ({ type: FETCH_FAVORITE_FAILURE, payload: error });

export const addFavorite = (userId, product) => async dispatch => {
  console.log('USERID ', userId);
  console.log('productID ', product.id);

  dispatch(addFavoriteRequest());
  try {
    await request('/favorite/add', 'POST', { userId, productId: product.id });
    dispatch(addFavoriteSuccess(product));
  } catch (error) {
    dispatch(addFavoriteFailure(error.message));
  }
};

export const removeFavorite = (userId, productId) => async dispatch => {
  dispatch(removeFavoriteRequest());
  try {
    await request('/favorite', 'DELETE', { userId, productId });
    dispatch(removeFavoriteSuccess(productId));
  } catch (error) {
    dispatch(removeFavoriteFailure(error.message));
  }
};
export const fetchFavorite = userId => async dispatch => {
  fetchFavoriteRequest();
  try {
    const data = await request(`/favorite/${userId}`);
    console.log('dataAct', data.data);

    dispatch(fetchFavoriteSuccess(data.data || []));
  } catch (error) {
    dispatch(fetchFavoriteFailure(error.message));
  }
};
