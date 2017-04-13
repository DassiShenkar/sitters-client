"use strict";
import React, {Component} from 'react'
import {View} from 'react-native'
import LocalStorage from '../utils/LoaclStorage'

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
    }
    
    render () {
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
                                                console.log(error);
                                            } else {
                                                console.log(result);
                                                this.navigate();
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

    navigate () {
        var id = 'Register';
        // TODO: authenticate user or create one if needed
        var navObj = {
            id: id,
            passProps: {
                userType: 'Parent'
            },
            type: 'NORMAL'
        };
        this.props.navigator.push(navObj);
    }
}

