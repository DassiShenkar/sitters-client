"use strict";

import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar'
import TextButton from '../components/TextButton'
import LocalStorage from '../utils/LocalStorage';
import * as actionCreators from '../../src/actions/actionCreators';
import * as SettingsActions from '../../src/actions/SettingsActions';


class Settings extends React.Component {

    constructor (props) {
        super(props);
        this.saveAndExit = this.saveAndExit.bind(this);
    }

    render () {
        return (
            <View>
                <AppBar
                    { ...this.props }/>
                <Text>Allow Notifications</Text>
                <Switch
                    onValueChange={(value) => this.props.settingsActions.setNotifications(value)}
                    value={this.props.settings.enableNotifications} />
                <Text>Allow Suggestions</Text>
                <Switch
                    onValueChange={(value) => this.props.settingsActions.setSuggestions(value)}
                    value={this.props.settings.enableSuggestions} />
                {
                    this.props.user.userType === "I'm a Sitter" ?
                    <View>
                        <Text>Show on search</Text>
                        <Switch
                            onValueChange={(value) => this.props.settingsActions.setShowOnSearch(value)}
                            value={true}/>
                    </View>
                    : null
                }
                <TextButton
                    onPress={this.saveAndExit}
                    styles={styles.button}
                    text='Cancel' />
            </View>
        );
    }
    saveAndExit() {
        const self = this;
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            if (userId) {
                AsyncStorage.getItem(LocalStorage.USER_TYPE, function(error, userType) {
                    console.log(userType);
                    let path;
                    if (userType == 'parent') {
                        path = 'parent/get';
                    } else {
                        path = 'sitter/get';
                    }
                    axios({
                        method: 'post',
                        // url: 'https://sitters-server.herokuapp.com/' + path,
                        url: 'http://10.0.0.1:4444/' + path,
                        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        data: {_id: userId.toString()}
                    }).then(function (user) {
                        if (user.data) {  // user exists
                            user.data.settings = {
                                allowNotification: self.props.settings.enableNotifications,
                                allowSuggestions: self.props.settings.enableSuggestions
                            };
                            user.data.senderGCM.valid = user.data.settings.allowNotification;
                            let updatePath = user.data.isParent ? 'parent/update' : 'sitter/update';
                            axios({
                                method: 'post',
                                url: 'http://10.0.0.1:4444/' + updatePath,
                                // url: 'https://sitters-server.herokuapp.com/' + updatePath,
                                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                data: user.data
                            }).then(function (res) {
                                if (res.data) {
                                    Actions.pop();
                                }
                                else {
                                    console.log('user not created');
                                    Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                                }
                            }).catch(function (error) {
                                console.log(error);
                                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                            });
                        } else {

                        }
                    }).catch(function(error) {
                        console.log(error);
                        Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                    });
                });
            }
        });
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        settings: state.settings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        settingsActions: bindActionCreators(SettingsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

