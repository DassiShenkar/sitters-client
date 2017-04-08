import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import authUser from './login';
import register from './register';

const rootReducer = combineReducers({user, reviews, authUser, register, routing: routerReducer});

export default rootReducer;