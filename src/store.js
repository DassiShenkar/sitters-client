import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

const reviews = [
    {
        id: 1,
        author: 'yoel',
        content: 'luka is a great sitter'
    },
    {
        id: 2,
        author: 'roi',
        content: 'luka is my best friend'
    }
];

const defaultState = {
    reviews
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;



