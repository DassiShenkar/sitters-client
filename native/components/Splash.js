import LocalStorage from './LoaclStorage';
import React, { Component } from 'react';
import { View } from 'react-native';
import App from './App'
import Feed from './Feed'

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
            <View>
                {this.ifExists() ? <Feed navigation={this.props.navigation} /> : <App navigation={this.props.navigation} />}
            </View>
        );
    }

    async ifExists () {
        let accessToken = await LocalStorage.getFromLocalStorage(LocalStorage.FACEBOOK_KEY);
        if(accessToken == null) {
            return false;
        } else {
            alert("start Graph API Request");
            const responseInfoCallback = (error, result) => {
                if (error) {
                    alert('Error fetching data: ' + error.toString());
                    return false;
                } else {
                    alert('Success fetching data: ' + result.toString());
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
// {alert(this.ifExists())}