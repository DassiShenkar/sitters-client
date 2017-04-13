/**
 * Created by user on 13/04/2017.
 */
"use strict";
import { Navigator } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React, { Component } from 'react';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import SitterSendInvite from './SitterSendInvite';
import GoogleMapView from './GoogleMapView';
import * as reducers from '../../src/reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.configureScene = this.configureScene.bind(this)
    }

    render () {
        return(
            <Provider store={store}>
                <Navigator
                    style={{ flex:1 }}
                    configureScene={ this.configureScene }
                    initialRoute={{ id: 'Main', passProps:{}, type: 'NORMAL' }}
                    renderScene={ this.renderScene } />
            </Provider>
        );
    }

    renderScene (route, navigator) {
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
        if (routeId === 'SitterSendInvite') {
            return (
                <SitterSendInvite
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
        if (routeId === 'GoogleMapView') {
            return (
                <GoogleMapView
                    navigator={navigator}
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