"use strict";

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'

import DropDownMenu from './DropDownMenu'
import ImageButton from './ImageButton'

export default class AppBar extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 15}}>
                <ImageButton
                    onPress={Actions.Feed}
                    styles={{width: 30, height: 30}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <Text>Hi, User</Text>
                <ImageButton
                    onPress={Actions.Search}
                    styles={{width: 30, height: 30}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <ImageButton
                    onPress={Actions.Inbox}
                    styles={{width: 30, height: 30}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <ImageButton
                    onPress={Actions.Notifications}
                    styles={{width: 30, height: 30}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <DropDownMenu />
            </View>
        );
    }
}