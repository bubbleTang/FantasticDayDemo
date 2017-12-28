/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';

import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {Provider, connect} from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import Navigator from './Navigator'
import navReducer from '../reducer/navReducer';
import rootReducer from './RootReducer';

const middlewares = [thunk.withExtraArgument()];
const middleware = applyMiddleware(...middlewares);
let store = createStore(rootReducer(navReducer), {}, middleware);

@connect(state => ({
  nav: state.nav
}))

class AppWithNavigationState extends Component {
  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
