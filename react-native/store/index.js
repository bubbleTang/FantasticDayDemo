import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import getReducers from '../reducer';

const createStoreWithThunk = applyMiddleware(thunk)(createStore);

export default function getStore(navReducer) {
  return createStoreWithThunk(
    getReducers(navReducer),
    undefined,
    applyMiddleware(promiseMiddleware)
  );
}
