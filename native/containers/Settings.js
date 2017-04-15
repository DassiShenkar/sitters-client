"use strict";

import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import AppBar from '../components/AppBar'

export default class PriceSearch extends React.Component {

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
                <AppBar />
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
                    style={ this.props.userType === 'Parent' ? styles.hiddenContainer : {} }
                    onValueChange={(value) => this.setState({show: value})}
                    value={this.state.show} />
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