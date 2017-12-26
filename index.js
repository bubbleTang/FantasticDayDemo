import {AppRegistry, Platform} from 'react-native';


global.__IOS__ = Platform === 'ios';
global.__ANDROID__ = Platform !== 'ios';

import App from './react-native/container/App';

AppRegistry.registerComponent('FantasticDayDemo', () => App);
