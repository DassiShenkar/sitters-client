"use strict";

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import LocationSearch from '../components/LocationSearch';
import TimeSearch from '../components/TimeSearch';
import PriceSearch from '../components/PriceSearch';
import AppBar from '../components/AppBar';
import * as actionCreators from '../../src/actions/actionCreators';
import * as SearchByActions from '../../src/actions/SearchByActions';
import * as RangeActions from '../../src/actions/RangeActions';
import * as FeedActions from '../../src/actions/FeedActions';

class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        index: this.props.index,
        routes: [
            { key: '1', title: 'Location' },
            { key: '2', title: 'Time' },
            { key: '3', title: 'Price' }
        ]
    };

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderHeader = (props) => {
        return (
            <View>
                <AppBar
                    { ...this.props } />
                <TabBar
                    style={{ backgroundColor: '#f7a1a1' }}
                    {...props} />
            </View>
        );

    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <View>
                    <LocationSearch
                        sitters={ this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : [] }
                        { ...this.props } />
                </View>;
            case '2':
                return <View>
                    <TimeSearch
                        sitters={ this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : [] }
                        { ...this.props }  />
                </View>;
            case '3':
                return <View>
                    <PriceSearch
                        sitters={ this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : [] }
                        { ...this.props }  />
                </View>;
            default:
                return null;
        }
    };

    render() {
        var self = this;
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        feed: state.feed,
        searchBy: state.searchBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch),
        searchByActions: bindActionCreators(SearchByActions, dispatch),
        rangeActions: bindActionCreators(RangeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);