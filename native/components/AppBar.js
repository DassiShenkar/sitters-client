"use strict";
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ToolbarAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { MenuContext} from 'react-native-menu';

import DropDownMenu from './DropDownMenu'
import ImageButton from './ImageButton'

export default class AppBar extends React.Component {

    constructor (props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    render () {
        return (
            <View style={
                {
                    flexDirection: 'row-reverse',
                    padding: 5,
                    justifyContent: 'space-between',
                    shadowColor: '#000',
                    borderBottomColor: '#000',
                    borderTopColor: '#fff',
                    borderLeftColor: '#fff',
                    borderRightColor: '#fff',
                    borderStyle: 'solid',
                    borderWidth: 1
                }
            }>
                <ImageButton
                    onPress={Actions.Feed}
                    styles={{width: 50, height: 50,borderRadius:100}}
                    src={ this.props.user.profilePicture ? { uri: this.props.user.profilePicture } : { uri: 'https://facebook.github.io/react/img/logo_og.png' }}  />
                <Text style={{marginLeft: 30, marginRight: 10, marginTop:20}}>Hi, { this.props.user.name.split(" ")[0] }</Text>
                <View style={{ width: 160, flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 15 }}>
                    <ImageButton
                        onPress={Actions.Search}
                        styles={{width: 30, height: 30}}
                        src={require('../style/icons/search.png')} />
                    <ImageButton
                        onPress={Actions.Inbox}
                        styles={{width: 30, height: 30}}
                        src={require('../style/icons/inbox.png')} />
                    <ImageButton
                        onPress={Actions.Notifications}
                        styles={{width: 30, height: 30}}
                        src={require('../style/icons/notification.png')} />
                    <ImageButton
                        onPress={this.toggleMenu}
                        styles={{width: 30, height: 30}}
                        src={require('../style/icons/menu.png')} />
                </View>
            </View>
        );
    }

    toggleMenu() {

    }
}
// <MenuContext style={{ flex: 1, width: 30, height: 30 }}>
//     <DropDownMenu />
// </MenuContext>