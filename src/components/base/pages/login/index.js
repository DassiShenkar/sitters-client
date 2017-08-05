//external sources
import React from 'react';

//utils
import {post} from '../../../../utils/serverCalls';
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
        post(sittersApi.GET_USER, {_id: facebookUser.id} , function (user) {
            if (user) {
                if (facebookUser.friends.data.length > user.data.friends.length) {
                    let user = user.data;
                    user.friends = facebookUser.friends.data;
                    post(sittersApi.UPDATE_FRIENDS, user,  _.noop); // update friends in db
                }
                document.cookie = ("auth_token=" + facebookUser.id); // save token for future login
                document.cookie = ("is_parent=" + user.data.isParent);
                self.props.actions.actionCreators.changeIsParentFlag(user.data.isParent);
                self.props.router.push('/'); // route to feed page
            }
            else { // user not registered
                self.props.actions.actionCreators.createUser(facebookUser);
                self.props.router.push('/register'); // route to register page
            }
        });
    }
}