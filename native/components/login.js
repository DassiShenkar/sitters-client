"use strict";
import React, {Component} from 'react'
import {View} from 'react-native'
import Feed from './Feed'
import Register from './Register'
import LocalStorage from './LoaclStorage'

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    GraphRequest,
    GraphRequestManager,
    AccessToken
} = FBSDK;

var Login = React.createClass({
    render: function () {
        const { navigate } = this.props.navigation;
        return (
            <View>
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
                                        // navigate('Feed', { userType: 'Parent' });
                                        navigate('Register', { userType: 'Parent' });
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

                                const infoRequest = new GraphRequest(
                                    '/me',
                                    params,
                                    responseInfoCallback
                                );


                                new GraphRequestManager().addRequest(infoRequest).start();
                              }
                            );
                          }
                        }
                      }
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
});

export default Login;
