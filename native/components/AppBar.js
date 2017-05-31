"use strict";
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import ImageButton from './ImageButton'
import * as RouterActions from '../actions/RouterActions'

class AppBar extends React.Component {

    constructor (props) {
        super(props);
        // this.search = this.search.bind(this);
        this.menu = this.menu.bind(this);
    }

    componentDidUpdate () {
        var self = this;
        if(self.props.router.validFlag) {
            this.props.routerActions.changeValidFlag(false);
            self.route(self.props.router.scene);
        }
    }

    route(scene) {
        switch(scene) {
            case 'register':
                Actions.EditProfile();
                break;
            case 'settings':
                Actions.Settings();
                break;
            case 'login':
                Actions.Login();
                break;
            default:
                break;
        }
    }

    render () {
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
                    src={ this.props.user.profilePicture ? { uri: this.props.user.profilePicture } : null}/>
                <Text style={styles.text}>Hi, { this.props.user.name.split(" ")[0] }</Text>
                <View
                    style={this.props.user.userType === "I'm a parent" ? styles.parentInnerContainer : styles.innerContainer}>
                    {
                        this.props.user.userType === "I'm a parent" ?
                            <ImageButton
                            onPress={this.search}
                            styles={ styles.icons }
                            src={require('../style/icons/search.png')}/> :
                            null
                    }
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

    search() {
        Actions.SearchByPrice({active: 1});
    }

    menu() {
        Actions.Menu({hide: false});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    innerContainer: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    parentInnerContainer: {
        width: 160,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
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
    text: {
        marginLeft: 10,
        marginRight: 30,
        marginTop: 20
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