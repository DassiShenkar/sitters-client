"use strict";
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import Splash from './Splash'

import * as actionCreators from '../../src/actions/actionCreators';
import * as ReviewActions from '../../src/actions/ReviewActions';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as FeedActions from '../../src/actions/FeedActions';
import * as SettingsActions from '../../src/actions/SettingsActions';
import * as SearchByActions from '../../src/actions/SearchByActions';
import * as RangeActions from '../../src/actions/RangeActions';

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        user: state.user,
        feed: state.feed,
        settings: state.settings,
        register: state.register,
        searchBy: state.searchBy,
        range: state.range
    }
}

/*
 * bind app to action creators
 * */

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            actionCreators: bindActionCreators(actionCreators, dispatch),
            registerActions: bindActionCreators(RegisterActions, dispatch),
            reviewActions: bindActionCreators(ReviewActions, dispatch),
            settingsActions: bindActionCreators(SettingsActions, dispatch),
            feedActions: bindActionCreators(FeedActions, dispatch),
            searchByActions: bindActionCreators(SearchByActions, dispatch),
            rangeActions: bindActionCreators(RangeActions, dispatch)
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Splash);
