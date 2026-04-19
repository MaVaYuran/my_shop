import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { UserReducer } from '../reducers/userReducer';
import { withExtraArgument } from 'redux-thunk';

const rootReducer = combineReducers({
  users: UserReducer,
});

export const createStore = navigate => {
  const store = legacy_createStore(rootReducer, applyMiddleware(withExtraArgument({ navigate })));
  return store;
};
