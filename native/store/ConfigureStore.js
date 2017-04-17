import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dateFormat from 'dateformat';
import moment from "moment";

import rootReducer from '../../src/reducers/index';
import strings from '../../src/static/strings';


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
            sitterIndex: 0
        },
        register : {personalityTestQuestions : []},
        settings: {
            enableNotifications: true,
            enableSuggestions: true
        },
        searchBy : {
            inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
            inviteDay: dateFormat(new Date(), "dddd"),
            fromTime: moment(),
            toTime: moment(),
            isoValue: new Date().toISOString()
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
            reviews: []
        },
            distance: ""
        },

    };

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

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
