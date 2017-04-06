import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import authUser from './login';
import radios from './radios';

const rootReducer = combineReducers({reviews, authUser, radios, routing: routerReducer});

export default rootReducer;