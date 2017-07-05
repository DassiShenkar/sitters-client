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
import Settings from './native/containers/Settings';
import SearchByPrice from './native/containers/SearchByPrice';
import SearchByTime from './native/containers/SearchByTime';
import SearchByLocation from './native/containers/SearchByLocation';
import RateSitter from './native/containers/RateSitter';
import Menu from './native/containers/Menu';
import Invite from './native/containers/Invite';
import Notification from './native/containers/Notification';
import LoadingScreen from './native/components/LoadingScreen';
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
                            <Scene key="SearchByPrice" component={SearchByPrice} title="SearchByPrice" animation='fade'/>
                            <Scene key="SearchByTime" component={SearchByTime} title="SearchByTime" animation='fade'/>
                            <Scene key="SearchByLocation" component={SearchByLocation} title="SearchByLocation" animation='fade' hideNavBar={true}/>
                            <Scene key="Settings" component={Settings} title="Settings" animation='fade'/>
                            <Scene key="ErrorPage" component={ErrorPage} title="ErrorPage" animation='fade'/>
                        </Scene>
                        <Scene key="SitterSendInvite" component={SitterSendInvite} title="SitterSendInvite" animation='fade'/>
                        <Scene key="RateSitter" component={RateSitter} title="RateSitter" animation='fade'/>
                        <Scene key="LoadingScreen" component={LoadingScreen} title="LoadingScreen" animation='fade'/>
                        <Scene key="Menu" component={Menu} title="Menu" animation='fade'/>
                        <Scene key="Invite" component={Invite} title="Invite" animation='fade'/>
                        <Scene key="Notification" component={Notification} title="Notification" animation='fade'/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Sitters', () => Sitters);