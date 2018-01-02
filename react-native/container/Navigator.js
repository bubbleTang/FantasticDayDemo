import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';

import Main from '../component/Main';

export const AppNavigator = StackNavigator({
  Login: {screen: Main},
  Main: {screen: Main},
});