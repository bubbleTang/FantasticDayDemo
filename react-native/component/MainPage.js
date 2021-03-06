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
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;

import NavigationBar from './navigator/NavigationBar'
import MainView from "./MainView";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from '../actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.initLocalData();
    this.props.actions.initCategoryData()
  }

  static navigationOptions = ({navigation}) => ({
    header: <NavigationBar
      title="Fantastic Days"
      navigation={navigation}
    />
  });

  render() {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../images/FD.png')}
      >
        <MainView
          state={this.props.state}
          onAddBtnPress={() => {
            this.props.navigation.navigate('AddPage')
          }}
          onRowPress={(rowData) => {
            this.props.navigation.navigate('AddPage', {rowData: rowData})
          }}
          onLongPress={(id) => {
            Alert.alert(
              '确认删除？',
              '',
              [
                {text: '取消', onPress: () => {}},
                {text: '确定', onPress: () => this.props.actions.deleteData(id)}
              ]
            )
          }}
        />
      </ImageBackground>
    )
  }
}

Main.propType = {};

Main.defaultProps = {};

let styles = StyleSheet.create({});

export default connect(
  state => ({state: state}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(Main);