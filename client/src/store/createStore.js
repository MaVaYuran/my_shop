import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { withExtraArgument } from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducer';
import { productReducer } from '../reducers/productReducer';
import { categoryReducer } from '../reducers/categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
});

export const createStore = navigate => {
  const store = legacy_createStore(rootReducer, applyMiddleware(withExtraArgument({ navigate })));
  return store;
};
