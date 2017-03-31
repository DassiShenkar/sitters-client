import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

import mySaga from './sagas';

const reviews = [
    {
        id: 0,
        author: 'yoel',
        content: 'luka is a great sitter'
    },
    {
        id: 1,
        author: 'roi',
        content: 'luka is my best friend'
    }
];

const defaultState = {
    reviews
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const middleware = routerMiddleware(browserHistory);
const store = createStore(rootReducer, defaultState, applyMiddleware(middleware));


export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;



