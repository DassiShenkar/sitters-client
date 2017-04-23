"use strict";
import React, { Component } from 'react';
import { View } from 'react-native';
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

    async componentWillMount() {
        const self = this;
        const userId = await LocalStorage.getFromLocalStorage(LocalStorage.USER_KEY);
        if (userId) {
            axios.post('https://sitters-server.herokuapp.com/parent/get', {
                id: userId.toString()
            })
                .then(function (parent) {
                    if (parent.data) {  // user exists
                        axios.post('https://sitters-server.herokuapp.com/parent/getMatches',
                            parent.data
                        )
                            .then(function (sitters) {
                                if (sitters.data.length > 0) {
                                    self.props.feedActions.setMatches(sitters.data);
                                }
                                else {
                                    alert('no matches found');
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        self.props.actionCreators.setUserData(parent.data);
                    }
                    else { // user not exist
                        alert('user not exist');
                        Actions.Login();
                    }
                })
                .catch(function (error) {
                    alert(JSON.stringify(error));
                });
        }
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