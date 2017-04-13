"use strict";
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import Splash from './Splash'

import * as actionCreators from '../../src/actions/actionCreators';
import * as ReviewActions from '../../src/actions/ReviewActions';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as FeedActions from '../../src/actions/FeedActions';

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        user: state.user,
        feed: state.feed,
        register: state.register
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
            feedActions: bindActionCreators(FeedActions, dispatch)
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Splash);
