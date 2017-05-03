"use strict";

import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar'
import TextButton from '../components/TextButton'
import * as actionCreators from '../../src/actions/actionCreators';


class Settings extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            notifications: true,
            suggestions: true,
            show: true,
        };
    }

    render () {
        return (
            <View>
                <AppBar
                    { ...this.props }/>
                <Text>Allow Notifications</Text>
                <Switch
                    onValueChange={(value) => this.setState({notifications: value})}
                    value={this.state.notifications} />
                <Text>Allow Suggestions</Text>
                <Switch
                    onValueChange={(value) => this.setState({suggestions: value})}
                    value={this.state.suggestions} />
                <Text>Show on search</Text>
                <Switch
                    style={ this.props.userType === "I'm a Parent" ? styles.hiddenContainer : null }
                    onValueChange={(value) => this.setState({show: value})}
                    value={this.state.show} />
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
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

