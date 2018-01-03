'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  StyleSheet
} from 'react-native';

import BaseManager from 'BaseManager'
const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;
const MAIN_HEIGHT = Platform.OS === 'ios' ? (BaseManager.isIphoneX ? 88 : 64) : 56;
const PADDING_TOP = Platform.OS === 'ios' ? (BaseManager.isIphoneX ? 44 : 20) : 0;

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static mainHeight = MAIN_HEIGHT;

  _renderLeftItem() {
    let {
      back,

      leftIcon,
      leftText,
      leftItemDisabled,
      onLeftItemPress,

      renderLeftItem,
      navigation
    } = this.props;

    if (back) {
      return (
        <TouchableOpacity
          style={styles.leftItem}
          onPress={() => navigation && navigation.goBack()}
        >
          <Image
            style={{height: 16, width: 19,}}
            source={require('../../images/back_button.png')}
          />
        </TouchableOpacity>
      )
    } else if (leftIcon) {
      return (
        <TouchableOpacity
          style={styles.leftItem}
          onPress={onLeftItemPress || (() => navigation && navigation.goBack())}
        >
          <Image source={leftIcon}/>
        </TouchableOpacity>
      )
    } else if (leftText) {
      return (
        <TouchableOpacity
          style={styles.leftItem}
          onPress={onLeftItemPress || (() => navigation && navigation.goBack())}
        >
          <Text style={{color: 'white'}}>
            {leftText}
          </Text>
        </TouchableOpacity>
      )
    } else if (renderLeftItem) {
      return renderLeftItem
    }

    return null
  }

  _renderTitle() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {this.props.title}
        </Text>
      </View>
    )
  }

  _renderRightItem() {
    let {
      back,

      rightText,
      rightItemDisabled,
      onRightItemPress,

      renderRightItem,
      navigation
    } = this.props;

    if (rightText) {
      return (
        <TouchableOpacity
          disabled={rightItemDisabled}
          style={styles.rightItem}
          onPress={onRightItemPress}
        >
          <Text style={{color: 'white', fontSize: 14}}>
            {rightText}
          </Text>
        </TouchableOpacity>
      )
    } else if (renderRightItem) {
      return renderRightItem
    }

    return null
  }

  render() {
    let {
      backgroundColor
    } = this.props;

    return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {this._renderLeftItem()}
        {this._renderTitle()}
        {this._renderRightItem()}
      </View>
    )
  }
}

NavigationBar.propType = {};

NavigationBar.defaultProps = {
  backgroundColor: 'transparent'
};

let styles = StyleSheet.create({
  container: {
    height: MAIN_HEIGHT,
    width: width,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: PADDING_TOP
  },

  leftItem: {
    width: 70,
    height: MAIN_HEIGHT - PADDING_TOP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightItem: {
    width: 70,
    height: MAIN_HEIGHT - PADDING_TOP,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  titleView: {
    width: width - 140,
    height: MAIN_HEIGHT,
    paddingTop: PADDING_TOP,
    position: 'absolute',
    left: 70,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    color: 'white'
  }
});

module.exports = NavigationBar;