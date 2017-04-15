//external sources
import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import strings from './static/strings';
import dateFormat from 'dateformat';

//reducers
import rootReducer from './reducers/index';
import moment from "moment";


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
    range: {
        priceMinRange:0,
        priceMaxRange:50
    },
    sitterProfile: {sitter: {
        workingHours:{},
        hobbies: [],
        languages: [],
        education: []
    }},

};

//enable redux in chrome dev tools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const middleware = routerMiddleware(browserHistory);

const store = createStore(rootReducer, defaultState, enhancers, applyMiddleware(middleware));

export const history = syncHistoryWithStore(browserHistory, store);

//enable got reload for debugging
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;



