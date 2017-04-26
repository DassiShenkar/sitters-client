"use strict";
import React, {Component} from 'react'
import {View} from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios';

import LocalStorage from '../utils/LocalStorage'

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    GraphRequest,
    GraphRequestManager,
    AccessToken
} = FBSDK;

export default class FaceBookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.handleResponse = this.handleResponse.bind(this);
    }
    
    render () {
        const self = this;
        return (
            <LoginButton
                readPermissions={["user_birthday","public_profile","user_location","user_education_history","user_likes","email"]}
                // publishPermissions={["user_birthday","public_profile","user_location","user_education_history","user_likes","email"]}
                onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        LocalStorage.setToLocalStorage(LocalStorage.FACEBOOK_KEY, data.accessToken.toString());
                                        const responseInfoCallback = (error, result) => {
                                            if (error) {
                                                alert(error);
                                            } else {
                                                alert(JSON.stringify(result));
                                                LocalStorage.setToLocalStorage(LocalStorage.USER_KEY, result.id.toString());
                                                self.handleResponse(result);
                                            }
                                        };
                                        const params = {
                                            parameters: {
                                                fields: {
                                                    string: "id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
                                                },
                                                access_token: {
                                                    string: data.accessToken.toString()
                                                }
                                            }
                                        };

                                        const infoRequest = new GraphRequest('/me', params, responseInfoCallback);
                                        new GraphRequestManager().addRequest(infoRequest).start();
                                    }
                                );
                            }
                        }
                }
                onLogoutFinished={() => alert("User logged out")}/>
        );
    }

    async handleResponse (result) {
        const self = this;
        axios.post('https://sitters-server.herokuapp.com/parent/get', { id: result.id.toString() })
            .then(function (res) {
                if (res.data) {  // user exists
                    self.props.actionCreators.setUserData(res.data);
                    Actions.Feed();
                }
                else { // user not exist
                    self.props.actionCreators.createUser(result);
                    Actions.Register();
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

