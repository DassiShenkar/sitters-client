//external sources
import React from 'react';
//statics
import {getUser, updateMutualFriends } from './../../../../utils/axios';
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

    login(facebookUser) { // response from facebook auth
        if (facebookUser.status === "not_authorized") { // if user not authorized move to notAuthorized page
            this.props.router.push('/notAuthorized');
        }
        const self = this;
        getUser(facebookUser.id, function (user) { // get the user from the db
            if (user) { // if user registered
                if (facebookUser.friends.data.length > user.data.friends.length) { // check if user have new friends that registered to 'sitters'
                    let user = user.data;
                    user.friends = facebookUser.friends.data;
                    updateMutualFriends(user, user.isParent ? "parent/updateMutualFriends" : "sitter/updateMutualFriends"); // update friends in db
                }
                document.cookie = ("auth_token=" + facebookUser.id); // save token for future login
                document.cookie = ("is_parent=" + user.data.isParent);
                self.props.actions.actionCreators.changeIsParentFlag(user.data.isParent); // set isParent flag to state
                if (user.data.isParent)
                    self.props.actions.actionCreators.setParentData(user.data); // set parent data to state
                else
                    self.props.actions.actionCreators.setSitterData(user.data); // set sitter data to state
                self.props.router.push('/'); // move to
            }
            else { // user not registered
                self.props.actions.actionCreators.createUser(facebookUser); // set all facebook data to state
                self.props.router.push('/register'); // route to register page
            }
        });
    }
}