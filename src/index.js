import React from 'react';
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import Register from "./components/Register"
import Feed from "./components/Feed"
import Invites from "./components/Invites"
import Notifications from "./components/Notifications"
import './styles/css/index.scss';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/register" component={Register}/>
        <Route path="/feed" component={Feed}/>
        <Route path="/invites" component={Invites}/>
        <Route path="/notifications" component={Notifications}/>
    </Router>
), document.getElementById('root'));

