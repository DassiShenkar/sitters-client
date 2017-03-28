import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';
import App from "./components/App";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Register from "./components/Register";
import Invites from "./components/Invites";
import Notifications from "./components/Notifications";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import './styles/css/index.scss';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Feed}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/reviews" component={Reviews}/>
                <Route path="/reviews/:reviewId" component={Review}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Route>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
