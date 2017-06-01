"use strict";

import React, { Component } from 'react';
import { View, Text, StyleSheet, BackAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

import TimeSearch from '../components/TimeSearch';
import TabButtons from '../components/TabButtons';
import AppBar from '../components/AppBar';
import * as actionCreators from '../../src/actions/actionCreators';
import * as SearchByActions from '../../src/actions/SearchByActions';
import * as RangeActions from '../../src/actions/RangeActions';
import * as FeedActions from '../../src/actions/FeedActions';
import * as RouterActions from '../actions/RouterActions';

class SearchByTime extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const self = this;
        BackAndroid.addEventListener('hardwareBackPress', function(){
            if(self.props.title === 'SearchByTime') {
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
                <TimeSearch
                    sitters={ this.props.feed.filteredMatches.length > 0 ? this.props.newSearch ? this.props.feed.filteredMatches.filter(function(el) {
                        return el.availableNow === true;
                    }) : this.props.feed.filteredMatches : [] }
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
        rangeActions: bindActionCreators(RangeActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByTime);
