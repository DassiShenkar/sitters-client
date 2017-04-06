import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import authUser from './login';
import radios from './radios';

const rootReducer = combineReducers({user, reviews, authUser, radios, routing: routerReducer});

export default rootReducer;