"use strict";
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionCreators from '../../src/actions/actionCreators';
import * as FeedActions from '../../src/actions/FeedActions';
import AppBar from '../components/AppBar';
import SitterList from '../components/SitterList';
import LocalStorage from '../utils/LocalStorage';

class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
        AsyncStorage.getItem(LocalStorage.USER_KEY, function(error, userId) {
            console.log(userId);
            if (userId) {
                axios({
                    method: 'post',
                    url: 'https://sittersdev.herokuapp.com/parent/get',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: {_id: userId.toString()}
                }).then(function (parent) {
                    if (parent.data) {  // user exists
                        axios({
                            method: 'post',
                            url: 'https://sittersdev.herokuapp.com/parent/getMatches',
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: parent.data
                        }).then(function (sitters) {
                            if (sitters.data.length > 0) {
                                self.props.feedActions.setMatches(sitters.data);
                            }
                            else {
                                alert('no matches found');
                            }
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

    render () {
        return (
            <View style={{flex: 1}}>
                <AppBar
                    { ...this.props } />
                <SitterList {...this.props}
                    sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        feed: state.feed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);