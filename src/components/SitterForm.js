import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import RadioInput from './controllers/RadioInput';
import WorkingHours from './controllers/WorkingHours';
import PersonalityTest from './PersonalityTest'
import BaseForm from './BaseForm';
// import 'react-select/dist/react-select.css';
import strings from '../static/strings';
// var {AgeFromDate} = require('age-calculator');
// var age;
import axios from 'axios';
import geocoder from'geocoder';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
    }
    //     if(usr.birthday){ // calculate age from birthday
    //         let date = usr.birthday.split("/");TODO: get birthday from facebook and put in redux and age component
    //         age = (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    //     }
    //         defaultTimeValue: '10:00'
    getGeoCode(callback){
        geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + this.props.register.city , function ( err, data ) {
            if(err)
                console.log(err); // TODO: when address is wrong, add callback
            else{
                callback(data);
            }
        });
    }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        let sitter = {address: {},languages: []};
        this.props.register.languages.forEach (function(language){
            sitter.languages.push(language.value);
        });
        this.getGeoCode(function(data) {
            sitter.address.longitude = data.results[0].geometry.location.lng;
            sitter.address.latitude = data.results[0].geometry.location.lat;
        });
        sitter = {
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
            languages: languages,
            experience:  parseInt(this.props.register.experience),
            minAge:  parseInt(this.props.register.sitterMinAge),
            maxAge:  parseInt(this.props.register.sitterMaxAge),
            hourFee: parseInt(this.props.register.hourFee,10),
            availableNow: this.props.register.sitterImmediateAvailability.toLowerCase() === 'true',
            expertise: this.props.register.sitterExpertise,
            hobbies: this.props.register.sitterHobbies,
            specialNeeds: this.props.register.sitterSpecialNeeds
        };
        console.log(sitter);
        axios({
            method: 'post',
            url: 'http://localhost:4000/sitter/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
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
            <form id="register-form" onSubmit={this.handleSubmitSitter}>
                <BaseForm {...this.props} />
                <TextInput label="Years of experience"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterExperience}
                           inputType={'sitterExperience'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Minimum age to save children"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterMinimumAge}
                           inputType={'sitterMinAge'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeSitterMaximumAge}
                           inputType={'sitterMaxAge'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Hour Fee"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeSitterHourFee}
                           inputType={'hourFee'} {...this.props}
                           reducer={'register'}/>

                <h3>Immediate availability</h3>
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                            radioType={'sitterImmediateAvailability'} {...this.props}
                            reducer={'register'}/>
                <h4>Sitter Expertise</h4>
                <CheckBoxInput name="sitterExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeSitterExpertise}
                               inputType={'sitterExpertise'} {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Hobbies</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeSitterHobbies}
                               inputType={'sitterHobbies'} {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Special needs</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                               inputType={'sitterSpecialNeeds'} {...this.props}
                               reducer={'register'}
                />
                {/*/!*<h4>Sitter Personality Test:</h4>*!/ TODO: convert to redux*/}
                {/*<PersonalityTest questions={BaseData.getQuestions()}/>*/}
                {/*<h4>Working Hours</h4>*/}
                {/*/!*<WorkingHours days={strings.WEEK_DAYS} />*!/ TODO: think about this component again*/}
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;