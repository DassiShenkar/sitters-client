import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import authUser from './login';
import register from './register';
import feed from './feed';

const rootReducer = combineReducers({user, reviews, authUser, register, feed, routing: routerReducer});

export default rootReducer;