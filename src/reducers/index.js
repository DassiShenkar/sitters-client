import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import register from './register';
import feed from './feed';
import settings from './settings';
import searchBy from './searchBy';
import range from './range';
import invites from './invite';
import sitterProfile from './sitterProfile';
import workingHours from './workingHours'
import sitterFeed from './sitterFeed'
import editProfile from './editProfile'

//new reducers
import login from './../../src/components/pages/login/reducer'
import invite from './../../src/components/pages/invite/reducer'


const rootReducer = combineReducers({user, reviews, register, feed, settings, searchBy, range, sitterProfile, invites, invite,  workingHours, sitterFeed, editProfile, login,  routing: routerReducer});

export default rootReducer;