import { request } from '../utils/request';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
} from './actionTypes';

//action creators
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const addCategoryRequest = () => ({
  type: ADD_CATEGORY_REQUEST,
});
export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: category,
});

export const addCategoryFailure = error => ({
  type: ADD_CATEGORY_FAILURE,
  payload: error,
});

export const deleteCategoryRequest = () => ({
  type: DELETE_CATEGORY_REQUEST,
});

export const deleteCategorySuccess = id => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: id,
});

export const deleteCategoryFailure = error => ({
  type: DELETE_CATEGORY_FAILURE,
  payload: error,
});

//async action creators

export const fetchCategories = () => async dispatch => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await request('/category');
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const addCategory = title => async dispatch => {
  dispatch(addCategoryRequest());
  try {
    const response = await request('/category/new', 'POST', { title });
    dispatch(addCategorySuccess(response));
    return response;
  } catch (error) {
    dispatch(addCategoryFailure(error.message));
  }
};

export const deleteCategory = id => async dispatch => {
  dispatch(deleteCategoryRequest());
  try {
    await request(`/category/${id}`, 'DELETE');
    dispatch(deleteCategorySuccess(id));
  } catch (error) {
    dispatch(deleteCategoryFailure(error.message));
  }
};
