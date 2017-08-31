"use strict";
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {NotificationsAndroid} from 'react-native-notifications';


import * as actionCreators from '../../src/actions/actionCreators';
import * as FeedActions from '../../src/components/base/pages/feed/action';
import * as SettingsActions from '../../src/components/base/pages/settings/action';
import * as RouterActions from '../actions/RouterActions';
import * as CalendarActions from '../actions/CalendarActions';
import AppBar from '../components/AppBar';
import SitterList from '../components/SitterList';
import SitterCalendar from '../components/SitterCalendar';
import LoadingScreen from '../components/LoadingScreen';
import LocalStorage from '../utils/LocalStorage';
import * as requestHandler from '../../src/utils/requestHandler'
import * as sittersApi from '../../src/sittersAPI/sittersAPI'

class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
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
                    requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: userId.toString()}, (parent) => {
                        if (parent.data) {
                            requestHandler.request('post', sittersApi.sittersApi.GET_MATCHES, {_id: userId.toString()}, (sitters) => {
                                if (sitters.data.length > 0) {
                                    self.props.feedActions.setMatches(sitters.data);
                                } else {
                                    console.log('no matches found');
                                }
                                self.props.feedActions.showSpinner(false);
                            });
                            self.props.actionCreators.setParentData(parent.data);
                            AsyncStorage.getItem(LocalStorage.GCM_KEY, function(error, gcmKey) {
                                parent.data.senderGCM = {
                                    senderId: gcmKey,
                                    valid: true
                                };
                                requestHandler.request('put', sittersApi.sittersApi.UPDATE_USER, parent.data, (res) => {
                                    if(res.data) {
                                        console.log("GCM updated")
                                    } else {
                                        Actions.ErrorPage({
                                            errorNum: 500,
                                            errorMsg: 'Server Error \nPlease try again later'
                                        });
                                    }
                                })
                            });
                        } else {
                            Actions.Login();
                        }
                    });
                } else {
                    requestHandler.request('post', sittersApi.sittersApi.GET_USER, {_id: userId.toString()}, (sitter) => {
                        if (sitter.data) {
                            self.props.settingsActions.setNotifications(sitter.data.settings.allowNotification);
                            self.props.settingsActions.setSuggestions(sitter.data.settings.allowSuggestions);
                            self.props.settingsActions.setShowOnSearch(sitter.data.settings.allowShowOnSearch);
                            self.props.actionCreators.setSitterData(sitter.data);
                            AsyncStorage.getItem(LocalStorage.GCM_KEY, function(error, gcmKey) {
                                sitter.data.senderGCM = {
                                    senderId: gcmKey,
                                    valid: true
                                };
                                requestHandler.request('put', sittersApi.sittersApi.UPDATE_USER, sitter.data, (res) => {
                                    if(res.data) {
                                        console.log("GCM updated")
                                    } else {
                                        Actions.ErrorPage({
                                            errorNum: 500,
                                            errorMsg: 'Server Error \nPlease try again later'
                                        });
                                    }
                                })
                            });
                        } else {
                            Actions.Login();
                        }
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