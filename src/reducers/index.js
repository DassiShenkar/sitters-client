import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';

const rootReducer = combineReducers({reviews, routing: routerReducer});

export default rootReducer;