"use strict";
import Feed from './native/components/Feed'
import Register from './native/components/Register'
import Splash from './native/components/Splash'
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Sitters = StackNavigator({
    Home: {screen: Splash},
    Feed: {screen: Feed},
    Register: {screen: Register}
});

AppRegistry.registerComponent('Sitters', () => Sitters);