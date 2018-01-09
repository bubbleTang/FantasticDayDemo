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
  TextInput
} from 'react-native';

import globalStyles from '../css/globalStyles'
import NavigationBar from './navigator/NavigationBar'

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from '../actions';

const {width, height} = Dimensions.get('window');

class CreateCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
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

  componentWillMount() {
    this.props.navigation.setParams({clickParams: this._onNavRightBtnPress.bind(this)})
  }

  _onNavRightBtnPress() {
    // 保存
    if (!this.state.name) return;

    let {categoryList} = this.props.state.user;
    let param = {
      id: categoryList.length+1,
      category: this.state.name,
    };

    this.props.actions.createCategory(param);
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={[globalStyles.main.noBarContainer, {backgroundColor: 'white'}]}>
        <View style={styles.main}>
          <Text style={styles.title}>
            {'名称'}
          </Text>
          <TextInput
            style={styles.textinput}
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({name: text})
            }}
          />
          <Text style={{color: '#c6c6c6', fontSize: 15}}>
            {`${this.state.name.length}/16`}
          </Text>
        </View>
      </View>
    )
  }
}

CreateCategoryPage.propType = {};

CreateCategoryPage.defaultProps = {};

let styles = StyleSheet.create({
  main: {
    height: 70,
    width: width - 40,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textinput: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 20,
    fontSize: 15,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    color: '#4f72b2'
  }
});

export default connect(
  state => ({state: state}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(CreateCategoryPage);