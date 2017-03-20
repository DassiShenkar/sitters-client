import React from 'react';

class FBLogin extends React.Component {



    responseFacebook = (response) => {
        let user;
        let education = [], languages = [];
        if (response.education) {
            response.education.forEach(function (edu) {
                if (education.indexOf(edu.type.toLowerCase()) === -1) {
                    education.push(edu.type.toLowerCase());
                }
            });
        }
        if (response.languages) {
            response.languages.forEach(function (lang) {
                if (languages.indexOf(lang.name.toLowerCase()) === -1) {
                    languages.push(lang.name.toLowerCase());
                }
            })
        }
        user = {
            name: response.name,
            birthday: response.birthday,
            profileImage: response.picture.data.url,
            coverImage: response.cover.source,
            currency: response.currency.user_currency,
            email: response.email,
            gender: response.gender,
            location: response.location.name,
            timezone: response.timezone,
            languages: languages,
            education: education
        };
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));

        let exist = true;// TODO: check if user exist in DB, if
        this.props.myFunc();
        // if(exist){
        //     location.replace("feed");
        // }
        // else{
        //     location.replace("register");
        // }
    };
}

export default FBLogin;