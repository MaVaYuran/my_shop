import { request } from '../utils/request';
import {
  CART_ADD_PRODUCT_SUCCESS,
  CART_UPDATE_ITEM_QUANTITY_SUCCESS,
  CART_UPDATE_ITEM_QUANTITY_REQUEST,
  CART_UPDATE_ITEM_QUANTITY_FAILURE,
  FETCH_CART_SUCCESS,
  FETCH_CART_REQUEST,
  FETCH_CART_FAILURE,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_FAILURE,
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_FAILURE,
  CLEAR_CART,
} from './actionTypes';

export const fetchCartSuccess = cart => ({ type: FETCH_CART_SUCCESS, payload: cart });

export const fetchCartRequest = () => ({ type: FETCH_CART_REQUEST });

export const fetchCartFailure = error => ({ type: FETCH_CART_FAILURE, payload: error });

export const cartAddProductRequest = () => ({
  type: CART_ADD_PRODUCT_REQUEST,
});

export const addToCartSuccess = (product, quantity = 1) => ({
  type: CART_ADD_PRODUCT_SUCCESS,
  payload: { product, quantity },
});

export const cartAddProductFailure = error => ({
  type: CART_ADD_PRODUCT_FAILURE,
  payload: error,
});

export const updateItemQuantityRequest = () => ({
  type: CART_UPDATE_ITEM_QUANTITY_REQUEST,
});

export const updateItemQuantitySuccess = (productId, quantity) => ({
  type: CART_UPDATE_ITEM_QUANTITY_SUCCESS,
  payload: { productId, quantity },
});

export const updateItemQuantityFailure = error => ({
  type: CART_UPDATE_ITEM_QUANTITY_FAILURE,
  payload: error,
});

export const removeFromCartRequest = () => ({ type: REMOVE_FROM_CART_REQUEST });

export const removeFromCartSuccess = productId => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: productId,
});

export const removeFromCartFailure = error => ({ type: REMOVE_FROM_CART_FAILURE, payload: error });

export const clearCart = () => ({ type: CLEAR_CART });

export const fetchCart = () => async dispatch => {
  dispatch(fetchCartRequest());
  try {
    const response = await request('/cart');
    dispatch(fetchCartSuccess(response.data));
    console.log(('cart', response.data));
  } catch (error) {
    dispatch(fetchCartFailure(error.message));
  }
};

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  dispatch(cartAddProductRequest());
  try {
    const product = getState().products.products.find(p => p.id === productId);
    console.log('CART product', product);
    console.log('CART PS', getState().products.products);
    if (!product) {
      throw new Error('Product not found');
    }
    dispatch(addToCartSuccess(product, quantity));

    await request('/cart/add', 'POST', { productId, quantity });

    await dispatch(fetchCart());
  } catch (error) {
    dispatch(cartAddProductFailure(error.message));
    dispatch(fetchCart());
  }
};

export const updateItemQuantity = (productId, quantity) => async (dispatch, getState) => {
  console.log('prodid quant', productId, quantity);

  dispatch(updateItemQuantityRequest());
  try {
    const cartItem = getState().cart.items.find(item => item.product._id === productId);
    console.log('cartItem', cartItem);

    if (!cartItem) throw new Error('Item not found in cart');
    // const newQuantity = cartItem.quantity + quantity;

    // if (newQuantity > cartItem.product.stock) {
    //   alert(`Доступно лишь ${cartItem.product.stock} единиц данного товара`);

    //   return;
    // }
    dispatch(updateItemQuantitySuccess(productId, quantity));

    await request('/cart/edit', 'PATCH', { productId, quantity });

    await dispatch(fetchCart());
  } catch (error) {
    dispatch(updateItemQuantityFailure(error.message));
    dispatch(fetchCart());
  }
};

export const removeProductFromCart = productId => async dispatch => {
  dispatch(removeFromCartRequest());
  console.log('delete', productId);

  try {
    await request(`/cart/remove/${productId}`, 'DELETE');
    dispatch(removeFromCartSuccess(productId));
    await dispatch(fetchCart());
  } catch (error) {
    dispatch(removeFromCartFailure(error.message));
    dispatch(fetchCart());
  }
};
