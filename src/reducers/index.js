import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import sitterProfileOld from './sitterProfile';


//new reducers
import login from '../components/base/pages/login/reducer'
import invite from '../components/base/pages/invite/reducer'
import sitterProfile from "../components/base/pages/sitterProfile/reducer";
import settings from "../components/base/pages/settings/reducer";
import searchBy from "../components/base/panels/searchPanel/reducer";
import editProfile from "../components/base/pages/editProfile/reducer";
import feed from '../components/base/pages/feed/reducer';
import sitterFeed from '../components/base/pages/feed/sitterFeed/reducer';
import register from '../components/base/pages/forms/reducer';

const rootReducer = combineReducers({user, register, feed, settings, searchBy, sitterProfile, sitterProfileOld, invite, sitterFeed, editProfile, login,  routing: routerReducer});

export default rootReducer;