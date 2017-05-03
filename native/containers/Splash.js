import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import axios from 'axios';

import LocalStorage from '../utils/LocalStorage';
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.getUserFromDb = this.getUserFromDb.bind(this);
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
            <View style={ styles.container }>
                <Logo
                    companyName="Sitters"
                    description="A Booking Platform for Parents and Sitters" />
                <Text style={ styles.text }>A Booking Platform for Parents and Sitters</Text>
            </View>
        );
    }

    async ifExists () {
        const self = this;
        let accessToken = await LocalStorage.getFromLocalStorage(LocalStorage.FACEBOOK_KEY);
        let userId = await LocalStorage.getFromLocalStorage(LocalStorage.USER_KEY);
        if (accessToken == null || userId == null) {
            Actions.Login();
        } else {
            const responseInfoCallback = (error, result) => {
                if (error) {
                    console.log(error);
                    Actions.ErrorPage({errorNum: 500, errorMsg: 'Facebook Error, please try again later'});
                } else {
                    self.getUserFromDb(self, result);
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

    async getUserFromDb(self, result) {
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/parent/get',
            url: 'https://sittersdev.herokuapp.com/parent/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: result.id.toString()}
        }).then(function (res) {
            if (res.data) {  // user exists
                self.props.actionCreators.setUserData(res.data);
                Actions.Feed();
            } else { // user not exist
                self.props.actionCreators.createUser(result);
                Actions.Register();
            }
        }).catch(function (error) {
            console.log(error);
            Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error, please try again later'});
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    text: {
        fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
        fontSize: 16,
        color: '#f7a1a1'
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);