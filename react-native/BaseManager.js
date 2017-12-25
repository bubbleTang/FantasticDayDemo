/**
 * @providesModule BaseManager
 */

import {
  NativeModules,
} from 'react-native'

const {BaseManager} = NativeModules;

module.exports = {
  isIphoneX: BaseManager && BaseManager.isIphoneX && BaseManager.isIphoneX === 'true'
};