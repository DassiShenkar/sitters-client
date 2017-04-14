import React, { Component } from 'react';
import { View, BackAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'
import LocalStorage from '../utils/LoaclStorage';
import Logo from '../components/Logo'
import axios from 'axios';

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.ifExists = this.ifExists.bind(this);
    }

    componentWillMount () {
        var self = this;
        setTimeout(function() {
            self.ifExists();
        }, 1000);
    }

    render() {
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
            Actions.Login();
        } else {
            var self = this;
            const responseInfoCallback = (error, result) => {
                if (error) {
                    alert(error.toString());
                } else {
                    axios.post('https://sitters-server.herokuapp.com/parent/get', { id: result.id })
                        .then(function (res) {
                            if (res.data) {  // user exists
                                self.props.actions.actionCreators.setUserData(res.data);
                                Actions.Feed();
                            } else { // user not exist
                                self.props.actions.actionCreators.createUser(result);
                                Actions.Feed();
                                // Actions.Register();
                            }
                        })
                        .catch(function (error) {
                            alert(error.toString());
                        });
                }
            };

            const params = {
                parameters: {
                    fields: {
                        string: "id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
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