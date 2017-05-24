"use strict";
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios';

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
                console.log(result);
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            LocalStorage.setToLocalStorage(LocalStorage.FACEBOOK_KEY, data.accessToken.toString());
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error);
                                    Actions.ErrorPage({errorNum: 500, errorMsg: 'Facebook login Error, please try again later'});
                                } else {
                                    LocalStorage.setToLocalStorage(LocalStorage.USER_KEY, result.id.toString());
                                    self.props.actionCreators.createUser(result);
                                    Actions.Register();
                                    //self.handleResponse(result);
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

    async handleResponse (result) {
        const self = this;
        console.log(result);
        axios.post('https://sittersdev.herokuapp.com/parent/get', { _id: result.id.toString() })
            .then(function (res) {
                console.log(res);
                if (res.data) {  // user exists
                    if(user.friends.data.length > response.data.mutualFriends.length){
                        let parent = response.data;
                        parent.mutualFriends = user.friends.data;
                        axios({
                            method: 'post',
                            url: 'https://sittersdev.herokuapp.com/parent/updateMutualFriends',
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: parent
                        })
                            .then(function (response) {
                                self.props.actionCreators.setUserData(res.data);
                                Actions.Feed();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        self.props.actionCreators.setUserData(res.data);
                        Actions.Feed();
                    }
                }
                else { // user not exist
                    self.props.actionCreators.createUser(result);
                    Actions.Register();
                }
            })
            .catch(function (error) {
                console.log(error);
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error, please try again later'});
            });
    }
}

const styles = StyleSheet.create({
    button:  {
        fontSize: 14,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 15,
        borderRadius: 40
    }
});