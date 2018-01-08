'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';

import globalStyles from '../css/globalStyles'
import ScheduleRow from "./ScheduleRow";

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;
const RATIO_HEIGHT = height / 667;
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle} onPress={this.props.onPress}>
            {'我的日程'}
          </Text>
          <Text style={styles.headerDay}>
            {dayCnt}
          </Text>
        </View>

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

  _renderBodyView(scheduleList) {
    return (
      <View style={styles.bodyView}>
        <Text style={styles.bodyTitle}>
          {'我的日程'}
        </Text>
        <ScrollView>
          <View style={styles.bodyMain}>
            {scheduleList.map((rowData, index) =>
              <ScheduleRow
                key={index}
                rowData={rowData}
                onPress={this._onRowPress.bind(this, rowData)}
                onLongPress={this.props.onLongPress}
              />
            )}
          </View>
        </ScrollView>
      </View>
    )
  }

  _onRowPress(rowData) {
    this.props.onRowPress(rowData)
  }

  _renderButtonView() {
    return (
      <View style={styles.buttonView}>
        <ImageBackground
          style={{height: 254 / 2, width: width, alignItems: 'center', justifyContent: 'center'}}
          source={require('../images/FD_02.png')}
        >
          <TouchableOpacity
            style={{padding: 10}}
            onPress={this.props.onAddBtnPress}
          >
            <Image source={require('../images/add_button.png')}/>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  render() {
    let {scheduleCnt, starCnt, scheduleList} = this.props.state.user;
    return (
      <View style={[globalStyles.main.noBarContainer]}>
        {this._renderHeaderView(scheduleCnt, starCnt)}
        {this._renderBodyView(scheduleList)}
        {this._renderButtonView()}
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
  },

  bodyView: {
    marginTop: 45 * RATIO_HEIGHT,
    flex: 1,
    width: 102 * RATIO_WIDTH * 3 + 30,
    marginLeft: (width - 102 * RATIO_WIDTH * 3 - 20) / 2,
  },
  bodyTitle: {
    fontSize: 20,
    color: '#4f72b2'
  },
  bodyMain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  buttonView: {
    width: width,
    position: 'absolute',
    bottom: 0,
    height: 254 / 2
  }
});