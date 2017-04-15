//external sources
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

//redux store
import store, {history} from './store';

//components
import App from "./components/App";
import Feed from "./components/pages/Feed";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Invites from "./components/Invites";
import Notifications from "./components/Notifications";
import SitterProfile from "./components/pages/SitterProfile";
import ReviewList from "./components/ReviewList";
import SingleReview from "./components/SingleReview";
import EditInvite from "./components/EditInvite";
import EditProfile from "./components/pages/EditProfile";
import Settings from "./components/pages/Settings";
import About from "./components/pages/About";

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} onEnter={localStorage.getItem('auth_token') ? history.push('/') : history.push('/login')}>
                <IndexRoute component={Feed}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/about" component={About}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/sitter/:sitterId" component={SitterProfile}/>
                <Route path="/reviews" component={ReviewList}/>
                <Route path="/review/:reviewId" component={SingleReview}/>
                <Route path="/register" component={Register}/>
                <Route path="/editInvite" component={EditInvite}/>
                <Route path="/editProfile" component={EditProfile}/>
                <Route path="/login" component={Login}/>
            </Route>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
