'use strict';

import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import { Provider } from 'react-redux';

import App from './native/containers/App';
import Splash from './native/containers/Splash';
import Login from './native/containers/Login';
import Register from './native/containers/Register';
import EditProfile from './native/containers/EditProfile';
import Feed from './native/containers/Feed';
import SitterProfileView from './native/containers/SitterProfileView';
import SitterSendInvite from './native/containers/SitterSendInvite';
import Notifications from './native/containers/Notifications';
import Inbox from './native/containers/Inbox';
import About from './native/containers/About';
import Settings from './native/containers/Settings';
import SearchByPrice from './native/containers/SearchByPrice';
import SearchByTime from './native/containers/SearchByTime';
import SearchByLocation from './native/containers/SearchByLocation';
import PersonalityTest from './native/containers/PersonalityTest';
import RateSitter from './native/containers/RateSitter';
import Menu from './native/containers/Menu';
import LoadingScreen from './native/containers/LoadingScreen';
import GoogleMapView from './native/containers/GoogleMapView';
import ErrorPage from './native/containers/ErrorPage';

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
                            <Scene key="App" component={App} title="App" initial={true} hideNavBar={true} animation='fade'/>
                            <Scene key="Splash" component={Splash} title="Splash" animation='fade' hideNavBar={true}/>
                            <Scene key="Login" component={Login} title="Login" animation='fade' hideNavBar={true}/>
                            <Scene key="Register" component={Register} title="Register" animation='fade' hideNavBar={true}/>
                            <Scene key="EditProfile" component={EditProfile} title="EditProfile" animation='fade'/>
                            <Scene key="Feed" component={Feed} title="Feed" passProps={true} animation='fade'/>
                            <Scene key="SitterProfileView" component={SitterProfileView} title="SitterProfileView" passProps={true} animation='fade'/>
                            <Scene key="Notifications" component={Notifications} title="Notifications" animation='fade'/>
                            <Scene key="Inbox" component={Inbox} title="Inbox" animation='fade'/>
                            <Scene key="PersonalityTest" component={PersonalityTest} title="PersonalityTest" animation='fade'/>
                            <Scene key="SearchByPrice" component={SearchByPrice} title="SearchByPrice" animation='fade'/>
                            <Scene key="SearchByTime" component={SearchByTime} title="SearchByTime" animation='fade'/>
                            <Scene key="SearchByLocation" component={SearchByLocation} title="SearchByLocation" animation='fade'/>
                            <Scene key="About" component={About} title="About" animation='fade'/>
                            <Scene key="Settings" component={Settings} title="Settings" animation='fade'/>
                            <Scene key="GoogleMapView" component={GoogleMapView} title="GoogleMapView" animation='fade'/>
                            <Scene key="ErrorPage" component={ErrorPage} title="ErrorPage" animation='fade'/>
                        </Scene>
                        <Scene key="SitterSendInvite" component={SitterSendInvite} title="SitterSendInvite" animation='fade'/>
                        <Scene key="RateSitter" component={RateSitter} title="RateSitter" animation='fade'/>
                        <Scene key="LoadingScreen" component={LoadingScreen} title="LoadingScreen" animation='fade'/>
                        <Scene key="Menu" component={Menu} title="Menu" animation='fade'/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Sitters', () => Sitters);