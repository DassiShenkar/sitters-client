'use strict';
import React, { PropTypes, Component } from 'react';
import '../styles/css/register.scss';
import 'react-select/dist/react-select.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import baseData from '../data/base';
var ageCalculator = require('age-calculator'),
    {AgeFromDateString, AgeFromDate} = require('age-calculator'),
    Select = require('react-select'),
    $ = require('jquery'),
    url,
    localhost = 'http://localhost:4000/',
    DEBUG = true,
    age;

class Register extends Component {
    constructor() {
        super();
        this.handleSubmitParent         = this.handleSubmitParent.bind(this);
        this.handleSubmitSitter         = this.handleSubmitSitter.bind(this);
        this.handleLanguageSelect       = this.handleLanguageSelect.bind(this);
        this.onChangeImmediate          = this.onChangeImmediate.bind(this);
        this.onChangeChildSpecialNeeds  = this.onChangeChildSpecialNeeds.bind(this);
        this.onChangeChildHobbies       = this.onChangeChildHobbies.bind(this);
        this.onChangeChildExpertise     = this.onChangeChildExpertise.bind(this);
        this.onChangeSitterSpecialNeeds = this.onChangeSitterSpecialNeeds.bind(this);
        this.onChangeSitterHobbies      = this.onChangeSitterHobbies.bind(this);
        this.onChangeSitterExpertise    = this.onChangeSitterExpertise.bind(this);
        this.onChangeSunday             = this.onChangeSunday.bind(this);
        let usr = JSON.parse(localStorage.getItem('user'));
        if(DEBUG)
            console.log(usr);
        if(usr.birthday){ // calculate age from birthday
            let date = usr.birthday.split("/");
            age = (new AgeFromDate(new Date(parseInt(date[2]),parseInt(date[1]) -1, parseInt(date[0]) -1)).age) || 0;
        }
        this.state = {
            selectedForm: "parent",
            genderFilter: usr.gender?usr.gender:"female",
            immediateFilter: "false",
            name: usr.name,
            email: usr.email,
            gender: usr.gender,
            profilePicture: usr.profileImage,
            coverPhoto: usr.coverImage,
            location: usr.location,
            timezone: usr.timezone,
            education: usr.education,
            currency: usr.currency,
            age: age,
            options : baseData.getLanguages(),
            childSpecialNeeds : [],
            languages : usr.languages,
            childHobbies : [],
            childExpertise: [],
            sitterExpertise: [],
            sitterHobbies : [],
            sitterSpecialNeeds : [],
            defaultTimeValue: '10:00'
        };
        if(DEBUG)
            console.log(this.state);
    }

    onChange(filterName) {
        if (filterName === "parent") {
            this.setState({selectedForm: "sitter"});
        }
        else {
            this.setState({selectedForm: "parent"});
        }
    }

    handleLanguageSelect(val) {
        this.setState({languages: val});
    }

    onChangeGender(gender) {
        if (gender === "male") {
            this.setState({genderFilter: "male"});
        }
        else {
            this.setState({genderFilter: "female"});
        }
    }
    onChangeChildSpecialNeeds (newSpecialNeeds) {
        this.setState({
            childSpecialNeeds: newSpecialNeeds
        });
        if(DEBUG)
            console.log(newSpecialNeeds);
        }
    onChangeChildHobbies (newHobbies){
        this.setState({
            childHobbies: newHobbies
        });
        if(DEBUG)
            console.log(newHobbies);
    }
    onChangeChildExpertise(newExpertise){
        this.setState({
            childExpertise: newExpertise
        });
        if(DEBUG)
            console.log(newExpertise);
    }
    onChangeSitterSpecialNeeds (newSpecialNeeds) {
        this.setState({
            sitterSpecialNeeds: newSpecialNeeds
        });
        if(DEBUG)
            console.log(newSpecialNeeds);
    }
    onChangeSitterHobbies (newHobbies){
        this.setState({
            sitterHobbies: newHobbies
        });
        if(DEBUG)
            console.log(newHobbies);
    }
    onChangeSitterExpertise(newExpertise){
        this.setState({
            sitterExpertise: newExpertise
        });
        if(DEBUG)
            console.log(newExpertise);
    }

    onChangeImmediate (immediate) {
        if (immediate === "false") {
            this.setState({immediateFilter: "false"});
        }
        else {
            this.setState({immediateFilter: "true"});
        }
    }

    handleSubmitParent(e) { // get all the form params and create parent
        e.preventDefault();
        if(DEBUG)
            console.log(this.refs);
        //noinspection JSUnresolvedVariable
        let parent = {
            name: this.refs.name.defaultValue,
            email: this.refs.email.defaultValue,
            gender: this.state.genderFilter,
            age: this.refs.age.defaultValue,
            address: {
                city: this.refs.city.value,
                street: this.refs.street.value,
                houseNumber: this.refs.houseNumber.value
            },
            profilePicture: this.state.profilePicture,
            coverPhoto: this.state.coverPhoto,
            timezone: this.state.timezone,
            maxPrice: this.refs.maxPrice.value,
            languages: this.state.languages,
            children: {
                name: this.refs.childName.value,
                age:  this.refs.childAge.value,
                expertise: this.state.childExpertise,
                hobbies: this.state.childHobbies,
                specialNeeds: this.state.childSpecialNeeds
            }
        };
        if(DEBUG){
            console.log(parent);
            url = localhost + 'parent/create';
        }
        else{
            url = "";
        }


        $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(parent),
            success: function (data) {
                if(DEBUG)
                    console.log(data);
                location.replace("feed");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };
    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        console.log(this.refs);
        //noinspection JSUnresolvedVariable
        let sitter = {
            name: this.refs.name.value,
            email: this.refs.email.defaultValue,
            gender: this.state.genderFilter,
            age: this.refs.age.defaultValue,
            address: {
                city: this.refs.city.value,
                street: this.refs.street.value,
                houseNumber: this.refs.houseNumber.value
            },
            profilePicture: this.state.profilePicture,
            coverPhoto: this.state.coverPhoto,
            timezone: this.state.timezone,
            languages: this.state.languages,
            education: this.state.education,
            minAge: this.refs.minAge.value,
            maxAge: this.refs.maxAge.value,
            hourFee: parseInt(this.refs.hourFee.value),
            availableNow: this.state.immediateFilter == "true",
            expertise: this.state.sitterExpertise,
            hobbies: this.state.sitterHobbies,
            specialNeeds: this.state.sitterSpecialNeeds
        };
        if(DEBUG){
            console.log(sitter);
            url = localhost + 'sitter/create';
        }
        else{
            url = "";
        }
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(sitter),
            success: function (data) {
                if(DEBUG)
                    console.log(data);
                location.replace("feed");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render(){
        let parentForm, sitterForm;
        if (this.state.selectedForm === "parent") {
            parentForm =
                <form id="register-form" onSubmit={this.handleSubmitParent}>
                    <ul className="login-input-fields">
                        <li>
                            <label className="login-label" htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" ref="name" defaultValue={this.state.name} placeholder="Moshe Levi" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref="email" defaultValue={this.state.email} placeholder="example@gmail.com" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Age</label>
                            <input type="number" min="0" max="120" name="age" id="age" ref="age" defaultValue={this.state.age} required/>
                        </li>
                        <h4>Address</h4>
                        <li>
                            <label className="login-label" htmlFor="city">City</label>
                            <input type="text" id="city" ref="city" required defaultValue="" placeholder="Tel Aviv"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="street">Street</label>
                            <input type="text" id="street" ref="street" required defaultValue="" placeholder="Arlozorov"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="houseNumber">House Number</label>
                            <input type="number" id="houseNumber" ref="houseNumber" defaultValue="" required min="0" max="350"
                                   placeholder="36"/>
                        </li>
                        <h3>Gender</h3>
                        <ul className="user-select">
                            <li className="user-option">
                                <label htmlFor="male">Male</label>
                                <input id="male" value="male" type="radio" checked={this.state.genderFilter === "male"}
                                       name="gender-radio" onChange={this.onChangeGender.bind(this, "male")}/>
                            </li>
                            <li className="user-option">
                                <label htmlFor="female">Female</label>
                                <input id="female" value="female" type="radio"
                                       checked={this.state.genderFilter === "female"} name="gender-radio"
                                       onChange={this.onChangeGender.bind(this, "female")}/>
                            </li>
                        </ul>
                        <h4>Profile picture</h4>
                        <li>
                            <div>
                                <img src={this.state.profilePicture} alt="Profile picture"/>
                            </div>
                        </li>
                        <h4>Languages</h4>
                        <Select
                            name="form-field-name"
                            multi={true}
                            value={this.state.languages}
                            options={this.state.options}
                            onChange={this.handleLanguageSelect.bind(this)}
                            placeholder="Select your favourite(s)"
                        />

                        <h3>Child</h3>
                        <li>
                            <label className="login-label" htmlFor="maxPrice">Max price for watch</label>
                            <input type="number" name="maxPrice" defaultValue="" id="maxPrice" ref="maxPrice" placeholder="20" min="0" max="100" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="name">Child Name:</label>
                            <input className="input name" id="name" name="prof1" type="text" placeholder="Beni levi"
                                   ref="childName" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Child Age</label>
                            <input className="input age" id="age" name="prof1" type="number" placeholder="3"
                                   ref="childAge" required min="0" max="12"/>
                        </li>
                        <h4>Child Expertise</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childExpertise"
                            value=""
                            onChange={this.onChangeChildExpertise}>
                            <label><Checkbox value="Math"/> Math</label>
                            <label><Checkbox value="English"/> Painting</label>
                            <label><Checkbox value="Physics"/> Physics</label>
                        </CheckboxGroup>
                        <h4>Child Hobbies</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childHobbies"
                            value=""
                            onChange={this.onChangeChildHobbies}>
                            <label><Checkbox value="Reading"/> Reading</label>
                            <label><Checkbox value="Painting"/> Painting</label>
                            <label><Checkbox value="Traveling"/> Traveling</label>
                            <label><Checkbox value="Sports"/> Sports</label>
                            <label><Checkbox value="Swimming"/> Swimming</label>
                            <label><Checkbox value="Sleeping"/> Sleeping</label>
                            <label><Checkbox value="Watching TV"/> Watching TV</label>
                        </CheckboxGroup>
                        <h4>Child Special needs</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childSpecialNeeds"
                            value=""
                            onChange={this.onChangeChildSpecialNeeds}>
                            <label><Checkbox value="ADD"/> ADD</label>
                            <label><Checkbox value="Aphasia/Dysphagia"/> Aphasia/Dysphagia</label>
                            <label><Checkbox value="Auditory Processing"/> Auditory Processing</label>
                            <label><Checkbox value="Autism"/> Autism</label>
                            <label><Checkbox value="Cystic Fibrosis"/> Cystic Fibrosis</label>
                            <label><Checkbox value="Developmental Delays"/> Developmental Delays</label>
                        </CheckboxGroup>
                    </ul>
                    <input type="submit" className="submit-invite" value="Sign Up"/>
                </form>;
        }
        if (this.state.selectedForm === "sitter") {
            sitterForm =
                <form id="register-form" onSubmit={this.handleSubmitSitter}>
                    <ul className="login-input-fields">
                        <li>
                            <label className="login-label" htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" ref="name" defaultValue={this.state.name} placeholder="Moshe Levi" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref="email" defaultValue={this.state.email} placeholder="example@gmail.com" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Age</label>
                            <input type="number" min="0" max="120" name="age" id="age" ref="age" defaultValue={this.state.age} required />
                        </li>
                        <h4>Address</h4>
                        <li>
                            <label className="login-label" htmlFor="city">City</label>
                            <input type="text" id="city" ref="city" required defaultValue="" placeholder="Tel Aviv"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="street">Street</label>
                            <input type="text" id="street" ref="street" required defaultValue="" placeholder="Arlozorov"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="houseNumber">House Number</label>
                            <input type="number" id="houseNumber" ref="houseNumber" defaultValue="" required min="0" max="350"
                                   placeholder="36"/>
                        </li>
                        <h3>Gender</h3>
                        <ul className="user-select">
                            <li className="user-option">
                                <label htmlFor="male">Male</label>
                                <input id="male" value="male" type="radio" checked={this.state.genderFilter === "male"}
                                       name="gender-radio" onChange={this.onChangeGender.bind(this, "male")}/>
                            </li>
                            <li className="user-option">
                                <label htmlFor="female">Female</label>
                                <input id="female" value="female" type="radio"
                                       checked={this.state.genderFilter === "female"} name="gender-radio"
                                       onChange={this.onChangeGender.bind(this, "female")}/>
                            </li>
                        </ul>
                        <h4>Profile picture</h4>
                        <li>
                            <div>
                                <img src={this.state.profilePicture} alt="Profile picture"/>
                            </div>
                        </li>
                        <h4>Languages</h4>
                        <Select
                            name="form-field-name"
                            multi={true}
                            value={this.state.languages}
                            options={this.state.options}
                            onChange={this.handleLanguageSelect.bind(this)}
                            placeholder="Select your favourite(s)"
                        />
                        <li>
                            <label className="login-label" htmlFor="age">Minimum age to save children</label>
                            <input type="number" min="0" max="12" name="minAge" id="minAge" ref="minAge" placeholder="0" required/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Maximum age to save children</label>
                            <input type="number" min="0" max="12" name="maxAge" id="maxAge" ref="maxAge" placeholder="8" required/>
                        </li>
                        <li>
                            <label htmlFor="hour-fee" className="login-label" >Hour Fee</label>
                            <input className="input age" id="hour-fee" type="number" placeholder="25" ref="hourFee"
                                   required="true" min="1" max="100"/>
                        </li>

                        <h4>Working Hours</h4>{/*TODO: think about this component*/}
                        <TimePicker onChange={this.onChangeSunday} />
                        <h3>Immediate availability</h3>
                        <ul className="user-select">
                            <li className="user-option">
                                <label htmlFor="immediate_true">True</label>
                                <input id="immediate_true" value="immediate_true" type="radio" checked={this.state.immediateFilter === "true"}
                                       name="immediate-radio" onChange={this.onChangeImmediate.bind(this, "true")}/>
                            </li>
                            <li className="user-option">
                                <label htmlFor="immediate_false">False</label>
                                <input id="immediate_false" value="immediate_false" type="radio"
                                       checked={this.state.immediateFilter === "false"} name="immediate-radio"
                                       onChange={this.onChangeImmediate.bind(this, "false")}/>
                            </li>
                        </ul>
                        <h4>Sitter Expertise</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childExpertise"
                            value=""
                            onChange={this.onChangeSitterExpertise}>
                            <label><Checkbox value="Math"/> Math</label>
                            <label><Checkbox value="English"/> Painting</label>
                            <label><Checkbox value="Physics"/> Physics</label>
                        </CheckboxGroup>
                        <h4>Sitter Hobbies</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childHobbies"
                            value=""
                            onChange={this.onChangeSitterHobbies}>
                            <label><Checkbox value="Reading"/> Reading</label>
                            <label><Checkbox value="Painting"/> Painting</label>
                            <label><Checkbox value="Traveling"/> Traveling</label>
                            <label><Checkbox value="Sports"/> Sports</label>
                            <label><Checkbox value="Swimming"/> Swimming</label>
                            <label><Checkbox value="Sleeping"/> Sleeping</label>
                            <label><Checkbox value="Watching TV"/> Watching TV</label>
                        </CheckboxGroup>
                        <h4>Sitter Special needs</h4>{/*TODO: implement multi checkbox*/}
                        <CheckboxGroup
                            name="childSpecialNeeds"
                            value=""
                            onChange={this.onChangeSitterSpecialNeeds}>
                            <label><Checkbox value="ADD"/> ADD</label>
                            <label><Checkbox value="Aphasia/Dysphagia"/> Aphasia/Dysphagia</label>
                            <label><Checkbox value="Auditory Processing"/> Auditory Processing</label>
                            <label><Checkbox value="Autism"/> Autism</label>
                            <label><Checkbox value="Cystic Fibrosis"/> Cystic Fibrosis</label>
                            <label><Checkbox value="Developmental Delays"/> Developmental Delays</label>
                        </CheckboxGroup>
                    </ul>
                    <input type="submit" className="submit-invite" value="Sign Up"/>
                </form>;
        }
        return (
            <div id="register-page">
                <section className="invite-info">
                    <h1 className="login-title">Sign Up</h1>
                </section>
                <ul className="user-select">
                    <li className="user-option">
                        <label htmlFor="parentRadio">I'm a Parent</label>
                        <input id="parentRadio" value="parent" type="radio"
                               checked={this.state.selectedForm === "parent"} name="radio-register"
                               onChange={this.onChange.bind(this, "sitter")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="sitterRadio">I'm a Sitter</label>
                        <input id="sitterRadio" value="sitter" type="radio"
                               checked={this.state.selectedForm === "sitter"} name="radio-register"
                               onChange={this.onChange.bind(this, "parent")}/>
                    </li>
                </ul>
                {parentForm}
                {sitterForm}
            </div>
        );
    }
}
export default Register;
