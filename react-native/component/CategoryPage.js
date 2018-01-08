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
  ListView,
  StyleSheet
} from 'react-native';

import globalStyles from '../css/globalStyles'
import NavigationBar from './navigator/NavigationBar'

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from '../actions';

const {width, height} = Dimensions.get('window');
const RATIO_WIDTH = width / 375;

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.categoryData = null;
    this.listViewDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      selectId: null
    };
  }

  static navigationOptions = ({navigation}) => ({
    header: <NavigationBar
      back
      backgroundColor="#a6c5ff"
      title="Fantastic Days"
      navigation={navigation}
    />
  });

  componentDidMount() {
    let {categoryId} = this.props.navigation.state.params;
    if (categoryId) this.setState({selectId: categoryId})
  }

  componentWillUnmount() {
    if (this.state.selectId && this.categoryData) {
      this.props.navigation.state.params.callback(this.state.selectId, this.categoryData)
    }
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.row}
        onPress={() => {
          this.setState({selectId: rowData.id});
          this.categoryData = rowData;
        }}
      >
        <View style={styles.leftView}>
          <Image style={styles.icon} source={rowData.icon}/>
          <Text>
            {rowData.category}
          </Text>
        </View>
        {
          this.state.selectId == rowData.id ?
            <Image source={require('../images/yes.png')}/> : null
        }
      </TouchableOpacity>
    )
  }

  _renderFooter() {
    return (
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
        }}
      >
        <Text style={{color: 'white'}}>
          {'新建分类'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={[globalStyles.main.noBarContainer, {backgroundColor: 'white'}]}>
        <ListView
          dataSource={this.listViewDataSource.cloneWithRows(this.props.state.user.categoryList)}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    )
  }
}

CategoryPage.propType = {};

CategoryPage.defaultProps = {};

let styles = StyleSheet.create({
  row: {
    height: 70,
    width: width - 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 28,
    width: 28,
    resizeMode: 'stretch',
    marginRight: 11,
  },
  addBtn: {
    alignSelf: 'center',
    marginTop: 60,
    height: 44,
    width: 105,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c9ef8'
  }
});

export default connect(
  state => ({state: state}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(CategoryPage);