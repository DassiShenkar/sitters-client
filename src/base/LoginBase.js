import React from 'react';
import '../styles/css/index.scss'

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
}

export default FBLogin;