//external sources
import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';

//components
import Logo from '../../Logo';
import RadioInput from '../../controllers/radio/RadioInput';

//statics
import strings from '../../../static/strings';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(response) {
        const self = this;
        axios.post('https://sitters-server.herokuapp.com/parent/get', {
            id: response.id
        })
            .then(function (res) {
                if (res.data) {  // user exists
                    localStorage.setItem("auth_token", response.id);
                    self.props.actions.actionCreators.setUserData(res.data);
                    self.props.router.push('/');
                }
                else { // user not exist
                    self.props.actions.actionCreators.createUser(response);
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
