import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import authUser from './login';

const rootReducer = combineReducers({user, reviews, authUser, routing: routerReducer});

export default rootReducer;