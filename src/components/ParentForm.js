import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import BaseForm from './BaseForm';
import baseData from '../data/BaseData';
import axios from 'axios';
var {AgeFromDate} = require('age-calculator');

var age;
import strings from '../static/strings';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        // if (usr.birthday) { // calculate age from birthday
        //     let date = usr.birthday.split("/"); TODO: get birthday from facebook and put in redux and age component
        //     age = (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
        // }
        //     defaultTimeValue: '10:00'
        // };
    };

    handleSubmitParent(e) {
        e.preventDefault();
        let languages = [];
        this.props.register.languages.forEach (function(language){
            languages.push(language.value);
        });
        let parent = {
            name: this.props.register.name,
            email: this.props.register.email,
            age: parseInt(this.props.register.age),
            address: {
                city: this.props.register.city,
                street: this.props.register.street,
                houseNumber: parseInt(this.props.register.houseNumber),
            },
            gender: this.props.register.gender.toLowerCase(),
            coverPhoto: this.props.user.facebookData.cover.source,
            timezone: this.props.user.facebookData.timezone,
            profilePicture: this.props.user.facebookData.picture.data.url,
            maxPrice: parseInt(this.props.register.watchMaxPrice),
            languages: languages,
            children: {
                name: this.props.register.childName,
                age: parseInt(this.props.register.childAge),
                expertise: this.props.register.childExpertise,
                hobbies: this.props.register.childHobbies,
                specialNeeds: this.props.register.childSpecialNeeds,
            }
        };
        axios({
            method: 'post',
            url: 'http://localhost:4000/parent/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: parent
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // user created
                localStorage.setItem("isAuth", "true");
                self.props.router.push('/feed');
            }
            else { // user not created
               //TODO: think about error when user not created
            }
        })
            .catch(function (error) {
                console.log(error);
                //TODO: think about error when user not created
            });
    }
    render() {
        return (
            <form id="register-form" onSubmit={this.handleSubmitParent}>
                <BaseForm {...this.props}/>
                <h3>Child</h3>
                <TextInput label="Max price for watch"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                           inputType={'watchMaxPrice'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Child Name"
                           placeholder="Yoel Levi"
                           action={this.props.actions.registerActions.changeChildName}
                           inputType={'childName'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="2"
                           action={this.props.actions.registerActions.changeChildAge}
                           inputType={'childAge'} {...this.props}
                           reducer={'register'}/>
                <h4>Child Expertise</h4>
                <CheckBoxInput name="childExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeChildExpertise}
                               inputType={'childExpertise'} {...this.props}
                               reducer={'register'}
                />
                <h4>Child Hobbies</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeChildHobbies}
                               inputType={'childHobbies'} {...this.props}
                               reducer={'register'}
                />
                <h4>Child Special needs</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeChildSpecialNeeds}
                               inputType={'childSpecialNeeds'} {...this.props}
                               reducer={'register'}
                />
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;