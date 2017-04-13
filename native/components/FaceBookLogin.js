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
                            alert("click");
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                alert("Login was successful with permissions: " + result.grantedPermissions);
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        LocalStorage.setToLocalStorage(LocalStorage.FACEBOOK_KEY, data.accessToken.toString());
                                        alert(data.accessToken.toString());
                                        alert("start Graph API Request");
                                        const responseInfoCallback = (error, result) => {
                                            if (error) {
                                                console.log(error);
                                                alert('Error fetching data: ' + error.toString());
                                            } else {
                                                console.log(result);
                                                alert('Success fetching data: ' + result.toString());
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
        alert(id);
        this.props.navigator.push(navObj);
    }
}

