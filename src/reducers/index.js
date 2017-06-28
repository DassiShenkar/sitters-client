import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import register from './register';
import feed from './feed';
import settings from './settings';
import searchBy from './searchBy';
import range from './range';
import invite from './invite';
import sitterProfile from './sitterProfile';
import workingHours from './workingHours'
import sitterFeed from './sitterFeed'

const rootReducer = combineReducers({user, reviews, register, feed, settings, searchBy, range, sitterProfile, invite, workingHours, sitterFeed, routing: routerReducer});

export default rootReducer;