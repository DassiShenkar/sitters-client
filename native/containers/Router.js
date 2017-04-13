"use strict";

import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import SitterSendInvite from './SitterSendInvite';
import GoogleMapView from './GoogleMapView';


export default class Router extends React.Component {

    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.configureScene = this.configureScene.bind(this)
    }

    render () {
        return(
            <Navigator
                style={{ flex:1 }}
                configureScene={ this.configureScene }
                initialRoute={{ id: 'Main', passProps:{}, type: 'NORMAL' }}
                renderScene={ this.renderScene }
                {...this.props} />
        );
    }

    renderScene (route, navigator) {
        var routeId = route.id;
        if (routeId === 'Main') {
            return (
                <Splash
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Login') {
            return (
                <Login
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Register') {
            return (
                <Register
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
        if (routeId === 'Feed') {
            return (
                <Feed
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
        if (routeId === 'SitterSendInvite') {
            return (
                <SitterSendInvite
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
        if (routeId === 'GoogleMapView') {
            return (
                <GoogleMapView
                    navigator={navigator}
                    {...this.props}
                    {...route.passProps} />
            );
        }
    }

    configureScene(route, routeStack){
        if(route.type === 'NORMAL'){
            return Navigator.SceneConfigs.PushFromRight;
        } else {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
    }
}
