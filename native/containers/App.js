"use strict";
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import Splash from './Splash'

import * as actionCreators from '../../src/actions/actionCreators';

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
            actionCreators: bindActionCreators(actionCreators, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
