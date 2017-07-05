"use strict";
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageButton from './ImageButton';
import * as RouterActions from '../actions/RouterActions';
import * as InviteActions from '../../src/actions/InviteActions';
import * as FeedActions from '../../src/actions/FeedActions';

class AppBar extends React.Component {

    constructor (props) {
        super(props);
        // this.search = this.search.bind(this);
        this.menu = this.menu.bind(this);
        this.search = this.search.bind(this);
        this.invites = this.invites.bind(this);
        this.notifications = this.notifications.bind(this);
        this.countInvites = this.countInvites.bind(this);
        this.countNotifications = this.countNotifications.bind(this);
    }

    componentWillMount () {
        this.props.inviteActions.setInvites(this.props.user.invites);
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
                        <Icon.Button name="search" size={28} backgroundColor="#fff" color="#757575" onPress={this.search} /> : null
                    }
                    <Icon.Button name="bell-o" size={28} backgroundColor="#fff" color="#757575" onPress={Actions.Notifications} >
                        {
                            this.notifications() ?
                            <View style={styles.IconBadge}>
                                <Text style={{color:'#fff'}}>{this.countNotifications()}</Text>
                            </View> : null
                        }
                    </Icon.Button>
                    <Icon.Button name="envelope-o" size={28} backgroundColor="#fff" color="#757575" onPress={Actions.Inbox} >
                        {
                            this.invites() ?
                            <View style={styles.IconBadge}>
                                <Text style={{color:'#fff'}}>{this.countInvites()}</Text>
                            </View> : null
                        }
                    </Icon.Button>
                    <Icon.Button name="ellipsis-v" size={28} backgroundColor="#fff" color="#757575" onPress={this.menu} />
                </View>
            </View>
        );
    }

    countInvites () {
        if(this.props.user.invites && this.props.user.invites.length > 0) {
            var count = 0;
            this.props.user.invites.map(function(invite) {
                if(!invite.wasRead) {
                    count++;
                }
            });
            return count;
        } else {
            return 0;
        }
    };

    countNotifications () {
        if(this.props.user.invites && this.props.user.invites.length > 0) {
            var count = 0;
            this.props.user.invites.map(function(invite) {
                if(!invite.wasRead) {
                    count++;
                }
            });
            return count;
        } else {
            return 0;
        }
    };

    invites () {
        if(this.props.user.invites && this.props.user.invites.length > 0) {
            this.props.user.invites.map(function(invite) {
                if(!invite.wasRead) {
                    return true;
                }
            });
            return false;
        } else {
            return false;
        }
    };

    notifications () {
        if(this.props.user.invites && this.props.user.invites.length > 0) {
            this.props.user.invites.map(function(invite) {
                if(!invite.wasRead) {
                    return true;
                }
            });
            return false;
        } else {
            return false;
        }
    };

    search() {
        this.props.feedActions.setSitterIndex(0);
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
        borderBottomColor: '#757575',
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
    IconBadge: {
        position:'absolute',
        top:1,
        right:1,
        minWidth:20,
        height:20,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f86966'
    },
    parentInnerContainer: {
        width: 160,
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
        router: state.router,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(RouterActions, dispatch),
        inviteActions: bindActionCreators(InviteActions, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);