//external sources
import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import strings from './static/strings';

//reducers
import rootReducer from './reducers/index';


//set initial state
const defaultState = {
    reviews: [],
    user: {
        userType: strings.USER_TYPE[0],
        invites: [],
        notifications: [],
    },
    feed: {
        matches: []
    },
    register : {personalityTestQuestions : []},
    searchBy : {priceMinRange:0,priceMaxRange:50}
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



