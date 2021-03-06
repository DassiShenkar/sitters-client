"use strict";

import React, { Component } from 'react';
import { View, Text, StyleSheet, BackAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

import LocationSearch from '../components/LocationSearch';
import TabButtons from '../components/TabButtons';
import AppBar from '../components/AppBar';
import * as actionCreators from '../../src/actions/actionCreators';
import * as SearchByActions from '../../src/components/base/modals/invite/action';
import * as FeedActions from '../../src/components/base/pages/feed/action';
import * as RouterActions from '../actions/RouterActions';

class SearchByLocation extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
        BackAndroid.addEventListener('hardwareBackPress', function(){
            if(self.props.title === 'SearchByLocation') {
                Actions.Feed();
                return true;
            }
            return false;
        })
    }

    render() {
        return (
            <View>
                <AppBar
                    { ...this.props } />
                <TabButtons
                    { ...this.props } />
                <LocationSearch
                    sitters={ this.props.feed.matches.length > 0 ? this.props.feed.matches : [] }
                    { ...this.props }/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        feed: state.feed,
        searchBy: state.searchBy,
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch),
        searchByActions: bindActionCreators(SearchByActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByLocation);
