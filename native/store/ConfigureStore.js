import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk'
import dateFormat from 'dateformat';
import moment from "moment";

import strings from '../../src/static/strings';
import router from '../reducers/router'
import reviews from '../../src/reducers/reviews';
import user from '../../src/reducers/user';
import register from '../../src/reducers/register';
import feed from '../../src/reducers/feed';
import settings from '../../src/reducers/settings';
import searchBy from '../../src/reducers/searchBy';
import range from '../../src/reducers/range';
import invite from '../../src/reducers/invite';
import sitterProfile from '../../src/reducers/sitterProfile';


export default function configureStore() {

    //set initial state
    const defaultState = {
        reviews: [],
        user: {
            userType: strings.USER_TYPE[0],
            invites: [],
            notifications: [],
        },
        feed: {
            matches: [],
            filteredMatches: [],
            sitterIndex: 0,
            show: false,
            showNotificationsPopup: false,
            showInvitesPopup: false
        },
        register : {
            personalityQuestions : strings.QUESTIONS,
            childHobbies: [],
            childExpertise: [],
            childSpecialNeeds: [],
            sitterHobbies: [],
            sitterExpertise: [],
            sitterSpecialNeeds: [],
            sitterEducation: []
        },
        settings: {
            enableNotifications: true,
            enableSuggestions: true
        },
        searchBy : {
            inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
            inviteDay: dateFormat(new Date(), "dddd"),
            fromTime: moment(),
            toTime: moment(),
            isoValue: new Date().toISOString(),
            searchView: 'location'
        },
        invite: {
            inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
            inviteDay: dateFormat(new Date(), "dddd"),
            fromTime: moment(),
            toTime: moment(),
            isoValue: new Date().toISOString()
        },
        range: {
            priceMinRange:0,
            priceMaxRange:50
        },
        sitterProfile: {sitter: {
            workingHours:{},
            hobbies: [],
            languages: [],
            education: [],
            address: {},
            reviews: [],
            expertise: [],
        },
            distance: "",
            expandReview: false
        },

    };

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const rootReducer = combineReducers({user, reviews, register, feed, settings, searchBy, range, sitterProfile, invite, router, routing: routerReducer});

    const store = createStore(
        rootReducer,
        defaultState,
        enhancers,
        applyMiddleware(thunk)
    );

    //enable hot reload for debugging
    if (module.hot) {
        module.hot.accept('../../src/reducers/', () => {
            const nextRootReducer = require('../../src/reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store
}
