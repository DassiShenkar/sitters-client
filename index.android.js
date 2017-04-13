"use strict";
import { AppRegistry, Navigator } from 'react-native';
import React, { Component } from 'react';
import Splash from './native/containers/Splash';
import Login from './native/containers/Login';
import Register from './native/containers/Register';
import Feed from './native/containers/Feed';

export default class Sitters extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <Navigator
                style={{ flex:1 }}
                configureScene={ this.configureScene.bind(this) }
                initialRoute={{ id: 'Main', passProps:{}, type: 'NORMAL' }}
                renderScene={ this.renderScene.bind(this) } />
        );
    }

    renderScene (route, navigator) {
        alert("renderScene " + route.id);
        var routeId = route.id;
        if (routeId === 'Main') {
            return (
                <Splash
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Login') {
            return (
                <Login
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Register') {
            return (
                <Register
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Feed') {
            return (
                <Feed
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
    }

    configureScene(route, routeStack){
        alert("configureScene " + route.type);
        if(route.type === 'NORMAL'){
            return Navigator.SceneConfigs.PushFromRight;
        } else {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
    }
}

AppRegistry.registerComponent('Sitters', () => Sitters);