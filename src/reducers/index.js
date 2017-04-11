import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import authUser from './login';
import register from './register';
import invites from './invites';

const rootReducer = combineReducers({user, reviews, authUser, register, invites, routing: routerReducer});

export default rootReducer;