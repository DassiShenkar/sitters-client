import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Logo from '../components/Logo';
import RadioInput from '../components/controllers/RadioInput';
import strings from '../static/strings';
import FacebookLogin from 'react-facebook-login';
import {push} from "react-router-redux";
import store from "../store";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(response) {
        const self = this;
        //this.props.addRadio("female");
        // this.props.changeGender("female");
        // this.props.changeUserType(this.refs.userInput.state.value);
        // const user_type = this.refs.userInput.state.value || '';
        const user_email = response.email;
        axios.post('https://sitters-server.herokuapp.com/parent/get', {
            email: user_email
        })
            .then(function (response) {
                if(response.data) {  // user exists
                    self.props.authenticateUser(true);
                    localStorage.setItem("isAuth", "true");
                    store.dispatch(push('/feed'));
                }
                else { // user not exist
                    console.log("unknown user");
                    store.dispatch(push('/register'));
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        const style = {
            width: '80%',
            margin: 'auto'
        };
        return (
            <div style={style}>
                <PageHeader><Logo companyName={strings.APP_NAME}/>
                    <small>{strings.APP_DESCRIPTION}</small>
                </PageHeader>
                <Jumbotron>
                    <h1>Login</h1>
                    <RadioInput ref="userInput" types={['I\'m a Parent', 'I\'m a Sitter']} default={'I\'m a Parent'}
                                saveInLocalStorage={'true'} action={this.props.changeUserType} radios={this.props.radios} {...this.props}/>
                    <FacebookLogin
                        appId="268453370262293"
                        autoLoad={false}
                        fields="id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
                        scope="user_birthday,public_profile,user_location,user_education_history,user_likes,email"
                        callback={this.login}
                        {...this.props}
                    />
                </Jumbotron>
            </div>
        )
    }
}

export default Login;