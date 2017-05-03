"use strict";
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { MenuContext} from 'react-native-menu';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import ImageButton from './ImageButton'
import * as RouterActions from '../actions/RouterActions'

class AppBar extends React.Component {

    constructor (props) {
        super(props);
        this.search = this.search.bind(this);
        this.menu = this.menu.bind(this);
    }

    render () {
        if(this.props.router.validFlag) {
            this.props.routerActions.changeValidFlag(false);
            switch(this.props.router.scene) {
                case 'register':
                    Actions.Register({ registered: true });
                    break;
                case 'settings':
                    Actions.Settings();
                    break;
                case 'about':
                    Actions.About();
                    break;
                case 'login':
                    Actions.Login();
                    break;
                default:
                    break;
            }
            return null;
        } else {
            let notify = function() {
                if(this.props.user.invites && this.props.feed.invites.length > 0) {
                    this.props.feed.invites.map(function(invite) {
                        if(!invite.wasRead) {
                            return true;
                        }
                    });
                    return false;
                } else {
                    return false;
                }
            };

            return (
                <View style={ styles.container }>
                    <ImageButton
                        onPress={ Actions.Feed }
                        styles={ styles.profilePic }
                        src={ this.props.user.profilePicture ? { uri: this.props.user.profilePicture } : { uri: 'https://facebook.github.io/react/img/logo_og.png' }}/>
                    <Text
                        style={{marginLeft: 30, marginRight: 10, marginTop:20}}>Hi, { this.props.user.name.split(" ")[0] }</Text>
                    <View
                        style={{ width: 160, flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 10 }}>
                        <ImageButton
                            onPress={this.search}
                            styles={ styles.icons }
                            src={require('../style/icons/search.png')}/>
                        <ImageButton
                            onPress={Actions.Inbox}
                            styles={ styles.icons }
                            src={require('../style/icons/inbox.png')}>
                            {notify ? <Image style={ styles.inboxBadge }
                                             source={require('../style/icons/redCircle.png')}/> : null}
                        </ImageButton>
                        <ImageButton
                            onPress={Actions.Notifications}
                            styles={ styles.icons }
                            src={require('../style/icons/notification.png')}>
                            {notify ? <Image style={ styles.notificationBadge }
                                             source={require('../style/icons/redCircle.png')}/> : null}
                        </ImageButton>
                        <ImageButton
                            onPress={this.menu}
                            styles={ styles.icons }
                            src={require('../style/icons/menu.png')}/>
                    </View>
                </View>
            );
        }
    }

    search() {
        Actions.Search({index: 0});
    }

    menu() {
        Actions.Menu({hide: false});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        padding: 10,
        justifyContent: 'space-between',
        shadowColor: '#000',
        borderBottomColor: '#000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius:100
    },
    icons: {
        width: 30,
        height: 30
    },
    notificationBadge: {
        width: 10,
        height: 10,
        borderRadius: 100,
        left: 20,
        top: 20
    },
    inboxBadge: {
        width: 10,
        height: 10,
        borderRadius: 100,
        left: 20,
        top: 20
    }
});

function mapStateToProps(state) {
    return {
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);