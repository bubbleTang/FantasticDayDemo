'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  Animated,
  Modal,
  LayoutAnimation,
  TouchableOpacity,
  Text,
  DatePickerAndroid,
  Platform,
  StyleSheet
} from 'react-native';

import DatePicker from 'rmc-date-picker/lib/DatePicker'
//毫秒
const SHOW_ANIMATION_DURATION = 300;
const CLOSE_ANIMATION_DURATION = SHOW_ANIMATION_DURATION;
const ANIMATED_HEIGHT = 236 + 40;

import moment from 'moment';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';

// 所有进来之前和返回出去的日期乐熊都是date
// 所有操作的日期类型都是moment

export default class DatePickerMode extends React.Component {
  constructor(props) {
    super(props);
    this._selectedDate = props.date; //type: Date
    this.state = {
      momentDate: props.date,
      visible: false,
      animated: new Animated.Value(-ANIMATED_HEIGHT)
    };
  }

  getSelectData() {
    return this._selectedDate
  }

  resetSelectDate(date) {
    this._selectedDate = date
  }

  show(onCloseCallBack, initDate) {
    this.onCloseCallBack = onCloseCallBack;
    this.setState({visible: true});
    Animated.timing(
      this.state.animated,
      {
        toValue: 0,
        duration: SHOW_ANIMATION_DURATION
      }
    ).start()
  }

  close() {
    Animated.timing(
      this.state.animated,
      {
        toValue: -ANIMATED_HEIGHT,
        duration: CLOSE_ANIMATION_DURATION
      }
    ).start(this._onCloseAnimationEnd.bind(this))
  }

  _onCloseAnimationEnd() {
    this.setState({visible: false});
    this.onCloseCallBack(this._selectedDate)
  }

  _onConfirmBtnPressed() {
    this._selectedDate = this.formatToDate(this.state.momentDate);
    this.close()
  }

  formatToDate(moment) {
    return new Date(moment)
  }

  _onCancelBtnPressed() {
    Animated.timing(
      this.state.animated,
      {
        toValue: -ANIMATED_HEIGHT,
        duration: CLOSE_ANIMATION_DURATION
      }
    ).start(() => this.setState({visible: false}))
  }

  render() {
    const backgroundColorAnimated = {
      inputRange: [-ANIMATED_HEIGHT, 0],
      outputRange: ['#3330', '#3339']
    };

    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
        }}
      >
        <Animated.View
          style={[
            styles.main,
            {backgroundColor: this.state.animated.interpolate(backgroundColorAnimated)}
          ]}
        >
          <View
            style={{flex: 1}}
            onStartShouldSetResponder={this._onCancelBtnPressed.bind(this)}
          />
          <Animated.View style={{marginBottom: this.state.animated}}>
            <View style={styles.headerView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this._onCancelBtnPressed.bind(this)}
              >
                <Text>
                  取消
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={this._onConfirmBtnPressed.bind(this)}
              >
                <Text>
                  确定
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <DatePicker
                date={this.state.momentDate}
                rootNativeProps={{'data-xx': 'yy'}}
                mode={'date'}
                locale={zhCn}
                maxDate={this.props.maxDate}
                minDate={this.props.minDate}
                onDateChange={(momentDate) => {
                  this.setState({momentDate: momentDate});
                }}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    )
  }
}

DatePickerMode.propType = {};

DatePickerMode.defaultProps = {
  date: new Date(),
  maxDate: new Date('2050/12/12 23:59:59'),
  minDate: new Date()
};

let styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  datePicker: {
    backgroundColor: '#fff'
  },
  headerView: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke'
  },
  btn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});