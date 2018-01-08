'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  Keyboard,
  ScrollView
} from 'react-native';

import NavigationBar from './navigator/NavigationBar'
import globalStyles from '../css/globalStyles'
import DatePickerMode from './DatePickerMode'

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from '../actions';

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      categoryData: null,
      categoryId: null,
      alert: false,
      top: false,
      remark: ''
    };
  }

  componentWillMount() {
    if (__IOS__) {
      this.listener = Keyboard.addListener('keyboardWillHide', () => {
        this.textInputScrollView.scrollTo({x: 0, y: 0, animated: true})
      })
    } else {
      this.listener = Keyboard.addListener('keyboardDidHide', () => {
        this.textInputScrollView.scrollTo({x: 0, y: 0, animated: true})
      })
    }

    this.props.navigation.setParams({clickParams: this._onNavRightBtnPress.bind(this)})
  }

  componentDidMount() {
    let {params} = this.props.navigation.state;
    if (params && params.rowData) {
      this.setState({
        title: params.rowData.title,
        date: this.getDateText(new Date(params.rowData.timestamp)),
        categoryData: params.rowData.category,
        categoryId: params.rowData.category.id,
        alert: params.rowData.alert,
        top: params.rowData.top,
        remark: params.rowData.remark
      })
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.listener && this.listener.remove()
  }

  static navigationOptions = ({navigation}) => ({
    header: <NavigationBar
      back
      backgroundColor="#a6c5ff"
      title="Fantastic Days"
      navigation={navigation}
      rightText="保存"
      onRightItemPress={() => navigation.state.params.clickParams()}
    />
  });

  _onNavRightBtnPress() {
    Keyboard.dismiss();

    if (!this.state.title ||
      !this.state.date ||
      !this.state.categoryData) {
      Alert.alert(
        '提示',
        '信息不全'
      );
      return
    }

    let param = {
      title: this.state.title,
      timestamp: new Date(this.state.date.replace(/-/g, '/')),
      category: this.state.categoryData,
      alert: this.state.alert,
      top: this.state.top,
      remark: this.state.remark
    };

    let {params} = this.props.navigation.state;

    if (params && params.rowData) {
      this.props.actions.update(params.rowData.id, param);
    } else {
      this.props.actions.add(param);
    }
    this.props.navigation.goBack();
  }

  _renderTitle() {
    return (
      <View style={[styles.rowContainer, {height: 110, paddingTop: 34, flexDirection: 'column',}]}>
        <Text style={styles.title}>
          {'标题'}
        </Text>
        <TextInput
          maxLength={16}
          style={styles.titleTextinput}
          value={this.state.title}
          placeholder={'请输入标题'}
          placeholderTextColor={'#c6c6c6'}
          onChangeText={(text) => this.setState({title: text})}
        />
        <Text style={styles.numberText}>
          {`${this.state.title.length}/16`}
        </Text>
      </View>
    )
  }

  _renderDate() {
    return (
      <View style={[styles.rowContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
        <Text style={styles.title}>
          {'日期'}
        </Text>
        <TouchableOpacity
          style={{paddingLeft: 20,}}
          onPress={this._onDatePickerBtnPress.bind(this)}
        >
          <Text style={styles.contentText}>
            {this.state.date || '请选择'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  _onDatePickerBtnPress() {
    this.datePickerMode && this.datePickerMode.show((date) => {
      if (date) {
        this.setState({date: this.getDateText(date)});
      }
    }, null)
  }

  // 日期转换
  getDateText(date) {
    let year = date.getFullYear() + '-';
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let day = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return year + month + day
  }

  _renderCategory() {
    return (
      <View style={[styles.rowContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
        <Text style={styles.title}>
          {'分类'}
        </Text>
        <TouchableOpacity
          style={{paddingLeft: 20,}}
          onPress={() => {
            this.props.navigation.navigate('CategoryPage', {
              categoryId: this.state.categoryId,
              callback: (categoryId, categoryData) => {
                this.setState({categoryData: categoryData, categoryId: categoryId})
              }
            })
          }}
        >
          <Text style={styles.contentText}>
            {this.state.categoryData ? this.state.categoryData.category : '请选择'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderAlert() {
    return (
      <View style={[styles.rowContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
        <Text style={styles.title}>
          {'提醒'}
        </Text>
        <Switch
          value={this.state.alert}
          onValueChange={(value) => this.setState({alert: value})}
          onTintColor='#6c9ef8'
          tintColor="#525e71"
        />
      </View>
    )
  }

  _renderTop() {
    return (
      <View style={[styles.rowContainer, {alignItems: 'center', justifyContent: 'space-between'}]}>
        <Text style={styles.title}>
          {'置顶'}
        </Text>
        <Switch
          value={this.state.top}
          onValueChange={(value) => this.setState({top: value})}
          onTintColor='#6c9ef8'
          tintColor="#525e71"
        />
      </View>
    )
  }

  _renderRemark() {
    return (
      <View style={[styles.rowContainer, {height: 146, paddingTop: 34, flexDirection: 'column',}]}>
        <Text style={styles.title}>
          {'备注'}
        </Text>
        <TextInput
          maxLength={50}
          multiline={true}
          style={[styles.titleTextinput, {marginTop: 10, height: 72}]}
          value={this.state.remark}
          placeholder={'请输入'}
          placeholderTextColor={'#c6c6c6'}
          onChangeText={(text) => this.setState({remark: text})}
          onFocus={(evt) => this.scrollToFocusedInput(evt.nativeEvent.target)}
        />
        <Text style={styles.numberText}>
          {`${this.state.remark.length}/50`}
        </Text>
      </View>
    )
  }

  scrollToFocusedInput(node: ReactComponent) {
    this.timer = setTimeout(
      () => this.textInputScrollView.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(node),
        200,//textinput距离键盘高度
        true
      ),
      100
    )
  }

  render() {
    return (
      <View
        style={[globalStyles.main.noBarContainer, {backgroundColor: 'white'}]}
        onStartShouldSetResponder={() => Keyboard.dismiss()}
      >
        <ScrollView
          ref={(view) => this.textInputScrollView = view}
          keyboardShouldPersistTaps='always'
        >
          {this._renderTitle()}
          {this._renderDate()}
          {this._renderCategory()}
          {this._renderAlert()}
          {this._renderTop()}
          {this._renderRemark()}
        </ScrollView>

        <DatePickerMode ref={(view) => this.datePickerMode = view}/>

      </View>
    )
  }
}

AddPage.propType = {};

AddPage.defaultProps = {};

let styles = StyleSheet.create({
  rowContainer: {
    width: width - 40,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    height: 68,
  },
  title: {
    fontSize: 15,
    color: '#4f72b2'
  },
  titleTextinput: {
    height: 36,
    width: width - 40,
    fontSize: 15,
    color: '#051a40'
  },
  numberText: {
    width: width - 40,
    textAlign: 'right',
    marginBottom: 9,
    fontSize: 15,
    color: "#c6c6c6"
  },
  contentText: {
    fontSize: 15,
    color: '#051a40'
  }
});

export default connect(
  state => ({state: state}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(AddPage);