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

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;
const MAIN_HEIGHT = Platform.OS === 'ios' ? 64 : 56;
const PADDING_TOP = Platform.OS === 'ios' ? 20 : 0;

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static mainHeight = MAIN_HEIGHT;

  _renderLeftItem() {
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
    height: 64,
    width: width,
    position: 'absolute',
    left: 0,
    top: 0,
  },

  leftItem: {},
  rightItem: {},

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