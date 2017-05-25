"use strict";
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionCreators from '../../src/actions/actionCreators';
import * as FeedActions from '../../src/actions/FeedActions';
import * as RouterActions from '../actions/RouterActions';
import AppBar from '../components/AppBar';
import SitterList from '../components/SitterList';
import SitterInbox from '../components/SitterInbox';
import LoadingScreen from '../components/LoadingScreen';
import LocalStorage from '../utils/LocalStorage';

class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
        self.props.feedActions.showSpinner(true);
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            if (userId) {
                axios({
                    method: 'post',
                    // url: 'https://sitters-server.herokuapp.com/parent/get',
                    url: 'https://sittersdev.herokuapp.com/parent/get',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: {_id: userId.toString()}
                }).then(function (parent) {
                    console.log(parent);
                    if (parent.data) {  // user exists
                        axios({
                            method: 'post',
                            // url: 'https://sitters-server.herokuapp.com/parent/getMatches',
                            url: 'https://sittersdev.herokuapp.com/parent/getMatches',
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
                        self.props.actionCreators.setUserData(parent.data);
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
        console.log(this.props.user.userType);
        return (
            <View style={styles.container}>
                <AppBar
                    { ...this.props } />
                {
                    this.props.feed.showSpinner ?
                    <LoadingScreen /> :
                    this.props.user.userType === "I'm a parent" ?
                    <SitterList
                        { ...this.props }
                        sitters={ this.props.feed.matches.length > 0 ? this.props.feed.matches : [] }/> :   
                    <SitterInbox
                        {...this.props} />
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        feed: state.feed,
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);