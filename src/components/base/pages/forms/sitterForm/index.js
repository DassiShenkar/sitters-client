//external sources
import React from 'react';
import {AgeFromDate} from 'age-calculator';
import geocoder from 'geocoder';
import {geocodeByAddress} from "react-places-autocomplete";
import * as _ from "lodash";

//utils
import {post} from '../../../../../utils/serverCalls';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

//statics
import strings from '../../../../../static/strings';

export default class SitterFormBase extends React.Component {
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
        if(languages.length > 0){
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
        return (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;  //convert "01/01/1985" to years
    }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        const self = this;
        let expertise = [], hobbies = [], specialNeeds = [], education = [], personality = [], languages = [];
        let langs = this.props.register.languages ? this.props.register.languages : this.props.user.languages;
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
            name: this.props.register.name !== "" && this.props.register.age !== null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email !== "" && this.props.register.age !== null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age !== ""  && this.props.register.age !== null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            gender: this.props.register.gender !== "" && this.props.register.gender !== null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
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
            userType: "I'm a Sitter",
            invites: [],
            lastInvite: "",
            friends: this.props.user.friends,
            isParent: false,
            motto: this.props.register.sitterMotto,
            personality: personality,
            settings: {
                allowNotification: false,
                allowShowOnSearch: true
            },
            pushNotifications: {},
            multipleInvites: [],
            senderGCM: {
                senderId: "",
                valid: false
            }
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
                sitter.address = {
                    city: self.props.user.address.split(',')[1],
                    street: _.join(street, " "),
                    houseNumber: Number(houseNumber),
                    longitude: latLng.lng,
                    latitude: latLng.lat
                };
                post(sittersApi.CREATE_USER, sitter, (res) => {
                    if (res.data) {  // user created
                        if(self.props.user.friends.length > 0){
                            post(sittersApi.GET_USER, {_id: self.props.user.facebookID}, (response) => {
                                if (response.data) {  // get user from db
                                    post(sittersApi.UPDATE_FRIENDS, response.data, (response) =>{
                                        document.cookie = ("auth_token="+self.props.user.facebookID); // save token for future login
                                        document.cookie = ("is_parent=false");
                                        self.props.actions.actionCreators.changeIsParentFlag(false);
                                        self.props.router.push('/'); // move to sitter feed page
                                    });
                                }
                            });
                        }
                    }
                    else { // user not created
                        console.log('cannot create user');
                    }
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
}