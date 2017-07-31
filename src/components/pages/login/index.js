//external sources
import React from 'react';

//components
import FacebookLogin from 'react-facebook-login';
import Form from 'react-bootstrap/lib/Form';
import ReactPlayer from 'react-player';
import RadioGroup from '../../controllers/radio/radioGroup/index';

//style
import './style.css';

//statics
import strings from '../../../static/strings';
import LoginBase from "../../base/pages/login/index";

class Login extends LoginBase {
    render() {
        const userTypeRadio = <RadioGroup options={strings.USER_TYPE}
                                          defaultValue={this.props.user.userType || strings.USER_TYPE[0]}
                                          action={this.props.actions.loginActions.changeUserType}
                                          radioType={'userType'}
                                          value={ this.props.user.userType }
                                          required={true}/>;
        return (
            <div id="login-page">
                <ReactPlayer url='./Shoes.mp4' playing loop controls={false} width={"auto"} height={"auto"} style={{"width": "auto", "height": "auto"}}/>
                <div id="login-container" className="page">
                    <header>
                        <h1>{strings.APP_NAME}</h1>
                        <h3 className="tagline">{strings.APP_DESCRIPTION}</h3>
                    </header>
                    <Form id="login-form" horizontal>
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
            </div>
        )
    }
}

export default Login;
