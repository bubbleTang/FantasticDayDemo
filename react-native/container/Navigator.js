
import React ,{Component} from 'react';
import { StackNavigator} from 'react-navigation';

// 界面组件
import Main from '../component/Main'

/**
 * 路由导航
 */

const Navigator = StackNavigator(
  {
    Home: {screen: Main}
  },
  {
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 300,
    //     easing: Easing.out(Easing.poly(4)),
    //     timing: Animated.timing,
    //   },
    //   screenInterpolator: sceneProps => {
    //     const { layout, position, scene } = sceneProps;
    //     const { index } = scene;
    //
    //     const height = layout.initHeight;
    //     const translateY = position.interpolate({
    //       inputRange: [index - 1, index, index + 1],
    //       outputRange: [height, 0, 0],
    //     });
    //
    //     const opacity = position.interpolate({
    //       inputRange: [index - 1, index - 0.99, index],
    //       outputRange: [0, 1, 1],
    //     });
    //
    //     return { opacity, transform: [{ translateY }] };
    //   },
    // }),
  }
);

export default Navigator;