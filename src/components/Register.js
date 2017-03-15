'use strict';
import React, { PropTypes, Component } from 'react';
import '../styles/css/register.scss';
import 'react-select/dist/react-select.css';
import baseData from '../data/base';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import Radio from './RadioInput';
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
        //this.onChangeImmediate          = this.onChangeImmediate.bind(this);
        // this.onChangeChildSpecialNeeds  = this.onChangeChildSpecialNeeds.bind(this);
        // this.onChangeChildHobbies       = this.onChangeChildHobbies.bind(this);
        // this.onChangeChildExpertise     = this.onChangeChildExpertise.bind(this);
        // this.onChangeSitterSpecialNeeds = this.onChangeSitterSpecialNeeds.bind(this);
        // this.onChangeSitterHobbies      = this.onChangeSitterHobbies.bind(this);
        // this.onChangeSitterExpertise    = this.onChangeSitterExpertise.bind(this);
        // this.onChangeSunday             = this.onChangeSunday.bind(this);
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
            gender: usr.gender?usr.gender:"female",
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
            // childHobbies : [],
            // childExpertise: [],
            // sitterExpertise: [],
            // sitterHobbies : [],
            // sitterSpecialNeeds : [],
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

    // onChangeGender(gender) {
    //     if (gender === "male") {
    //         this.setState({genderFilter: "male"});
    //     }
    //     else {
    //         this.setState({genderFilter: "female"});
    //     }
    // }
    // onChangeChildSpecialNeeds (newSpecialNeeds) {
    //     this.setState({
    //         childSpecialNeeds: newSpecialNeeds
    //     });
    //     if(DEBUG)
    //         console.log(newSpecialNeeds);
    // }
    // onChangeChildHobbies (newHobbies){
    //     this.setState({
    //         childHobbies: newHobbies
    //     });
    //     if(DEBUG)
    //         console.log(newHobbies);
    // }
    // onChangeChildExpertise(newExpertise){
    //     this.setState({
    //         childExpertise: newExpertise
    //     });
    //     if(DEBUG)
    //         console.log(newExpertise);
    // }
    // onChangeSitterSpecialNeeds (newSpecialNeeds) {
    //     this.setState({
    //         sitterSpecialNeeds: newSpecialNeeds
    //     });
    //     if(DEBUG)
    //         console.log(newSpecialNeeds);
    // }
    // onChangeSitterHobbies (newHobbies){
    //     this.setState({
    //         sitterHobbies: newHobbies
    //     });
    //     if(DEBUG)
    //         console.log(newHobbies);
    // }
    // onChangeSitterExpertise(newExpertise){
    //     this.setState({
    //         sitterExpertise: newExpertise
    //     });
    //     if(DEBUG)
    //         console.log(newExpertise);
    // }
    //
    // onChangeImmediate (immediate) {
    //     if (immediate === "false") {
    //         this.setState({immediateFilter: "false"});
    //     }
    //     else {
    //         this.setState({immediateFilter: "true"});
    //     }
    // }

    handleSubmitParent(e) { // get all the form params and create parent
        e.preventDefault();
        //console.log(this.refs.name.getValue());
        // if(DEBUG)
        //     console.log(this.refs);
        // //noinspection JSUnresolvedVariable
        let parent = {
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue(),
            age: this.refs.age.getValue(),
            address: {
                city: this.refs.city.getValue(),
                street: this.refs.street.getValue(),
                houseNumber: this.refs.houseNumber.getValue(),
            },
            gender: this.refs.genderRadio.getValue(),
            profilePicture: this.state.profilePicture,
            coverPhoto: this.state.coverPhoto,
            timezone: this.state.timezone,
            maxPrice: this.refs.maxPrice.getValue(),
            languages: this.state.languages,
            children: {
                name: this.refs.childName.getValue(),
                age:  this.refs.childAge.getValue(),
                expertise: this.refs.childExpertise.getValue(),
                hobbies: this.refs.childHobbies.getValue(),
                specialNeeds: this.refs.childSpecialNeed.getValue(),
            }
        };
        console.log(parent);
        // if(DEBUG){
        //     console.log(parent);
        //     url = localhost + 'parent/create';
        // }
        // else{
        //     url = "";
        // }
        //
        //
        // $.ajax({
        //     url: url,
        //     dataType: 'json',
        //     type: 'post',
        //     contentType: 'application/json',
        //     data: JSON.stringify(parent),
        //     success: function (data) {
        //         if(DEBUG)
        //             console.log(data);
        //         localStorage.setItem('user',parent);
        //         location.replace("feed");
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
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
                localStorage.setItem('user',sitter);
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
                    <TextInput ref='name' label="Name" placeholder="Moshe Levi"/>
                    <TextInput ref='email' label="Email" type="email" placeholder="Enter your email" />
                    <TextInput ref='age' label="Age" type="number" placeholder="25" />
                    <h4>Address</h4>
                    <TextInput ref='city' label="City"  placeholder="Tel Aviv" />
                    <TextInput ref='street' label="Street"  placeholder="Arlozorov" />
                    <TextInput ref='houseNumber' label="House Number" type="number"  placeholder="4" />
                    <h3>Gender</h3>
                    <Radio ref="genderRadio" types={['Male','Female']} default={this.state.gender}/>
                    <h4>Profile picture</h4>
                    <img src={this.state.profilePicture} alt="Profile picture"/>
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
                    <TextInput ref='maxPrice' label="Max price for watch" type="number"  placeholder="20" />
                    <TextInput ref='childName' label="Child Name" placeholder="Yoel"/>
                    <TextInput ref='childAge' label="Age" type="number" placeholder="2" />
                    <h4>Child Expertise</h4>
                    <CheckBoxInput name="childExpertise" types={['Math','English','Physics']} ref="childExpertise"/>
                    <h4>Child Hobbies</h4>
                    <CheckBoxInput name="childHobbies" types={['Reading','Painting','Traveling','Sports','Swimming','Sleeping','Watching TV']} ref="childHobbies"/>
                    <h4>Child Special needs</h4>
                    <CheckBoxInput name="childSpecialNeed" types={['ADD','Aphasia/Dysphagia','Auditory Processing','Autism','Cystic Fibrosis','Developmental Delays']} ref="childSpecialNeed"/>
                    <input type="submit" className="submit-invite" value="Sign Up"/>
                </form>;
        }
        if (this.state.selectedForm === "sitter") {
            sitterForm =
                <form id="register-form" onSubmit={this.handleSubmitSitter}>
                    <TextInput ref='name' label="Name" placeholder="Moshe Levi"/>
                    <TextInput ref='email' label="Email" type="email" placeholder="Enter your email" />
                    <TextInput ref='age' label="Age" type="number" placeholder="25" />
                    <h4>Address</h4>
                    <TextInput ref='city' label="City"  placeholder="Tel Aviv" />
                    <TextInput ref='street' label="Street"  placeholder="Arlozorov" />
                    <TextInput ref='houseNumber' label="House Number" type="number"  placeholder="Arlozorov" />
                    <h3>Gender</h3>
                    <Radio ref="genderRadio" types={['Male','Female']} default={this.state.gender}/>
                    <h4>Profile picture</h4>
                    <img src={this.state.profilePicture} alt="Profile picture"/>
                    <h4>Languages</h4>
                    <Select
                        name="form-field-name"
                        multi={true}
                        value={this.state.languages}
                        options={this.state.options}
                        onChange={this.handleLanguageSelect.bind(this)}
                        placeholder="Select your favourite(s)"
                    />
                    <TextInput ref='minAge' label="Minimum age to save children" type="number" placeholder="0" />
                    <TextInput ref='maxAge' label="Maximum age to save children" type="number" placeholder="8" />
                    <TextInput ref='hourFee' label="Age" type="number" placeholder="25" />
                    <h4>Working Hours</h4>{/*TODO: think about this component*/}
                    <h3>Immediate availability</h3>
                    <Radio types={['True','False']} default="false"/>
                    <h4>Sitter Expertise</h4>{/*TODO: implement multi checkbox*/}
                    <CheckBoxInput name="sitterExpertise" types={['Math','English','Physics']} ref="sitterExpertise"/>
                    <h4>Sitter Hobbies</h4>{/*TODO: implement multi checkbox*/}
                    <CheckBoxInput name="sitterHobbies" types={['Reading','Painting','Traveling','Sports','Swimming','Sleeping','Watching TV']} ref="sitterHobbies"/>
                    <h4>Sitter Special needs</h4>{/*TODO: implement multi checkbox*/}
                    <CheckBoxInput name="sitterHobbies" types={['ADD','Aphasia/Dysphagia','Auditory Processing','Autism','Cystic Fibrosis','Developmental Delays']} ref="sitterHobbies"/>
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
