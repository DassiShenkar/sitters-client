'use strict';

import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import { Provider } from 'react-redux';

import App from './native/containers/App';
import Splash from './native/containers/Splash';
import Login from './native/containers/Login';
import Register from './native/containers/Register';
import Feed from './native/containers/Feed';
import SitterProfileView from './native/containers/SitterProfileView';
import SitterSendInvite from './native/containers/SitterSendInvite';
import Notifications from './native/containers/Notifications';
import Inbox from './native/containers/Inbox';
import About from './native/containers/About';
import Settings from './native/containers/Settings';
import Search from './native/containers/Search';
import PersonalityTestIntro from './native/containers/PersonalityTestIntro';
import PersonalityTest from './native/containers/PersonalityTest';
import RateSitter from './native/containers/RateSitter';
import GoogleMapView from './native/containers/GoogleMapView';

import configureStore from './native/store/ConfigureStore'

const store = configureStore();

class Sitters extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="modal" component={Modal}>
                        <Scene key="root">
                            <Scene key="App" component={App} title="App" initial={true} hideNavBar={true}/>
                            <Scene key="Splash" component={Splash} title="Splash" hideNavBar={true}/>
                            <Scene key="Login" component={Login} title="Login" hideNavBar={true}/>
                            <Scene key="Register" component={Register} title="Register" hideNavBar={true}/>
                            <Scene key="Feed" component={Feed} title="Feed"/>
                            <Scene key="SitterProfileView" component={SitterProfileView} title="SitterProfileView"/>
                            <Scene key="Notifications" component={Notifications} title="Notifications"/>
                            <Scene key="Inbox" component={Inbox} title="Inbox"/>
                            <Scene key="PersonalityTestIntro" component={PersonalityTestIntro} title="PersonalityTestIntro"/>
                            <Scene key="PersonalityTest" component={PersonalityTest} title="PersonalityTest"/>
                            <Scene key="Search" component={Search} title="Search"/>
                            <Scene key="About" component={About} title="About"/>
                            <Scene key="Settings" component={Settings} title="Settings"/>
                            <Scene key="GoogleMapView" component={GoogleMapView} title="GoogleMapView"/>
                        </Scene>
                        <Scene key="SitterSendInvite" component={SitterSendInvite} title="SitterSendInvite"/>
                        <Scene key="RateSitter" component={RateSitter} title="RateSitter"/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Sitters', () => Sitters);