"use strict";
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
// import axios from 'axios';

import * as requestHandler from '../../src/utils/requestHandler'
import * as sittersApi from '../../src/sittersAPI/sittersAPI'
import LocalStorage from '../utils/LocalStorage'

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    LoginManager,
    GraphRequestManager,
    AccessToken
} = FBSDK;

import TextButton from './TextButton'

export default class FaceBookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.handleResponse = this.handleResponse.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    async handleResponse (result) {
        const self = this;
        console.log(self.props.user.userType);
        if(self.props.user.userType === "I'm a Parent") {
            requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: result.id.toString()}, (res) => {
                if (res.data) {  // user exists
                    if (result.friends.data.length > res.data.friends.length) {
                        let parent = result.data;
                        parent.mutualFriends = user.friends.data;
                        requestHandler.request('put', sittersApi.sittersApi.UPDATE_FRIENDS, parent, () => {
                            self.props.actionCreators.setParentData(res.data);
                            Actions.Feed();
                        })
                    } else {
                        self.props.actionCreators.setParentData(res.data);
                        Actions.Feed();
                    }
                } else {
                    self.props.actionCreators.createUser(result);
                    Actions.Register();
                }
            });
        } else {
            requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: result.id.toString()}, (res) => {
                if (res.data) {  // user exists
                    if (result.friends.data.length > res.data.friends.length) {
                        let parent = result.data;
                        parent.mutualFriends = user.friends.data;
                        requestHandler.request('put', sittersApi.sittersApi.UPDATE_FRIENDS, parent, () => {
                            self.props.actionCreators.setSitterData(res.data);
                            Actions.Feed();
                        })
                    } else {
                        self.props.actionCreators.setSitterData(res.data);
                        Actions.Feed();
                    }
                } else {
                    self.props.actionCreators.createUser(result);
                    Actions.Register();
                }
            });
        }
    }

    render () {
        return (
            <TextButton
                onPress={this.facebookLogin}
                styles={styles.button}
                text='Login with Facebook' />
        );
    }

    facebookLogin() {
        const self = this;
        LoginManager.logOut();
        LoginManager.logInWithReadPermissions(["user_birthday,public_profile,user_location,user_education_history,user_likes,email,user_friends"]).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error);
                                    Actions.ErrorPage({errorNum: 500, errorMsg: 'Facebook login Error, please try again later'});
                                } else {
                                    LocalStorage.setToLocalStorage(LocalStorage.USER_KEY, result.id.toString());
                                    LocalStorage.setToLocalStorage(LocalStorage.USER_TYPE, self.props.user.userType === "I'm a Parent" ? 'parent' : 'sitter');
                                    self.handleResponse(result);
                                }
                            };
                            const params = {
                                parameters: {
                                    fields: {
                                        string: "id,name,email,cover,birthday,currency,education,gender,friends,friendlists,languages,location,timezone,picture.width(500).height(500)"
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
            },
            function(error) {
                console.log("Login failed with error: " + error);
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Facebook login Error, please try again later'});
            }
        );
    }
}

const styles = StyleSheet.create({
    button:  {
        fontSize: 14,
        backgroundColor: '#f86966',
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        padding: 15,
        borderRadius: 40
    }
});