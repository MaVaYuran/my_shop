import { request } from '../utils/request';
import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_FAILURE,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from './actionTypes';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});
export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});
export const addProductFailure = error => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});
export const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
export const updateProductSuccess = data => ({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
export const updateProductFailure = error => ({ type: UPDATE_PRODUCT_FAILURE, payload: error });
export const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
export const deleteProductSuccess = id => ({ type: DELETE_PRODUCT_SUCCESS, payload: id });
export const deleteProductFailure = error => ({ type: DELETE_PRODUCT_FAILURE, payload: error });
export const getProductRequest = () => ({ type: FETCH_PRODUCT_REQUEST });
export const getProductSuccess = id => ({ type: FETCH_PRODUCT_SUCCESS, payload: id });
export const getProductFailure = error => ({ type: FETCH_PRODUCT_FAILURE, payload: error });

export const fetchProducts =
  ({ categoryId = null, search = '', page = 1, limit = 6, userId = null } = {}) =>
  async dispatch => {
    dispatch(fetchProductsRequest());
    try {
      const params = new URLSearchParams();

      if (categoryId !== null) {
        params.append('categoryId', categoryId);
      }

      if (search) {
        params.append('search', search);
      }

      params.append('page', page);
      params.append('limit', limit);
      if (userId) {
        params.append('userId', userId);
      }

      const url = `/products?${params.toString()}`;

      const response = await request(url);
      console.log('response', response.data);

      dispatch(fetchProductsSuccess({ data: response.data, pagination: response.pagination }));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

export const addProduct = product => async dispatch => {
  dispatch(addProductRequest());

  try {
    const response = await request('/products/new', 'POST', { ...product });
    dispatch(addProductSuccess(response));
    return response;
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const updateProduct =
  ({ id, data }) =>
  async dispatch => {
    dispatch(updateProductRequest());

    try {
      const response = await request(`/products/${id}/edit`, 'PATCH', { ...data });
      console.log('update response:', response.data);

      dispatch(updateProductSuccess(response.data));
    } catch (error) {
      dispatch(updateProductFailure(error.message));
    }
  };

export const deleteProduct = id => async dispatch => {
  dispatch(deleteProductRequest());
  try {
    await request(`/products/${id}`, 'DELETE');
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
  }
};

export const getProduct = id => async dispatch => {
  dispatch(getProductRequest());
  try {
    const response = await request(`/products/${id}`);
    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFailure(error.message));
  }
};
