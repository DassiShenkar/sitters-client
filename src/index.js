//external sources
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

//redux store
import store, {history} from './store';

//components
import App from "./components/App";
import Feed from "./components/pages/feed/index";
import Login from "./components/pages/login/index";
import Register from "./components/pages/Register";
import Invites from "./components/InvitesList";
import Notifications from "./components/Notifications";
import SitterProfile from "./components/pages/profile/index";
import ReviewList from "./components/reviewList/index";
import SingleReview from "./components/SingleReview";
import SingleInvite from "./components/SingleInvite";
import EditProfile from "./components/pages/editProfile/index";
import Settings from "./components/pages/settings/index";
import About from "./components/pages/about/index";

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} onEnter={localStorage.getItem('auth_token') ? history.push('/') : history.push('/login')}>
                <IndexRoute component={Feed}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/invite/:inviteId" component={SingleInvite}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/about" component={About}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/sitter/:sitterId" component={SitterProfile}/>
                <Route path="/reviews" component={ReviewList}/>
                <Route path="/review/:reviewId" component={SingleReview}/>
                <Route path="/register" component={Register}/>
                <Route path="/editProfile" component={EditProfile}/>
                <Route path="/login" component={Login}/>
            </Route>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
