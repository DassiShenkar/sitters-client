//external sources
import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';

//components
import Logo from '../../Logo';
import RadioInput from '../../controllers/radio/index';

//statics
import strings from '../../../static/strings';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(user) {
        const self = this;
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/parent/get',
            url: 'http://localhost:4444/parent/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: user.id}
        })
            .then(function (response) {
                if (response.data) {  // user exists
                    localStorage.setItem("auth_token", user.id);
                    self.props.actions.actionCreators.setUserData(response.data);
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
        const userTypeRadio = <RadioInput types={strings.USER_TYPE}
                                          defaultValue={strings.USER_TYPE[0]}
                                          action={this.props.actions.actionCreators.changeUserType}
                                          radioType={'userType'} {...this.props}
                                          reducer={'user'}/>;
        return (
            <div id="login-page">
                <PageHeader><Logo companyName={strings.APP_NAME}/>
                    <small>{strings.APP_DESCRIPTION}</small>
                </PageHeader>
                <Form horizontal>
                    {localStorage.getItem('suth_token') ? '' : userTypeRadio}
                    <FacebookLogin
                        appId="268453370262293"
                        autoLoad={false}
                        fields="id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
                        scope="user_birthday,public_profile,user_location,user_education_history,user_likes,email"
                        callback={this.login}
                        {...this.props}
                    />
                </Form>
            </div>
        )
    }
}

export default Login;
