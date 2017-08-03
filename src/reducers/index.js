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
import sitterProfileOld from './sitterProfile';
import workingHours from './workingHours'
import sitterFeed from './sitterFeed'
import editProfile from './editProfile'

//new reducers
import login from '../components/base/pages/login/reducer'
import invite from '../components/base/pages/invite/reducer'
import sitterProfile from "../components/base/pages/sitterProfile/reducer";


const rootReducer = combineReducers({user, reviews, register, feed, settings, searchBy, range, sitterProfile, sitterProfileOld, invites, invite,  workingHours, sitterFeed, editProfile, login,  routing: routerReducer});

export default rootReducer;