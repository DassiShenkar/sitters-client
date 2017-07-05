import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import axios from 'axios';

import LocalStorage from '../utils/LocalStorage';
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';

const ReactNative = require('react-native');

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
        try {
            ReactNative.I18nManager.allowRTL(false);
        } catch (e) {
            console.log(e);
        }
        const self = this;
        let userId = await LocalStorage.getFromLocalStorage(LocalStorage.USER_KEY);
        let userType = await LocalStorage.getFromLocalStorage(LocalStorage.USER_TYPE);
        if (userId == null) {
            Actions.Login();
        } else {
            self.getUserFromDb(self, userId, userType);
        }
    }

    getUserFromDb(self, userId, userType) {
        if(userType === 'parent'){
            axios({
                method: 'post',
                // url: 'https://sitters-server.herokuapp.com/parent/get',
                url: 'http://10.0.0.1:4444/parent/get',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: userId.toString()}
            }).then(function (res) {
                if (res.data) {  // user exists
                    self.props.actionCreators.setParentData(res.data);
                    Actions.Feed();
                } else { // user not exist
                    Actions.Login();
                }
            }).catch(function (error) {
                console.log(error);
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error, please try again later'});
            });
        } else {
            axios({
                method: 'post',
                // url: 'https://sitters-server.herokuapp.com/sitter/get',
                url: 'http://10.0.0.1:4444/sitter/get',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: userId.toString()}
            }).then(function (res) {
                if (res.data) {  // user exists
                    self.props.actionCreators.setSitterData(res.data);
                    Actions.Feed();
                } else { // user not exist
                    Actions.Login();
                }
            }).catch(function (error) {
                console.log(error);
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error, please try again later'});
            });
        }
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
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: '#f86966'
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