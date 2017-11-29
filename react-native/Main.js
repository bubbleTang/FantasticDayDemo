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
  ImageBackground
} from 'react-native';

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;

import NavigationBar from './NavigationBar'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation}) => ({
    header: <NavigationBar title="Fantastic Days"/>
  });

  render() {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('./images/FD.png')}
      >

      </ImageBackground>
    )
  }
}

Main.propType = {};

Main.defaultProps = {};

let styles = StyleSheet.create({});