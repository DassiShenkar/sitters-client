"use strict";
import React, { Component } from 'react';
import { View, StatusBar, Text, Image, Navigator, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Hamburger from '../components/Hamburger'

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Maching Score</Text>
                <TouchableOpacity onPress={Actions.SitterProfileView}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
                <Text>Sitter Name</Text>
                <TouchableOpacity onPress={Actions.SitterSendInvite}>
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
                <TouchableOpacity onPress={Actions.refresh(/*TODO: remove sitter from view*/)}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

// var NavigationBarRouteMapper = {
//     LeftButton(route, navigator, index, navState) {
//         return (
//             <View>
//                 <TouchableOpacity onPress={console.log('user image')}>
//                     <Image
//                         style={{width: 20, height: 20}}
//                         source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
//                     />
//                 </TouchableOpacity>
//                 <Text>Hi, User</Text>
//             </View>
//         );
//     },
//     RightButton(route, navigator, index, navState) {
//         return (
//             <View>
//                 <Hamburger />
//                 <TouchableOpacity onPress={console.log('notification')}>
//                     <Image
//                         style={{width: 10, height: 10}}
//                         source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={console.log('inbox')}>
//                     <Image
//                         style={{width: 10, height: 10}}
//                         source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
//                     />
//                 </TouchableOpacity>
//             </View>
//         );
//     },
//     Title(route, navigator, index, navState) {
//         return (
//            <View />
//         );
//     }
// };