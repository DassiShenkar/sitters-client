import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import LocalStorage from '../utils/LocalStorage';
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';
import * as requestHandler from '../../src/utils/requestHandler'
import * as sittersApi from '../../src/sittersAPI/sittersAPI'

const ReactNative = require('react-native');

class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.getUserFromDb = this.getUserFromDb.bind(this);
        this.ifExists = this.ifExists.bind(this);
    }

    componentWillMount () {
        var self = this;
        ReactNative.I18nManager.allowRTL(false);
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
            requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: userId.toString()}, (res) => {
                if (res.data) {  // user exists
                    self.props.actionCreators.setParentData(res.data);
                    Actions.Feed();
                } else { // user not exist
                    Actions.Login();
                }
            });
        } else {
            requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: userId.toString()}, (res) => {
                if (res.data) {  // user exists
                    self.props.actionCreators.setSitterData(res.data);
                    Actions.Feed();
                } else { // user not exist
                    Actions.Login();
                }
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