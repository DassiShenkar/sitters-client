//external sources
import React from 'react';
import axios from 'axios';

//components
import FacebookLogin from 'react-facebook-login';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';

import RadioGroup from '../../controllers/radio/radioGroup/index';

//style
import './style.css';

//statics
import strings from '../../../static/strings';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(facebookUser) {
        if (facebookUser.status === "not_authorized") {
            this.props.router.push('/notAuthorized');
        }
        const self = this;
        axios({
            method: 'post',
            url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: facebookUser.id}
        })
            .then(function (response) {
                if (response.data) {  // user exists
                    if (facebookUser.friends.data.length > response.data.friends.length) {
                        let user = response.data;
                        user.friends = facebookUser.friends.data;
                        const path = user.isParent ? "parent/updateMutualFriends" : "sitter/updateMutualFriends";
                        axios({
                            method: 'post',
                            url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + path,
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: user
                        })
                            .then(function (response) {

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    document.cookie = ("auth_token=" + facebookUser.id);
                    self.props.actions.actionCreators.changeIsParentFlag(response.data.isParent);
                    if (response.data.isParent)
                        self.props.actions.actionCreators.setParentData(response.data);
                    else
                        self.props.actions.actionCreators.setSitterData(response.data);
                    self.props.router.push('/');
                }
                else { // user not exist
                    self.props.actions.actionCreators.createUser(facebookUser);
                    self.props.router.push('/register')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const userTypeRadio = <RadioGroup options={strings.USER_TYPE} //TODO: do not delete - for beta
                                          defaultValue={this.props.user.userType || strings.USER_TYPE[0]}
                                          action={this.props.actions.actionCreators.changeUserType}
                                          radioType={'userType'}
                                          value={ this.props.user.userType }
                                          required={true}/>;  //TODO: do not delete - for beta
        return (
            <div id="login-page" className="page">
                <header>
                    <h1>{strings.APP_NAME}</h1>
                    <h3 className="tagline">{strings.APP_DESCRIPTION}</h3>
                </header>
                <Form className="login-form" horizontal>
                    {document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1") !== '' ? '' : userTypeRadio}
                    <FacebookLogin
                        appId="268453370262293"
                        autoLoad={false}
                        fields="id,name,email,cover,birthday,currency,education,gender,friends,friendlists,languages,location,timezone,picture.width(100).height(100)"
                        scope="user_birthday,public_profile,user_location,user_education_history,user_likes,email,user_friends"
                        callback={this.login}
                        {...this.props}
                    />
                </Form>
            </div>
        )
    }
}

export default Login;
