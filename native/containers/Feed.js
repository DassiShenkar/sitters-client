"use strict";
import React, { Component } from 'react';
import { View, StatusBar, Text, Image, Navigator, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

import AppBar from '../components/AppBar'
import ImageButton from '../components/ImageButton'

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AppBar />
                <Text>Maching Score</Text>
                <ImageButton
                    onPress={Actions.SitterProfileView}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <Text>Sitter Name</Text>
                <ImageButton
                    onPress={Actions.SitterSendInvite}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <ImageButton
                    onPress={Actions.RateSitter}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <ImageButton
                    onPress={Actions.refresh}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            </View>
        );
    }
}