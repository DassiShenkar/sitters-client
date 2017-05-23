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

    login(user) {
        if(user.status === "not_authorized"){
            this.props.router.push('/notAuthorized');
        }
        const self = this;
        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: user.id}
        })
            .then(function (response) {
                if (response.data) {  // user exists
                    if(user.friends.data.length > response.data.mutualFriends.length && response.data.isParent){
                        let parent = response.data;
                        parent.mutualFriends = user.friends.data;
                        axios({
                            method: 'post',
                            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/updateMutualFriends',
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: parent
                        })
                            .then(function (response) {

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    document.cookie = ("auth_token="+user.id);
                    self.props.actions.actionCreators.changeIsParentFlag(response.data.isParent);
                    if(response.data.isParent)
                        self.props.actions.actionCreators.setUserData(response.data);
                    else
                        self.props.actions.actionCreators.setSitterData(response.data);
                    self.props.router.push('/');
                }
                else { // user not exist
                    self.props.actions.actionCreators.createUser(user);
                    self.props.router.push('/register')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const userTypeRadio = <RadioGroup options={strings.USER_TYPE} //TODO: do not delete - for beta
                                          defaultValue={strings.USER_TYPE[1]}
                                          action={this.props.actions.actionCreators.changeUserType}
                                          radioType={'userType'}
                                          value={ this.props.user.userType }
                                          required={true}/>;  //TODO: do not delete - for beta
        return (
            <div id="login-page">
                <PageHeader>{strings.APP_NAME}
                    <small className="tagline">{strings.APP_DESCRIPTION}</small>
                </PageHeader>
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
