//external sources
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

//redux store
import store, {history} from './store';

//components
import App from "./components/App";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Register from "./components/Register";
import Invites from "./components/Invites";
import Notifications from "./components/Notifications";
import SitterProfile from "./components/SitterProfile";
import ReviewList from "./components/ReviewList";
import SingleReview from "./components/SingleReview";
import EditInvite from "./components/EditInvite";

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={localStorage.getItem('auth_token')  ? Feed : Login}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/sitter" component={SitterProfile}/>
                <Route path="/feed" component={Feed}/>
                <Route path="/reviews" component={ReviewList}/>
                <Route path="/review/:reviewId" component={SingleReview}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/editInvite" component={EditInvite}/>
            </Route>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
