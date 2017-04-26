"use strict";

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { MenuContext} from 'react-native-menu';

import DropDownMenu from './DropDownMenu'
import ImageButton from './ImageButton'
import SearchIcon from '../../src/styles/icons/Search'
import NotificationIcon from '../../src/styles/icons/Notification'
import MailIcon from '../../src/styles/icons/Mail'

export default class AppBar extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flexDirection: 'row-reverse', padding: 5,justifyContent: 'space-between', shadowColor: '#000', borderBottomColor: '#000', borderStyle: 'solid', borderWidth: 1}}>
                <ImageButton
                    onPress={Actions.Feed}
                    styles={{width: 50, height: 50,borderRadius:100}}
                    src={ this.props.user.profilePicture ? { uri: this.props.user.profilePicture } : { uri: 'https://facebook.github.io/react/img/logo_og.png' }}  />
                <Text style={{marginLeft: 90, marginTop:20}}>Hi, { this.props.user.name.split(" ")[0] }</Text>
                <View style={{ flexDirection: 'row-reverse'}}>
                    <ImageButton
                        onPress={Actions.Search}
                        styles={{width: 30, height: 30, marginRight: 10}}
                        src={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                    <ImageButton
                        onPress={Actions.Inbox}
                        styles={{width: 30, height: 30, marginRight: 10}}
                        src={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                    <ImageButton
                        onPress={Actions.Notifications}
                        styles={{width: 30, height: 30, marginRight: 10}}
                        src={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
                    <MenuContext style={{ flex: 1 }}>
                        <DropDownMenu />
                    </MenuContext>
                </View>

            </View>
        );
    }
}