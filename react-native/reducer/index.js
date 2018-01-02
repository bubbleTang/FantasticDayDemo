import { combineReducers } from 'redux';

import user from './user';

export default function getReducers(navReducer) {
  return combineReducers({
    user,
    nav: navReducer
  });
}