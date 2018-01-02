'use strict';

module.exports = function (state, action) {

  state = state || {
      type: 'INIT',
      scheduleCnt: 0,
      starCnt: 0,
      scheduleList: [],

      categoryList: []
    };

  switch (action.type) {
    case 'INIT_LOCAL_DATA':
      return Object.assign({}, state, {
        scheduleCnt: action.scheduleCnt,
        starCnt: action.starCnt,
        scheduleList: action.scheduleList
      });

    case 'INIT_CATEGORY':
      return Object.assign({}, state, {
        categoryList: action.categoryList
      });
  }

  return {
    ...state,
    ...{type: action.type}
  }
};