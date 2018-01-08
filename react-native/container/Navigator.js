import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';

import Main from '../component/MainPage';
import AddPage from '../component/AddPage'
import CategoryPage from '../component/CategoryPage'

export const AppNavigator = StackNavigator({
  Login: {screen: Main},
  AddPage: {screen: AddPage},
  CategoryPage: {screen: CategoryPage}
});