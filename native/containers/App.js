"use strict";
import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import Router from './Router'
import * as reducers from '../../src/reducers';
import * as actionCreators from '../../src/actions/actionCreators';
import * as ReviewActions from '../../src/actions/ReviewActions';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as FeedActions from '../../src/actions/FeedActions';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);
const store = createStore(reducer);

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        user: state.user,
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

const MainComponent = connect(mapStateToProps, mapDispatchToProps)(Router);

const App = () => (
    <Provider store={store}>
        <MainComponent />
    </Provider>
);

export default App;

