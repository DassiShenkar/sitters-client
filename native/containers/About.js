"use strict";

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import AppBar from '../components/AppBar'
import Logo from '../components/Logo'

export default class PriceSearch extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <AppBar />
                <Logo
                    companyName="Sitters"/>
                <Text>Version</Text>
                <Text>All rights reserved</Text>
            </View>
        );
    }
}