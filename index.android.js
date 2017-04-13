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
                            <Scene key="GoogleMapView" component={GoogleMapView} title="GoogleMapView"/>
                        </Scene>
                        <Scene key="SitterSendInvite" component={SitterSendInvite} title="SitterSendInvite"/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Sitters', () => Sitters);