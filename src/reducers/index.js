import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reviews from './reviews';
import user from './user';
import register from './register';
import range from './range';
import invites from './invite';
import sitterProfileOld from './sitterProfile';
import workingHours from './workingHours'
import sitterFeed from './sitterFeed'

//new reducers
import login from '../components/base/pages/login/reducer'
import invite from '../components/base/pages/invite/reducer'
import sitterProfile from "../components/base/pages/sitterProfile/reducer";
import settings from "../components/base/pages/settings/reducer";
import searchBy from "../components/base/panels/searchPanel/reducer";
import editProfile from "../components/base/pages/editProfile/reducer";
import feed from '../components/base/pages/feed/reducer';

const rootReducer = combineReducers({user, reviews, register, feed, settings, searchBy, range, sitterProfile, sitterProfileOld, invites, invite,  workingHours, sitterFeed, editProfile, login,  routing: routerReducer});

export default rootReducer;