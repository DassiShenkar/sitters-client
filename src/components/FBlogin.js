import React from 'react';
import FacebookLogin from 'react-facebook-login';
import '../styles/css/index.scss'
import LoginBase from '../base/LoginBase.js'

class FBLogin extends LoginBase {

    render() {
        return (
            <FacebookLogin
                appId="268453370262293"
                autoLoad={true}
                fields="id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
                scope="user_birthday,public_profile,user_location,user_education_history,user_likes,email"
                callback={this.responseFacebook}
            />
        )
    }
}

export default FBLogin;