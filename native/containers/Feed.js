"use strict";
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {NotificationsAndroid} from 'react-native-notifications';


import * as actionCreators from '../../src/actions/actionCreators';
import * as FeedActions from '../../src/actions/FeedActions';
import * as SettingsActions from '../../src/actions/SettingsActions';
import * as RouterActions from '../actions/RouterActions';
import * as CalendarActions from '../actions/CalendarActions';
import AppBar from '../components/AppBar';
import SitterList from '../components/SitterList';
import SitterCalendar from '../components/SitterCalendar';
import LoadingScreen from '../components/LoadingScreen';
import LocalStorage from '../utils/LocalStorage';

class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            if (userId) {
                AsyncStorage.getItem(LocalStorage.USER_TYPE, function(error, userType) {
                        // let user = self.props.user;
                        // user.senderGCM = {
                        //     senderId: gcmKey,
                        //     valid: true
                        // };
                        // let updatePath = user.isParent ? 'parent/update' : 'sitter/update';
                        // axios({
                        //     method: 'post',
                        //     url: 'https://sitters-server.herokuapp.com/' + updatePath,
                        //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //     data: user
                        // }).then(function (res) {
                        //     if (res.data) {
                        //     }
                        //     else {
                        //         console.log('user not created');
                        //         Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        //     }
                        // }).catch(function (error) {
                        //     console.log(error);
                        //     Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        // });
                        //
                        // let path;
                        // if (userType == 'parent') {
                        //     path = 'parent/get';
                        // } else {
                        //     path = 'sitter/get';
                        // }
                        // axios({
                        //     method: 'post',
                        //     url: 'https://sitters-server.herokuapp.com/' + path,
                        //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //     data: {_id: userId.toString()}
                        // }).then(function (user) {
                        //     if (user.data) {  // user exists
                        //         user.data.senderGCM = {
                        //             senderId: gcmKey,
                        //             valid: true
                        //         };
                        //         let updatePath = user.data.isParent ? 'parent/update' : 'sitter/update';
                        //         axios({
                        //             method: 'post',
                        //             url: 'https://sitters-server.herokuapp.com/' + updatePath,
                        //             headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //             data: user.data
                        //         }).then(function (res) {
                        //             if (res.data) {
                        //             }
                        //             else {
                        //                 console.log('user not created');
                        //                 Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        //             }
                        //         }).catch(function (error) {
                        //             console.log(error);
                        //             Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        //         });
                        //     } else {
                        //
                        //     }
                        // }).catch(function(error) {
                        //     console.log(error);
                        //     Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        // });
                });
            }
        });
        NotificationsAndroid.setNotificationReceivedListener((notification) => {
            let object = JSON.parse(notification.getData().data);
            if(typeof object.message === "undefined" && self.props.user.name){
                let invites = self.props.user.invites;
                if(object.status !== 'waiting') { // update invite
                    invites.forEach(invite => {
                        if(invite._id === object._id) {
                            invite.status = object.status;
                            invite.wasRead = false;
                        }
                    });
                    self.props.actionCreators.setInvites(invites);
                }
                else {
                    invites.push(object);
                    self.props.actionCreators.setInvites(invites); // new invite

                }
            }
            else { // new notification - new sitter in town
                console.log(self.props.user.isParent);
                console.log(object);
                if(self.props.user.isParent) {
                    console.log(self.props.user.notifications);
                    self.props.actionCreators.setNotifications(self.props.user.notifications.concat(object)); // add new notification to state
                    console.log(self.props.user.notifications);
                }
            }
        });
        NotificationsAndroid.setNotificationOpenedListener((notification) => {
            let object = JSON.parse(notification.getData().data);
            if(typeof object.message === "undefined" && self.props.user.name){
                let invites = self.props.user.invites;
                if(object.status !== 'waiting') { // update invite
                    invites.forEach(invite => {
                        if(invite._id === object._id) {
                            invite.status = object.status;
                            invite.wasRead = false;
                        }
                    });
                    self.props.actionCreators.setInvites(invites);
                }
                else {
                    invites.push(object);
                    self.props.actionCreators.setInvites(invites); // new invite

                }
            }
            else { // new notification - new sitter in town
                self.props.actionCreators.setNotifications(self.props.user.notifications.concat(object)); // add new notification to state
            }
        });
        self.props.feedActions.showSpinner(true);
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            if (userId) {
                if(self.props.user.userType === "I'm a Parent") {
                    axios({
                        method: 'post',
                        url: 'https://sitters-server.herokuapp.com/parent/get',
                        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        data: {_id: userId.toString()}
                    }).then(function (parent) {
                        if (parent.data) {  // user exists
                            axios({
                                method: 'post',
                                url: 'https://sitters-server.herokuapp.com/parent/getMatches',
                                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                data: parent.data
                            }).then(function (sitters) {
                                if (sitters.data.length > 0) {
                                    self.props.feedActions.setMatches(sitters.data);
                                }
                                else {
                                    console.log('no matches found');
                                }
                                self.props.feedActions.showSpinner(false);
                            }).catch(function (error) {
                                console.log(error);
                                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                            });
                            self.props.actionCreators.setParentData(parent.data);
                            AsyncStorage.getItem(LocalStorage.GCM_KEY, function(error, gcmKey) {
                                parent.data.senderGCM = {
                                    senderId: gcmKey,
                                    valid: true
                                };
                                axios({
                                    method: 'post',
                                    url: 'https://sitters-server.herokuapp.com/parent/update',
                                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                    data: parent.data
                                }).then(function (res) {
                                    if (res.data) {
                                    }
                                    else {
                                        console.log('user not created');
                                        Actions.ErrorPage({
                                            errorNum: 500,
                                            errorMsg: 'Server Error \nPlease try again later'
                                        });
                                    }
                                }).catch(function (error) {
                                    console.log(error);
                                    Actions.ErrorPage({
                                        errorNum: 500,
                                        errorMsg: 'Server Error \nPlease try again later'
                                    });
                                });
                            });
                        }
                        else { // user not exist
                            console.log('user not exist');
                            Actions.Login();
                        }
                    }).catch(function (error) {
                        console.log(error);
                        Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                    });
                } else {
                    axios({
                        method: 'post',
                        url: 'https://sitters-server.herokuapp.com/sitter/get',
                        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        data: {_id: userId}
                    })
                        .then(function (sitter) {
                            if (sitter.data) {  // user exists
                                self.props.settingsActions.setNotifications(sitter.data.settings.allowNotification);
                                self.props.settingsActions.setSuggestions(sitter.data.settings.allowSuggestions);
                                self.props.settingsActions.setShowOnSearch(sitter.data.settings.allowShowOnSearch);
                                self.props.actionCreators.setSitterData(sitter.data);
                                AsyncStorage.getItem(LocalStorage.GCM_KEY, function(error, gcmKey) {
                                    sitter.data.senderGCM = {
                                        senderId: gcmKey,
                                        valid: true
                                    };
                                    axios({
                                        method: 'post',
                                        url: 'https://sitters-server.herokuapp.com/sitter/update',
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-Type': 'application/json'
                                        },
                                        data: sitter.data
                                    }).then(function (res) {
                                        if (res.data) {
                                        }
                                        else {
                                            console.log('user not created');
                                            Actions.ErrorPage({
                                                errorNum: 500,
                                                errorMsg: 'Server Error \nPlease try again later'
                                            });
                                        }
                                    }).catch(function (error) {
                                        console.log(error);
                                        Actions.ErrorPage({
                                            errorNum: 500,
                                            errorMsg: 'Server Error \nPlease try again later'
                                        });
                                    });
                                });
                            }
                            else { // user not exist
                                console.log('user not exist');
                                Actions.Login();
                            }
                            self.props.feedActions.showSpinner(false);
                        })
                        .catch(function (error) {
                            console.log(error);
                            Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                        });
                }
            } else {
                console.log('user not exist');
                Actions.Login();
            }
        });
    }

    componentDidUpdate () {
        var self = this;
        if(self.props.router.validFlag) {
            self.props.routerActions.changeValidFlag(false);
            Actions.Feed();
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <AppBar
                    { ...this.props } />
                {
                    this.props.feed.showSpinner ?
                    <LoadingScreen /> :
                    this.props.user.userType === "I'm a Parent" ?
                    <SitterList
                        { ...this.props }
                        sitters={ this.props.feed.matches.length > 0 ? this.props.feed.matches : [] }/> :   
                    <SitterCalendar
                        {...this.props} />
                }
            </View>
        );
    }
}

NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
    console.log('Push-notifications registered!', deviceToken);
    LocalStorage.setToLocalStorage(LocalStorage.GCM_KEY, deviceToken);
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        feed: state.feed,
        router: state.router,
        calendar: state.calendar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch),
        settingsActions: bindActionCreators(SettingsActions, dispatch),
        calendarActions: bindActionCreators(CalendarActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);