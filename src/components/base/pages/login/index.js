//external sources
import React from 'react';

//utils
import {request} from '../../../../utils/requestHandler';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";
import * as _ from "lodash";

export default class LoginBase extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    componentWillMount() {
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.getElementsByTagName('html')[0].removeAttribute("style");
    }

    login(facebookUser) {
        if (facebookUser.status === "not_authorized") {
            this.props.router.push('/notAuthorized');
        }
        const self = this;
        request('post', sittersApi.GET_USER, {_id: facebookUser.id} , function (user) {
            if (user) {
                let userData = user.data;
                if(facebookUser.friends.data.length > 0) {
                    userData.friends = facebookUser.friends.data;
                    request('put', sittersApi.UPDATE_FRIENDS, userData,  function () {
                        userData.isParent ? self.props.actionCreators.setParent(user) : self.props.actionCreators.setSitter(user);
                    });// update friends in db
                }
                document.cookie = ("auth_token=" + facebookUser.id); // save token for future login
                document.cookie = ("is_parent=" + userData.isParent);
                self.props.actions.actionCreators.changeIsParentFlag(userData.isParent);
                self.props.router.push('/'); // route to feed page
            }
            else { // user not registered
                self.props.actions.loginActions.createUser(facebookUser);
                self.props.router.push('/register'); // route to register page
            }
        });
    }
}