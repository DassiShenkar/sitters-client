import React from 'react';
import TextInput from '../controllers/textInput/index';
import BaseForm from './BaseForm';
import axios from 'axios';
import strings from '../../static/strings';
import {AgeFromDate} from 'age-calculator';
import RadioGroup from "../controllers/radio/radioGroup/index";
import {Button, ControlLabel, Nav, NavItem} from "react-bootstrap";
import SelectInput from "../controllers/select/SelectInput";
import {geocodeByAddress} from "react-places-autocomplete";

//style
import './style.css';
import * as _ from "lodash";
import DragAndDropContainer from "../dragAndDropContainer/index";

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
        let expertise = [], hobbies = [], specialNeeds = [],personality = [];
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
        this.props.register.items.forEach(function(o){
            personality.push(o.label);
        });
        let partner;
        if(this.props.register.havePartner){
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
            userType: "I'm a Parent",
            personality: personality,
            notifications: [],
            invites: [],
            blacklist: [],
            settings: {
                allowNotification: false,
                allowSuggestions: false
            },
            friends: this.props.user.friends,
            preferedGender: this.props.register.watchChildGender.toLowerCase(),
            isParent: true,
            pushNotifications: {}
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
                        if(self.props.user.friends.length > 0){
                            axios({
                                method: 'post',
                                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
                                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                data: {_id: self.props.user.facebookID}
                            })
                                .then(function (response) {
                                    if (response.data) {  // user exists
                                        // let parent = response.data;
                                        // parent.friends = self.props.user.friends.data;
                                        axios({
                                            method: 'post',
                                            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/updateMutualFriends',
                                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                            data: response.data
                                        })
                                            .then(function (response) {
                                                document.cookie = ("auth_token="+self.props.user.facebookID);
                                                self.props.actions.actionCreators.changeIsParentFlag(true);
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
                </section>;
            }
            else if (view === "step2") {
                const partner =
                    <section>
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
                                    action={this.props.actions.registerActions.changePartnerGender}
                                    radioType={'partnerGender'}
                                    value={this.props.register.partnerGender}
                                    required={true}/>
                    </section>;
                registerView =
                    <section>
                        <h2>Partner Profile</h2>
                        <ControlLabel>Do you have a partner?</ControlLabel>
                        <RadioGroup options={strings.BOOLEAN}
                                    action={this.props.actions.registerActions.changeHavePartner}
                                    radioType={'partner'}
                                    value={this.props.register.havePartner}
                                    required={true}
                        />
                        {this.props.register.havePartner === 'True'? partner: ""}
                    </section>
            }
            else if (view === "step3") {
                registerView =
                    <section>
                        <h2>Child Profile</h2>
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
                        <ControlLabel>Child Difficulties</ControlLabel>
                        <SelectInput
                            placeholder="Select child Difficulties"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildExpertise}
                            reducer={'register'}
                            defaultValues={this.props.register.childExpertise}/>
                        <ControlLabel>Child Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select child Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildHobbies}
                            reducer={'register'}
                            defaultValues={this.props.register.childHobbies}/>
                        <ControlLabel>Child Special Needs</ControlLabel>
                        <SelectInput
                            placeholder="Select child Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildSpecialNeeds}
                            reducer={'register'}
                            defaultValues={this.props.register.childSpecialNeeds}/>
                    </section>
            }
            else if (view === "step4") {
                registerView =
                    <section>
                        <h2>Sitter Requirements</h2>
                        <TextInput label="Max price for babysitting hour (USD)"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <ControlLabel>Preferred Sitter</ControlLabel>
                        <RadioGroup options={strings.GENDER_WITH_BOTH}
                                    action={this.props.actions.registerActions.changeGenderWatchChild}
                                    radioType={'genderWatch'}
                                    value={this.props.register.watchChildGender}/>
                        <ControlLabel>Languages</ControlLabel>
                        <SelectInput
                            placeholder="Select your languages"
                            options={strings.LANGUAGES}
                            {...this.props}
                            defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}
                            action={this.props.actions.registerActions.changeLanguages}
                            reducer={'register'}/>
                        <p>Please drag and drop <b>6</b> words to describe the personality of your dream Sitter.</p>
                        <DragAndDropContainer {...this.props}/>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitParent} type="submit" className="next-btn" value="Sign Up">Sign Up</Button>: ''}
                    </section>
            }
        }
        return (
            <div>
                <form id="register-form">
                    <Nav activeKey={"step1"} justified onSelect={this.handleSelect.bind(this)}>
                        <NavItem className={this.props.register.view === "step1"? "active-register-nav":""} eventKey="step1" title="location">Step 1</NavItem>
                        <NavItem className={this.props.register.view === "step2"? "active-register-nav":""} eventKey="step2">Step 2</NavItem>
                        <NavItem className={this.props.register.view === "step3"? "active-register-nav":""} eventKey="step3">Step 3</NavItem>
                        <NavItem className={this.props.register.view === "step4"? "active-register-nav":""} eventKey="step4">Step 4</NavItem>
                    </Nav>
                    {registerView}
                    {strings.STEPS.indexOf(this.props.register.view) !== (strings.STEPS.length -1)?
                        <Button onClick={this.next.bind(this)} type="button" className="next-btn" value="Next">Next</Button>: ''}
                </form>
            </div>
        );
    };
}

export default Form;