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
import Register from "./components/pages/forms/index";
import SitterProfile from "./components/pages/sitterProfile/index";
import SingleInvite from "./components/pages/invite/index";
import SingleNotification from "./components/pages/notification/index";
import EditProfile from "./components/pages/editProfile/index";
import Settings from "./components/pages/settings/index";
import Thanks from "./components/pages/thanks/index";
import NotAuthorized from "./components/pages/notAuthorized/index";
import NotFound from "./components/pages/notFound/index";

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}
                   onEnter={document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1") !== "" ? history.push('/') : history.push('/login')}>
                <IndexRoute component={Feed}/>
                <Route path="/invite/:inviteId" component={SingleInvite}/>
                <Route path="/notification/:notificationId" component={SingleNotification}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/sitter/:sitterId" component={SitterProfile}/>
                <Route path="/register" component={Register}/>
                <Route path="/editProfile" component={EditProfile}/>
                <Route path="/login" component={Login}/>
                <Route path="/notAuthorized" component={NotAuthorized}/>
                <Route path="/*" component={NotFound}/>
            </Route>
            <Route path="/thank_you" component={Thanks}/>
            <Route path="*" component={NotFound}/>
            <Route path="/*" component={NotFound}/>
        </Router>
    </Provider>
);

render((router), document.getElementById('root'));
