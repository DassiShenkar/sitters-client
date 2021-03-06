"use strict";

import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar'
import TextButton from '../components/TextButton'
import LocalStorage from '../utils/LocalStorage';
import * as actionCreators from '../../src/actions/actionCreators';
import * as SettingsActions from '../../src/components/base/pages/settings/action';
import * as requestHandler from '../../src/utils/requestHandler'
import * as sittersApi from '../../src/sittersAPI/sittersAPI'


class Settings extends React.Component {

    constructor (props) {
        super(props);
        this.saveAndExit = this.saveAndExit.bind(this);
    }

    saveAndExit() {
        const self = this;
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            if (userId) {
                requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: userId.toString()}, (user) => {
                    if (user.data) {  // user exists
                        user.data.settings = {
                            allowNotification: self.props.settings.enableNotifications,
                            allowSuggestions: self.props.settings.enableSuggestions
                        };
                        user.data.senderGCM.valid = user.data.settings.allowNotification;
                        requestHandler.request('put', sittersApi.UPDATE_USER, user.data, (res) => {
                            if (res.data) {
                                Actions.pop();
                            } else {
                                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                            }
                        });
                    } else {
                        Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                    }
                });
            }
        });
    }

    render () {
        return (
            <View >
                <AppBar
                    { ...this.props }/>
                <View style={{ padding: 20 }}>
                    <View style={styles.container}>
                        <Text style={styles.pickerText}>Allow Notifications</Text>
                            <Switch
                                tintColor="#f86966"
                                thumbTintColor="#f86966"
                                onTintColor="#f86966"
                                onValueChange={(value) => this.props.settingsActions.setNotifications(value)}
                                value={this.props.settings.enableNotifications} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.pickerText}>Allow Suggestions</Text>
                        <Switch
                            onValueChange={(value) => this.props.settingsActions.setSuggestions(value)}
                            tintColor="#f86966"
                            thumbTintColor="#f86966"
                            onTintColor="#f86966"
                            value={this.props.settings.enableSuggestions} />
                    </View>
                    {
                        this.props.user.userType === "I'm a Sitter" ?
                        <View style={styles.container}>
                            <Text style={styles.pickerText}>Show on search</Text>
                            <Switch
                                tintColor="#f86966"
                                thumbTintColor="#f86966"
                                onTintColor="#f86966"
                                onValueChange={(value) => this.props.settingsActions.setShowOnSearch(value)}
                                value={true}/>
                        </View>
                        : null
                    }
                    <TextButton
                        onPress={this.saveAndExit}
                        styles={styles.button}
                        text='Save' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: '#f86966',
        fontFamily: 'OpenSans-Regular',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        width: 100,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 350
    },
    pickerText: {
        color: '#f86966',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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

