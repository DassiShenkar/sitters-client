import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import authUser from './login';

const rootReducer = combineReducers({reviews, authUser, routing: routerReducer});

export default rootReducer;