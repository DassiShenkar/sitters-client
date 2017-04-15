import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import userType from '../components/controllers/radio/reducer';
import register from './register';
import feed from './feed';
import settings from './settings';
import searchBy from './searchBy';
import range from './range';
import sitterProfile from './sitterProfile';

const rootReducer = combineReducers({user, userType, reviews, register, feed, settings, searchBy, range, sitterProfile, routing: routerReducer});

export default rootReducer;