import React from 'react';
import TextInput from '../controllers/textInput/index';
import BaseForm from './BaseForm';
import 'react-select/dist/react-select.css';
import {AgeFromDate} from 'age-calculator';
import strings from '../../static/strings';
import axios from 'axios';
import geocoder from 'geocoder';
import {Button, ControlLabel, FormControl, Nav, NavItem} from "react-bootstrap";
import SelectInput from "../controllers/select/SelectInput";
import RadioGroup from "../controllers/radio/radioGroup/index";

import './style.css';
import WorkingHours from "../controllers/workingHours/index";
import CheckBoxInput from "../controllers/checkbox/index";
import DragAndDropContainer from "../dragAndDropContainer/index";
import {geocodeByAddress} from "react-places-autocomplete";
import * as _ from "lodash";

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
            let edu = [], eduList = [];
            this.props.user.education.forEach(function (obj) {
               if (eduList.indexOf(obj.type) === -1) {
                    edu.push({value: obj.type.toLowerCase(), label: obj.type});
                   eduList.push(obj.type);
                }
            });
            return selectInput? edu: eduList;
        }
    }

    getLanguagesFromFacebook(languages){
        if(languages){
            return languages;
        }
        else if(this.props.user.languages){
            let langs =  [];
            this.props.user.languages.forEach(function(language){
                langs.push({value:language.name.toLowerCase(), label:language.name});
            });
            return langs;
        }
    }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
    }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        const self = this;
        let expertise = [], hobbies = [], specialNeeds = [], education = [], personality = [];
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
        if (this.props.register.sitterExpertise.length > 0) {
            this.props.register.sitterExpertise.forEach(function (o) {
                expertise.push(o.value);
            });
        }
        if (this.props.register.sitterSpecialNeeds.length > 0) {
            this.props.register.sitterSpecialNeeds.forEach(function (o) {
                specialNeeds.push(o.value);
            });
        }
        if (this.props.register.sitterHobbies.length > 0) {
            this.props.register.sitterHobbies.forEach(function (o) {
                hobbies.push(o.value);
            });
        }
        if (this.props.register.sitterEducation.length > 0) {
            this.props.register.sitterEducation.forEach(function (o) {
                education.push(o.value);
            });
        }
        else {
            if (this.props.user.education.length > 0) {
                education = this.getEducationFromFacebook(null, null);
            }
        }
        this.props.register.items.forEach(function(o){
            personality.push(o.label);
        });
        let sitter = {
            _id: this.props.user.facebookID,
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age) : this.calcAge(this.props.user.birthday),
            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase() : this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto?this.props.user.coverPhoto.source: "",
            timezone: this.props.user.timezone? this.props.user.timezone: "",
            profilePicture: this.props.user.picture? this.props.user.picture.data.url: "",
            languages: languages,
            experience: Number(this.props.register.sitterExperience),
            minAge: Number(this.props.register.sitterMinAge),
            maxAge: Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            availableNow: this.props.register.sitterImmediateAvailability.toLowerCase() === 'true',
            expertise: expertise,
            hobbies: hobbies,
            specialNeeds: specialNeeds,
            education: education,
            mobility: this.props.register.sitterMobility,
            workingHours: this.props.workingHours,
            reviews: [],
            invites: [],
            lastInvite: "",
            friends: this.props.user.friends,
            isParent: false,
            motto: this.props.register.sitterMotto,
            personality: personality,
            settings: {
                allowNotification: true,
                allowShowOnSearch: true
            },
            pushNotifications: {},
            multipleInvites: []
        };


        geocodeByAddress(this.props.user.address,  (err, latLng) => {
            if (err) {
                console.log('Oh no!', err)
            }
            else {
                let add = self.props.user.address.split(',');
                const street = add[0].split(' ');
                let houseNumber = street.pop();
                if (Number.isNaN(houseNumber)) {
                    street.push(houseNumber);
                    houseNumber = 0;
                }
                const address = {
                    city: self.props.user.address.split(',')[1],
                    street: _.join(street, " "),
                    houseNumber: Number(houseNumber),
                    longitude: latLng.lng,
                    latitude: latLng.lat
                };
                sitter.address = address;
                axios({
                    method: 'post',
                    url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/create',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: sitter
                }).then(function (res) {
                    if (res.data) {  // user created
                        if(self.props.user.friends.length > 0){
                            axios({
                                method: 'post',
                                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
                                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                data: {_id: self.props.user.facebookID}
                            })
                                .then(function (response) {
                                    if (response.data) {  // user exists
                                        axios({
                                            method: 'post',
                                            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/updateMutualFriends',
                                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                            data: response.data
                                        })
                                            .then(function (response) {
                                                document.cookie = ("auth_token="+self.props.user.facebookID);
                                                self.props.actions.actionCreators.changeIsParentFlag(false);
                                                self.props.router.push('/');
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }

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
        });
    }
    handleSelect(selectedKey) {
        this.props.actions.registerActions.changeRegisterView(selectedKey);
    }

    next(){
        let registerViewIndex = strings.STEPS.indexOf(this.props.register.view) +1;
        this.props.actions.registerActions.changeRegisterView(strings.STEPS[registerViewIndex])
    }
    render() {
        let registerView = null;
        if (this.props.register.view !== null) {
            let view = this.props.register.view;
            if (view === "step1") {
                registerView = <section>
                    <h2>Your Profile</h2>
                    <BaseForm {...this.props}/>
                    <ControlLabel>Languages</ControlLabel>
                    <SelectInput
                        placeholder="Select your languages"
                        options={strings.LANGUAGES}
                        {...this.props}
                        defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}
                        action={this.props.actions.registerActions.changeLanguages}
                        reducer={'register'}/>
                </section>;
            }
            else if (view === "step2") {
                registerView =
                    <section>
                        <h2>Your Experience</h2>
                        <TextInput label="Years of Experience"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeSitterExperience}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <ControlLabel>Immediate Availability</ControlLabel>
                        <RadioGroup options={strings.BOOLEAN}
                                    action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                                    radioType={'sitterImmediateAvailability'}
                                    value={this.props.register.sitterImmediateAvailability}
                                    required={true}/>
                        <ControlLabel>Education</ControlLabel>
                        <SelectInput
                            placeholder="Select your education level"
                            options={strings.EDUCATION}
                            {...this.props}
                            defaultValues={this.getEducationFromFacebook(this.props.register.sitterEducation)}
                            action={this.props.actions.registerActions.changeSitterEducation}
                            reducer={'register'}/>
                        <ControlLabel>Expertise</ControlLabel>
                        <SelectInput
                            placeholder="Select Expertise"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterExpertise}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterExpertise}/>
                        <ControlLabel>Special Needs Qualifications</ControlLabel>
                        <SelectInput
                            placeholder="Select Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterSpecialNeeds}/>
                        <ControlLabel>Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterHobbies}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterHobbies}/>
                    </section>
            }
            else if (view === "step3") {
                registerView =
                    <section>
                        <h2>Your Requirements</h2>
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
                        <h3>Working Hours</h3>
                        <WorkingHours
                            days={strings.WEEK_DAYS}
                            hours={strings.HOURS}
                            action={this.props.actions.workingHoursActions.changeWorkingHours}/>
                    </section>
            }
            else if (view === "step4") {
                registerView =
                    <section>
                        <h2>Your Spirit</h2>
                        <ControlLabel>Sitter Mobility</ControlLabel>
                        <CheckBoxInput name="sitterMobility"
                                       types={strings.MOBILITY}
                                       action={this.props.actions.registerActions.changeSitterMobility}
                                       {...this.props}
                                       reducer={'register'}
                        />
                        <ControlLabel>Your Motto</ControlLabel>
                        <FormControl required maxlength="140" componentClass="textarea" placeholder="motto" onChange={(e) => this.props.actions.registerActions.changeSitterMotto(e.target.value)} />
                        <DragAndDropContainer {...this.props}/>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitSitter} type="submit" bsStyle="primary" bsSize="large" value="Sign Up">Sign Up</Button>: ''}
                    </section>
            }
        }
        return (
            <form className="sitter-form" onSubmit={this.handleSubmitSitter}>
                <Nav justified onSelect={this.handleSelect.bind(this)}>
                    <NavItem eventKey="step1" title="location">Step 1</NavItem>
                    <NavItem eventKey="step2">Step 2</NavItem>
                    <NavItem eventKey="step3">Step 3</NavItem>
                    <NavItem eventKey="step4">Step 4</NavItem>
                </Nav>
                {registerView}
                {strings.STEPS.indexOf(this.props.register.view) !== (strings.STEPS.length -1)?
                    <Button onClick={this.next.bind(this)} type="button" bsStyle="primary" bsSize="large" value="Next">Next</Button>: ''}
            </form>
        );
    };
}

export default Form;