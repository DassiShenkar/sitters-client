import React from 'react';
import TextInput from '../controllers/TextInput';
import RadioInput from '../controllers/radio/index';
import WorkingHours from '../controllers/WorkingHours';
import BaseForm from './BaseForm';
import 'react-select/dist/react-select.css';
import {AgeFromDate} from 'age-calculator';
import strings from '../../static/strings';
import axios from 'axios';
import geocoder from'geocoder';
import {Button} from "react-bootstrap";
import SelectInput from "../controllers/SelectInput";
import PersonalityQuestions from "../PersonalityQuestions";

import './style.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
        this.getEducationFromFacebook = this.getEducationFromFacebook.bind(this);
    }

    getGeoCode(callback) {
        geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + this.props.register.city, function (err, data) {
            if (err)
                console.log(err); // TODO: when address is wrong, add callback
            else {
                callback(data);
            }
        });
    }

    getEducationFromFacebook(education, selectInput) {// selectInput or array of strings
        if (education) {
            return education;
        }
        else if (this.props.user.education) {
            let edu = [];
            let eduList = [];
            let facebookEducation = this.props.user.education;
            facebookEducation.forEach(function (obj) {
                if (eduList.indexOf(obj.type) === -1) {
                    edu.push({value: obj.type.toLowerCase(), label: obj.type});
                    eduList.push(obj.type);
                }
            });
            //this.props.actions.registerActions.changeSitterEducation(edu);
            return selectInput ? edu : eduList;
            // return edu;
        }
    }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
    }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        let self = this;
        let expertise = [], hobbies = [], specialNeeds = [], education = [];
        let langs = this.props.register.languages ? this.props.register.languages : this.props.user.languages;
        let languages = [];
        let cords = {};
        if (langs) {
            langs.forEach(function (language) {
                if (self.props.register.languages)
                    languages.push(language.value);
                else
                    languages.push(language.name);
            });
        }
        this.getGeoCode(function (data) {
            cords.longitude = data.results[0] != null ? data.results[0].geometry.location.lng : 0;
            cords.latitude = data.results[0] != null ? data.results[0].geometry.location.lat : 0;
        });
        if (this.props.register.sitterExpertise.length > 0) {
            this.props.register.sitterExpertise.forEach(function (o) {
                expertise.push(o.value);
            })
        }
        if (this.props.register.sitterSpecialNeeds.length > 0) {
            this.props.register.sitterSpecialNeeds.forEach(function (o) {
                specialNeeds.push(o.value);
            })
        }
        if (this.props.register.sitterHobbies.length > 0) {
            this.props.register.sitterHobbies.forEach(function (o) {
                hobbies.push(o.value);
            })
        }
        if (this.props.register.sitterEducation.length > 0) {
            this.props.register.sitterEducation.forEach(function (o) {
                education.push(o.value);
            })
        }
        else {
            if (this.props.user.education.length > 0) {
                education = this.getEducationFromFacebook(null, null);
            }
        }
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function (question) {
            totalScore += question.value;
        });
        const sitter = {
            _id: this.props.user.facebookID,
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age) : this.calcAge(this.props.user.birthday),
            address: {
                city: this.props.register.city != null ? this.props.register.city : this.props.user.location.name.split(',')[0],
                street: this.props.register.street,
                houseNumber: Number(this.props.register.houseNumber),
                longitude: cords.longitude,
                latitude: cords.latitude
            },
            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase() : this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            timezone: this.props.user.timezone,
            languages: languages,
            profilePicture: this.props.user.picture.data.url,
            experience: Number(this.props.register.sitterExperience),
            minAge: Number(this.props.register.sitterMinAge),
            maxAge: Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            availableNow: this.props.register.sitterImmediateAvailability.toLowerCase() === 'true',
            expertise: expertise,
            hobbies: hobbies,
            specialNeeds: specialNeeds,
            education: education,
            mobility: this.props.register.sitterMobility.toLowerCase() === 'true',
            // workingHours
            reviews: [],
            invites: [],
            lastInvite: "",
            personalityTest: {
                questions: this.props.register.personalityQuestions,
                totalScore: totalScore
            },
        };
        axios({
            method: 'post',
            url: 'http://localhost:4444/sitter/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // user created
                self.props.router.push('/thank_you');
                // self.props.router.push('/');// TODO : Move to feed page
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
            <form className="sitter-form" onSubmit={this.handleSubmitSitter}>
                <BaseForm {...this.props} />
                <h4>Work</h4>
                <TextInput label="Years of Experience"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterExperience}
                           {...this.props}
                           reducer={'register'}
                           required={true}/>
                <TextInput label="Works with Children from Age:"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterMinimumAge}
                           {...this.props}
                           reducer={'register'}
                           required={true}/>
                <TextInput label="To Age:"
                           type="number"
                           placeholder="12"
                           action={this.props.actions.registerActions.changeSitterMaximumAge}
                           {...this.props}
                           reducer={'register'}
                           required={true}/>
                <TextInput label="Hour Fee"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterHourFee}
                           {...this.props}
                           reducer={'register'}
                           required={true}/>

                <h4>Immediate Availability</h4>
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                            radioType={'sitterImmediateAvailability'} {...this.props}
                            reducer={'register'}
                            required={true}/>
                <h4>Mobility</h4>
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterMobility}
                            radioType={'sitterMobility'} {...this.props}
                            reducer={'register'}
                            required={true}/>
                <h4>Education</h4>
                <SelectInput
                    placeholder="Select your education level"
                    options={strings.EDUCATION}
                    {...this.props}
                    defaultValues={this.getEducationFromFacebook(this.props.register.sittereducation, true)}
                    action={this.props.actions.registerActions.changeSitterEducation}
                    reducer={'register'}/>
                {/*<SelectInput*/}
                {/*placeholder="Select your languages"*/}
                {/*options={strings.LANGUAGES}*/}
                {/*{...this.props}*/}
                {/*defaultValues={this.getEducationFromFacebook(this.props.register.education)}*/}
                {/*action={this.props.actions.registerActions.changeLanguages}*/}
                {/*reducer={'register'}/>*/}
                {/*<CheckBoxInput name="sitterEducation"*/}
                {/*types={strings.EDUCATION}*/}
                {/*action={this.props.actions.registerActions.changeSitterEducation}*/}
                {/*{...this.props}*/}
                {/*reducer={'register'}*/}
                {/*/>*/}
                <h4>Expertise</h4>
                <SelectInput
                    placeholder="Select Expertise"
                    options={strings.EXPERTISE}
                    {...this.props}
                    action={this.props.actions.registerActions.changeSitterExpertise}
                    reducer={'register'}
                    defaultValues={this.props.register.sitterExpertise}/>
                {/*<CheckBoxInput name="sitterExpertise"*/}
                {/*types={strings.EXPERTISE}*/}
                {/*action={this.props.actions.registerActions.changeSitterExpertise}*/}
                {/*{...this.props}*/}
                {/*reducer={'register'}*/}
                {/*/>*/}
                <h4>Special Needs Qualifications</h4>
                <SelectInput
                    placeholder="Select Special Needs"
                    options={strings.SPECIAL_NEEDS}
                    {...this.props}
                    action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                    reducer={'register'}
                    defaultValues={this.props.register.sitterSpecialNeeds}/>
                {/*<CheckBoxInput name="sitterHobbies"*/}
                {/*types={strings.SPECIAL_NEEDS}*/}
                {/*action={this.props.actions.registerActions.changeSitterSpecialNeeds}*/}
                {/*{...this.props}*/}
                {/*reducer={'register'}*/}
                {/*/>*/}

                {/*<SelectInput*/}
                {/*placeholder="Select your languages"*/}
                {/*options={strings.LANGUAGES}*/}
                {/*{...this.props}*/}
                {/*defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}*/}
                {/*action={this.props.actions.registerActions.changeLanguages}*/}
                {/*reducer={'register'}/>*/}
                <h4>Hobbies</h4>
                <SelectInput
                    placeholder="Select Hobbies"
                    options={strings.HOBBIES}
                    {...this.props}
                    action={this.props.actions.registerActions.changeSitterHobbies}
                    reducer={'register'}
                    defaultValues={this.props.register.sitterHobbies}/>
                {/*<CheckBoxInput name="sitterHobbies"*/}
                {/*types={strings.HOBBIES}*/}
                {/*action={this.props.actions.registerActions.changeSitterHobbies}*/}
                {/*{...this.props}*/}
                {/*reducer={'register'}*/}
                {/*/>*/}
                <h4>About Me</h4>
                <p>Drag the handle to the adjective that describes you best</p>
                <p>If you feel no connection to the words, leave the handle in the middle</p>
                {/*<PersonalityTest questions={BaseData.getQuestions()} {...this.props}/>*/}
                <PersonalityQuestions {...this.props}/>
                {/*<h4>Working Hours</h4>*/}
                {/*<WorkingHours days={strings.WEEK_DAYS} />*/}
                <div className="submit">
                    <Button type="submit" bsStyle="primary" bsSize="large" value="Sign Up">Register</Button>
                </div>
            </form>
        );
    };
}

export default Form;