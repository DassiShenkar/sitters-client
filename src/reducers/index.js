import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import register from './register';
import feed from './feed';

const rootReducer = combineReducers({user, reviews, register, feed, routing: routerReducer});

export default rootReducer;