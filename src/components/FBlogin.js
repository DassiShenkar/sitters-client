import React from 'react';
import FacebookLogin from 'react-facebook-login';
import '../styles/css/index.css'

class FBLogin extends React.Component {
    constructor(props) {
        super(props);
    };

    responseFacebook = (response) => {
        let user;
        let education = [],languages = [];
        if(response.education){
            response.education.forEach(function(edu){
                if(education.indexOf(edu.type.toLowerCase()) == -1){ // check if string in array
                    education.push(edu.type.toLowerCase());
                }
            });
        }
        if(response.languages){
            response.languages.forEach(function(lang){
                if(languages.indexOf(lang.name.toLowerCase()) == -1) { // check if string in array
                    languages.push(lang.name.toLowerCase());
                }
            })
        }
        user = {name:response.name,birthday:response.birthday,profileImage:response.picture.data.url,coverImage:response.cover.source,currency:response.currency.user_currency,email:response.email,gender:response.gender,location:response.location.name,timezone:response.timezone,languages:languages,education:education};
        console.log(user);
        localStorage.setItem('user',JSON.stringify(user));
        location.replace("register");
    };

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