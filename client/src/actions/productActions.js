import { request } from '../utils/request';
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
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

export const fetchProducts =
  ({ categoryId = null, search = '', page = 1, limit = 6 } = {}) =>
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

      const url = `/products?${params.toString()}`;

      const response = await request(url);
      dispatch(fetchProductsSuccess({ data: response.data, pagination: response.pagination }));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
