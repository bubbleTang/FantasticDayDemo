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

export default class ScheduleRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {rowData, onPress} = this.props;
    let {timestamp} = rowData;

    let nowDate = new Date();
    let rowDataTime = new Date(timestamp);
    let day = Math.floor((rowDataTime.getTime() - nowDate.getTime()) / (24 * 3600 * 1000)) + 1;
    let dateDesp = day < 0 ? '过去了' : '还有';

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={onPress}
        onLongPress={() => this.props.onLongPress(rowData.id)}
      >
        <Text style={styles.title} numberOfLines={2}>
          {rowData.title}
        </Text>
        <Text style={styles.dateDesp}>
          {dateDesp}
        </Text>
        <Text style={styles.day}>
          { (day < 0 ? -day : day) + '天'}
        </Text>

        {rowData.top ? <Image
          style={{position: 'absolute', right: 0, bottom: 0}}
          source={require('../images/top.png')}/> : null }
      </TouchableOpacity>
    )
  }
}

ScheduleRow.propType = {};

ScheduleRow.defaultProps = {};

let styles = StyleSheet.create({
  container: {
    paddingLeft: 9 * RATIO_WIDTH,
    paddingRight: 9 * RATIO_WIDTH,
    paddingTop: 15 * RATIO_WIDTH,
    width: 102 * RATIO_WIDTH,
    height: 272 / 2 * RATIO_WIDTH,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  title: {
    height: 42 * RATIO_WIDTH,
    fontSize: 12,
    color: '#6c9ef8'
  },
  dateDesp: {
    fontSize: 15,
    color: '#717172'
  },
  day: {
    marginTop: 10 * RATIO_WIDTH,
    fontSize: 18,
    color: '#051a40'
  }
});