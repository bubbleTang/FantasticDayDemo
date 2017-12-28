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

import globalStyles from '../css/globalStyles'

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;
const defaultParam = {
  title: '',
  time: '',
  category: '',
  alert: false,
  pinned: false,
  comment: ''
};

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderHeaderView(dayCnt = 0, pinnedDayCnt = 0) {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={this.props.onPress}
        >
          <Text style={styles.headerTitle}>
            {'我的日程'}
          </Text>
          <Text style={styles.headerDay}>
            {dayCnt}
          </Text>
        </TouchableOpacity>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>
            {'星标日程'}
          </Text>
          <Text style={styles.headerDay}>
            {pinnedDayCnt}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={[globalStyles.main.noBarContainer]}>
        {this._renderHeaderView(5, 6)}
      </View>
    )
  }
}

MainView.propType = {};

MainView.defaultProps = {};

let styles = StyleSheet.create({
  header: {
    marginTop: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerTitle: {
    color: '#4f72b2',
    fontSize: 15,
  },
  headerDay: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 18,
  }
});