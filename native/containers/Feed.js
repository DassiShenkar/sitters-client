"use strict";
import React, { Component } from 'react';
import { View, StatusBar, Text, Image, Navigator, TouchableOpacity } from 'react-native';
import Hamburger from '../components/Hamburger'
export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#F1F1F1', alignItems: 'center'}}
                    routeMapper={NavigationBarRouteMapper} />
                }
            />
        );
    }

    renderScene (route, navigator) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Maching Score</Text>
                <TouchableOpacity onPress={console.log('SitterProfile')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <Text>Sitter Name</Text>
                <TouchableOpacity onPress={this.navigateSendInvite.bind(this)}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={console.log('rate')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={console.log('remove')}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    navigateSendInvite () {
        var id = 'SitterSendInvite';
        // TODO: add user to DB
        var navObj = {
            id: id,
            passProps: {
                userType: 'Parent'
            },
            type: 'NORMAL'
        };
        this.props.navigator.push(navObj);
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <View>
                <TouchableOpacity onPress={console.log('user image')}>
                    <Image
                        style={{width: 20, height: 20}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <Text>Hi, User</Text>
            </View>
        );
    },
    RightButton(route, navigator, index, navState) {
        return (
            <View>
                <Hamburger />
                <TouchableOpacity onPress={console.log('notification')}>
                    <Image
                        style={{width: 10, height: 10}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={console.log('inbox')}>
                    <Image
                        style={{width: 10, height: 10}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
            </View>
        );
    },
    Title(route, navigator, index, navState) {
        return (
           <View />
        );
    }
};