import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Register from "./components/Register";
import Feed from "./components/Feed";
import Invites from "./components/Invites";
import Notifications from "./components/Notifications";
import EditInvite from "./components/EditInvite";
import Test from "./components/Test";
import './styles/css/index.scss';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/register" component={Register}/>
        <Route path="/feed" component={Feed}/>
        <Route path="/invites" component={Invites}/>
        <Route path="/notifications" component={Notifications}/>
        <Route path="/editInvite" component={EditInvite}/>
        <Route path="/test" component={Test}/>
    </Router>
), document.getElementById('root'));

