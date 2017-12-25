'use strict';

import React, {Component} from 'react';
import {
  StatusBar,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';

let {width, height} = Dimensions.get('window');
let BarHeight = StatusBar.currentHeight;

import BaseManager from 'BaseManager'

const IOS = Platform.OS === 'ios';

exports.main = StyleSheet.create({
  noBarContainer: {
    height: IOS ? BaseManager.isIphoneX ? height - 88 : height - 64 : height - 56 - BarHeight,
    marginTop: IOS ? BaseManager.isIphoneX ? 88 : 64 : 56,
    width: width,
    backgroundColor: 'transparent'
  }
})
;