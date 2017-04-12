import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import register from './register';

const rootReducer = combineReducers({user, reviews, register, routing: routerReducer});

export default rootReducer;