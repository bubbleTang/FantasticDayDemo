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
  Keyboard,
  ScrollView
} from 'react-native';

import NavigationBar from './navigator/NavigationBar'
import globalStyles from '../css/globalStyles'

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;

export default class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      category: '',
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
      onRightItemPress={() => {
      }}
    />
  });

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
          onPress={() => {
          }}
        >
          <Text style={styles.contentText}>
            {this.state.date || '请选择'}
          </Text>
        </TouchableOpacity>
      </View>
    )
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
          }}
        >
          <Text style={styles.contentText}>
            {this.state.category || '请选择'}
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