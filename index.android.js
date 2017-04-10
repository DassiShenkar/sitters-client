import React, { Component } from 'react';
import App from './native/App'
import Feed from './native/components/Feed'
import Register from './native/components/Register'
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Sitters = StackNavigator({
    Home: {screen: App},
    Feed: {screen: Feed},
    Register: {screen: Register}
});

var MainApp = React.createClass({
    render: function () {
        return (
             <App
                navigation={this.props.navigation}
             />
        );
    }
});

AppRegistry.registerComponent('Sitters', () => Sitters);