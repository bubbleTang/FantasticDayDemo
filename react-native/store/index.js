import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import getReducers from '../reducer';

export default function getStore(navReducer) {
  return createStore(
    getReducers(navReducer),
    undefined,
    applyMiddleware(promiseMiddleware)
  );
}
