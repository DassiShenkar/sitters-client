import React from 'react';
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import Register from "./components/Register"
import './styles/css/index.css';


render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/register" component={Register}/>
    </Router>
), document.getElementById('root'));

