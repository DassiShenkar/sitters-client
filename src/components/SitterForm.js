import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import RadioInput from './controllers/radio/index';
import WorkingHours from './controllers/WorkingHours';
import PersonalityTest from './PersonalityTest'
import BaseForm from './BaseForm';
import BaseData from '../data/BaseData';
import 'react-select/dist/react-select.css';
import {AgeFromDate} from 'age-calculator';
import strings from '../static/strings';
import axios from 'axios';
import geocoder from'geocoder';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
    }
    getGeoCode(callback){
        geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + this.props.register.city , function ( err, data ) {
            if(err)
                console.log(err); // TODO: when address is wrong, add callback
            else{
                callback(data);
            }
        });
    }
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }
    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        let self = this;
        let sitter = {address: {},languages: []};
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                sitter.languages.push(language.name);
            else
                sitter.languages.push(language.value);
        });
        this.getGeoCode(function(data) {
            sitter.address.longitude = data.results[0] != null? data.results[0].geometry.location.lng: 0;
            sitter.address.latitude = data.results[0] != null? data.results[0].geometry.location.lat: 0;
        });
        sitter = {
            _id : this.props.user.facebookID,
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            address: {
                city: this.props.register.city != null? this.props.register.city : this.props.user.location.name.split(',')[0],
                street: this.props.register.street,
                houseNumber: Number(this.props.register.houseNumber),
            },
            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            experience:  Number(this.props.register.experience),
            minAge:  Number(this.props.register.sitterMinAge),
            maxAge:  Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            availableNow: this.props.register.sitterImmediateAvailability.toLowerCase() === 'true',
            expertise: this.props.register.sitterExpertise? this.props.register.sitterExpertise: [],
            hobbies: this.props.register.sitterHobbies? this.props.register.sitterHobbies: [],
            specialNeeds: this.props.register.sitterSpecialNeeds? this.props.register.sitterSpecialNeeds: [],
            education: this.props.register.sitterEducation? this.props.register.sitterEducation: [],
            mobility: this.props.register.sitterMobility.toLowerCase() === 'true'
        };
        axios({
            method: 'post',
            url: 'http://localhost:4000/sitter/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // user created
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
                           {...this.props}
                           reducer={'register'}/>
                <TextInput label="Minimum age to save children"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterMinimumAge}
                           {...this.props}
                           reducer={'register'}/>
                <TextInput label="Maximum age to save children"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeSitterMaximumAge}
                           {...this.props}
                           reducer={'register'}/>
                <TextInput label="Hour Fee"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeSitterHourFee}
                           {...this.props}
                           reducer={'register'}/>

                <h3>Immediate availability</h3>
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                            radioType={'sitterImmediateAvailability'} {...this.props}
                            reducer={'register'}/>
                <h3>Mobility</h3>
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterMobility}
                            radioType={'sitterMobility'} {...this.props}
                            reducer={'register'}/>
                <h4>Sitter Expertise</h4>
                <CheckBoxInput name="sitterExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeSitterExpertise}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Hobbies</h4>
                <CheckBoxInput name="sitterHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeSitterHobbies}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Special needs</h4>
                <CheckBoxInput name="sitterHobbies"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Education</h4>
                <CheckBoxInput name="sitterEducation"
                               types={strings.EDUCATION}
                               action={this.props.actions.registerActions.changeSitterEducation}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Personality Test:</h4>
                <PersonalityTest questions={BaseData.getQuestions()} {...this.props}/>
                <h4>Working Hours</h4>
                <WorkingHours days={strings.WEEK_DAYS} />
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;