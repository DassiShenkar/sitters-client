"use strict";
import Feed from './native/containers/Feed'
import Register from './native/containers/Register'
import Splash from './native/containers/Splash'
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Sitters = StackNavigator({
    Home: {screen: Splash},
    Feed: {screen: Feed},
    Register: {screen: Register}
});

AppRegistry.registerComponent('Sitters', () => Sitters);