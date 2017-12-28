import Navigator from '../container/Navigator';


const navReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navReducer;