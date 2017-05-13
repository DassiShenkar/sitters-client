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
import Register from "./components/forms/Register";
import Invites from "./components/inviteList/index";
import SitterProfile from "./components/pages/profile/index";
import ReviewList from "./components/reviewList/index";
import SingleReview from "./components/review/SingleReview";
import SingleInvite from "./components/pages/invite/SingleInvite";
import EditProfile from "./components/pages/editProfile/index";
import Settings from "./components/pages/settings/index";
import Thanks from "./components/Thanks";
import NotAuthorized from "./components/NotAuthorized";


const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}
                   // onEnter={localStorage.getItem('auth_token') ? history.push('/') : history.push('/login')}>
                   onEnter={document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "" ? history.push('/') : history.push('/login')}>
                <IndexRoute component={Feed}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/invite/:inviteId" component={SingleInvite}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/sitter/:sitterId" component={SitterProfile}/>
                <Route path="/reviews" component={ReviewList}/>
                <Route path="/review/:reviewId" component={SingleReview}/>
                <Route path="/register" component={Register}/>
                <Route path="/editProfile" component={EditProfile}/>
                <Route path="/login" component={Login}/>
                <Route path="/notAuthorized" component={NotAuthorized}/>
            </Route>
            <Route path="/thank_you" component={Thanks}/>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
