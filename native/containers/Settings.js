"use strict";

import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar'
import TextButton from '../components/TextButton'
import * as actionCreators from '../../src/actions/actionCreators';
import * as SettingsActions from '../../src/actions/SettingsActions';


class Settings extends React.Component {

    constructor (props) {
        super(props);
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
                    this.props.userType === "I'm a parent" ?
                    <View>
                        <Text>Show on search</Text>
                        <Switch
                            onValueChange={(value) => {}}
                            value={true}/>
                    </View>
                    : null
                }
                <TextButton
                    onPress={Actions.pop}
                    styles={{ fontSize: 20, marginBottom: 10, backgroundColor: '#f7a1a1', color: '#fff', padding: 5, borderRadius: 10 }}
                    text='Cancel' />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    // This pushes the view out of the viewport, but why the negative bottom?
    hiddenContainer: {
        top: window.height,
        bottom: -window.height
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

