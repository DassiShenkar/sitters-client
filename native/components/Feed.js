"use strict";
import React, { Component } from 'react';
import { View, StatusBar, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Text>Maching Score</Text>
                <TouchableWithoutFeedback onPress={alert('SitterProfile')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableWithoutFeedback>
                <Text>Sitter Name</Text>
                <TouchableWithoutFeedback onPress={alert('sendInvite')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={alert('rate')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={alert('dontKnow')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}