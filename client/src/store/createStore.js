import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { withExtraArgument } from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducer';
import { productsReducer } from '../reducers/productsReducer';
import { categoryReducer } from '../reducers/categoryReducer';
import { favoriteReducer } from '../reducers/favoriteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  category: categoryReducer,
  favorite: favoriteReducer,
});

export const createStore = navigate => {
  const store = legacy_createStore(rootReducer, applyMiddleware(withExtraArgument({ navigate })));
  return store;
};
