'use strict';

const initState = {
  mainList: [],
};

let userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'a':
      return Object.assign({}, state, {});
  }

  return {
    ...state,
    ...{type: action.type}
  }
};

export default userReducer;