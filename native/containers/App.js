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
import * as SitterProfileActions from '../../src/actions/SitterProfileActions';
import * as InviteActions from '../../src/actions/InviteActions';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { states, actions } = this.props;
        return (
            <Splash
                {...states}
                {...actions}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        states: {
            reviews: state.reviews,
            user: state.user,
            feed: state.feed,
            settings: state.settings,
            register: state.register,
            searchBy: state.searchBy,
            range: state.range,
            sitterProfile: state.sitterProfile,
            invite: state.invite
        }
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
            rangeActions: bindActionCreators(RangeActions, dispatch),
            sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
            inviteActions: bindActionCreators(InviteActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
