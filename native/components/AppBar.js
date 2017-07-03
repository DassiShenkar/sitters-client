"use strict";
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageButton from './ImageButton'
import * as RouterActions from '../actions/RouterActions'

class AppBar extends React.Component {

    constructor (props) {
        super(props);
        // this.search = this.search.bind(this);
        this.menu = this.menu.bind(this);
        this.getSitterNow = this.getSitterNow.bind(this);
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
                <View
                    style={this.props.user.userType === "I'm a Parent" ? styles.parentInnerContainer : styles.innerContainer}>
                    {
                        this.props.user.userType === "I'm a Parent" ?
                            <Icon.Button name="mobile" size={28} backgroundColor="#fff" color="#8c8c8c" onPress={this.getSitterNow} /> : null
                    }
                    {
                        this.props.user.userType === "I'm a Parent" ?
                        <Icon.Button name="search" size={28} backgroundColor="#fff" color="#8c8c8c" onPress={this.search} /> : null
                    }
                    <Icon.Button name="bell-o" size={28} backgroundColor="#fff" color="#8c8c8c" onPress={Actions.Notifications} />
                    <Icon.Button name="envelope-o" size={28} backgroundColor="#fff" color="#8c8c8c" onPress={Actions.Inbox} />
                    <Icon.Button name="ellipsis-v" size={28} backgroundColor="#fff" color="#8c8c8c" onPress={this.menu} />
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

    getSitterNow() {
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/parent/getSitterNow',
            url: 'http://192.168.1.70:4444/parent/getSitterNow',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: this.props.user._id.toString()}
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#8c8c8c',
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
        marginRight: 20
    },
    parentInnerContainer: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius:100
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