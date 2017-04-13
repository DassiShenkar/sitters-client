import React, { Component } from 'react';
import { View, BackAndroid, Navigator } from 'react-native';
import LocalStorage from '../utils/LoaclStorage';
import Logo from '../components/Logo'
const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator} />
        );
    }

    componentWillMount() {
        var id = 'Login';
        var ret = this.ifExists();
        if (ret) id = 'Feed';
        // TODO: get user type from db
        var navigator = this.props.navigator;
        setTimeout(() => {
            navigator.replace({
                id: id,
                passProps: {},
                type: 'NORMAL'
            });
        }, 1000);
    }

    renderScene(route, navigator) {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator.getCurrentRoutes().length === 1  ) {
                return false;
            }
            this.props.navigator.pop();
            return true;
        });
        return (
            <View>
                <Logo
                    companyName='Sitters' />
            </View>
        );
    }

    async ifExists () {
        let accessToken = await LocalStorage.getFromLocalStorage(LocalStorage.FACEBOOK_KEY);
        if (accessToken == null) {
            return false;
        } else {
            const responseInfoCallback = (error, result) => {
                if (error) {
                    return false;
                } else {
                    return true;
                }
            };

            const params = {
                parameters: {
                    fields: {
                        string: "email"
                    },
                    access_token: {
                        string: accessToken
                    }
                }
            };

            const infoRequest = new GraphRequest('/me', params, responseInfoCallback);
            new GraphRequestManager().addRequest(infoRequest).start();
        }
    }
}