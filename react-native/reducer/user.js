'use strict';

import {handleActions} from 'redux-actions';

const defaultState = {
  visible: false
};

export default handleActions({
  'login': (state, action) => ({
    ...state,
    visible: true
  }),

}, defaultState);
