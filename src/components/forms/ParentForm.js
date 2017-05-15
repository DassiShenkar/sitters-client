import React from 'react';
import TextInput from '../controllers/textInput/index';
import BaseForm from './BaseForm';
import axios from 'axios';
import strings from '../../static/strings';
import {AgeFromDate} from 'age-calculator';
import RadioGroup from "../controllers/radio/radioGroup/index";
import {Button, ControlLabel} from "react-bootstrap";
import SelectInput from "../controllers/select/SelectInput";
import PersonalityQuestions from "./personality/PersonalityQuestions";
import {geocodeByAddress} from "react-places-autocomplete";

//style
import './style.css';
import * as _ from "lodash";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
    };
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }
    handleSubmitParent(e) {
        e.preventDefault();
        const self = this;
        let parent = {address:{},languages: []};
        let expertise = [], hobbies = [], specialNeeds= [];
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                parent.languages.push(language.name);
            else
                parent.languages.push(language.value);
        });
        if(this.props.register.childExpertise.length > 0){
            this.props.register.childExpertise.forEach(function(o){
                expertise.push(o.value);
            })
        }
        if(this.props.register.childSpecialNeeds.length > 0){
            this.props.register.childSpecialNeeds.forEach(function(o){
                specialNeeds.push(o.value);
            })
        }
        if(this.props.register.childHobbies.length > 0){
            this.props.register.childHobbies.forEach(function(o){
                hobbies.push(o.value);
            })
        }
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function(question){
            totalScore += question.value;
        });
        let partner;
        if(this.props.register.partnerName){
            partner = {
                gender: this.props.register.partnerGender,
                email:  this.props.register.partnerEmail,
                name:  this.props.register.partnerName
            };
            parent.partner = partner;
        }
        parent = {
            _id : this.props.user.facebookID,
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),

            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto?this.props.user.coverPhoto.source: "",
            timezone: this.props.user.timezone? this.props.user.timezone: "",
            profilePicture: this.props.user.picture? this.props.user.picture.data.url: "",
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: expertise,
                hobbies: hobbies,
                specialNeeds: specialNeeds,
            },
            userType: "I'm a parent",
            // personalityTest: {
            //     questions: this.props.register.personalityQuestions,
            //     totalScore: totalScore
            // },
            notifications: [],
            invites: [],
            blacklist: [],
            matchBI: {
                matchScores: [],
                median: 0
            },
            settings: {
                allowNotification: true,
                allowSuggestions: true
            },
            mutualFriends: this.props.user.friends
        };

        geocodeByAddress(this.props.user.address,  (err, latLng) => {
            if (err) { console.log('Oh no!', err) }
            else{
                let add = self.props.user.address.split(',');
                const street = add[0].split(' ');
                let houseNumber = street.pop();
                if(Number.isNaN(houseNumber)){
                   street.push(houseNumber);
                    houseNumber = 0;
                }
                const address = {
                    city: self.props.user.address.split(',')[1],
                    street: _.join(street," "),
                    // houseNumber: !Number.isNaN(self.props.user.address.split(',')[0].split(' ').slice(-1))? Number(self.props.user.address.split(',')[0].split(' ').slice(-1)):0,
                    houseNumber: Number(houseNumber),
                    longitude: latLng.lng,
                    latitude: latLng.lat
                };
                parent.address = address;
                axios({
                    method: 'post',
                    url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/create',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: parent
                }).then(function (res) {
                    if (res.data) {  // user created
                        document.cookie = ("auth_token="+parent._id);
                        self.props.router.push('/');
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
    render() {

        return (

            <div>
                <form id="register-form">
                    <BaseForm {...this.props}/>
                    <h3>Child</h3>
                    <TextInput label="Child Name"
                               placeholder="Child Name"
                               action={this.props.actions.registerActions.changeChildName}
                               {...this.props}
                               reducer={'register'}
                               required={true}/>
                    <TextInput label="Age"
                               type="number"
                               placeholder="0"
                               action={this.props.actions.registerActions.changeChildAge}
                               {...this.props}
                               reducer={'register'}
                               required={true}/>
                    <h4>Child Difficulties</h4>
                    <SelectInput
                        placeholder="Select child Difficulties"
                        options={strings.EXPERTISE}
                        {...this.props}
                        action={this.props.actions.registerActions.changeChildExpertise}
                        reducer={'register'}
                        defaultValues={this.props.register.childExpertise}/>
                    <h4>Child Hobbies</h4>
                    <SelectInput
                        placeholder="Select child Hobbies"
                        options={strings.HOBBIES}
                        {...this.props}
                        action={this.props.actions.registerActions.changeChildHobbies}
                        reducer={'register'}
                        defaultValues={this.props.register.childHobbies}/>
                    <h4>Child Special needs</h4>
                    <SelectInput
                        placeholder="Select child Special Needs"
                        options={strings.SPECIAL_NEEDS}
                        {...this.props}
                        action={this.props.actions.registerActions.changeChildSpecialNeeds}
                        reducer={'register'}
                        defaultValues={this.props.register.childSpecialNeeds}/>
                    <TextInput label="Max price for babysitting hour (USD)"
                               type="number"
                               placeholder="0"
                               action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                               {...this.props}
                               reducer={'register'}
                               required={true}/>
                    <h4>Partner</h4>
                    <TextInput label="Partner Name"
                               placeholder='Name'
                               defaultValue={this.props.register.partnerName}
                               action={this.props.actions.registerActions.changePartnerName}
                               {...this.props}
                               reducer={'register'}/>
                    <TextInput label="Partner Email"
                               type="email"
                               placeholder='Email'
                               defaultValue={this.props.register.partnerEmail ? this.props.user.partnerEmail : ''}
                               action={this.props.actions.registerActions.changePartnerEmail}
                               {...this.props}
                               reducer={'register'}/>
                    <ControlLabel>Partner Gender</ControlLabel>
                    <RadioGroup options={strings.GENDER}
                                defaultValue={this.props.user.partnerGender ?  this.props.user.partnerGender[0].toUpperCase() + this.props.user.partnerGender.slice(1):"" }
                                action={this.props.actions.registerActions.changePartnerGender}
                                radioType={'partnerGender'}
                                value={this.props.user.gender}/>
                    <PersonalityQuestions questions={strings.QUESTIONS}
                                          addSameQuestionsClass={false}
                                          disabled={false}
                                          {...this.props}/>
                    {/*<PersonalityQuestions {...this.props}/>*/}
                    <div className="submit">
                        <Button onClick={this.handleSubmitParent} type="submit" bsStyle="primary" bsSize="large" value="Sign Up">Sign Up</Button>
                    </div>
                </form>
            </div>
        );
    };
}

export default Form;