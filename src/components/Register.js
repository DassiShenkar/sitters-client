import React, { PropTypes, Component } from 'react';
import '../styles/css/register.css'
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
import 'react-select/dist/react-select.css';
var $ = require('jquery');
import 'react-select/dist/react-select.css';

var Select = require('react-select');


class Register extends Component {

    constructor() {
        super();
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onChangeImmediate = this.onChangeImmediate.bind(this);
        let usr = JSON.parse(localStorage.getItem('user'));
        console.log(usr);
        if(usr.birthday){ // calculate age from birthday
            let date = usr.birthday.split("/");
            console.log(date);
            var age = (new AgeFromDate(new Date(parseInt(date[2]),parseInt(date[1]) -1, parseInt(date[0]) -1)).age) || 0;
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
            options : [
                { value: 'english', label: 'English' },
                { value: 'hebrew', label: 'Hebrew' },
                { value: 'chinese', label: 'Chinese' },
                { value: 'russian', label: 'Russian' },
                { value: 'japanese', label: 'Japanese' },
                { value: 'german', label: 'German' },
                { value: 'french', label: 'French' },
                { value: 'spanish', label: 'Spanish' }
            ],
            languages : usr.languages
        };
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

    handleSelectChange(val) {
        this.setState({languages: val});
        console.log("Selected: " + val);
        console.log(this.state.languages);
    }

    onChangeGender(gender) {
        if (gender === "male") {
            this.setState({genderFilter: "male"});
        }
        else {
            this.setState({genderFilter: "female"});
        }
    }

    onChangeImmediate (immediate) {
        if (immediate === "false") {
            this.setState({immediateFilter: "false"});
        }
        else {
            this.setState({immediateFilter: "true"});
        }
    }
    //
    // onChangeHours(hours) {
    //     if (hours === "Mornings")
    //         this.setState({workingHours: "Mornings"});
    //     else if (hours === "Evenings")
    //         this.setState({workingHours: "Evenings"});
    //     else
    //         this.setState({workingHours: "All day"});
    // }

    handleSubmitParent(e) {
        e.preventDefault();
        console.log(this.refs);
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
                age:  this.refs.childAge.value
            }
        };
        console.log(parent);

        $.ajax({
            url: 'http://localhost:4000/parent/create',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(parent),
            success: function (data) {
                console.log(data);
                location.replace("feed");
                //TODO move to feed page
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    };
    handleSubmitSitter(e) {// pass education
        e.preventDefault();
        console.log(this.refs);
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
            availableNow: this.state.immediateFilter == "true"
        };
        console.log('sitter');
        console.log(sitter);

        $.ajax({
            url: 'http://localhost:4000/sitter/create',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(sitter),
            success: function (data) {
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
                            <input type="text" name="name" id="name" ref="name" defaultValue={this.state.name} placeholder="Moshe Levi"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref="email" defaultValue={this.state.email} placeholder="example@gmail.com"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Age</label>
                            <input type="number" min="0" max="120" name="age" id="age" ref="age" defaultValue={this.state.age} />
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
                            onChange={this.handleSelectChange.bind(this)}
                            placeholder="Select your favourite(s)"
                        />

                        <h4>Child</h4>
                        <li>
                            <label className="login-label" htmlFor="maxPrice">Max price for watch</label>
                            <input type="number" name="maxPrice" defaultValue="" id="maxPrice" ref="maxPrice" placeholder="20" min="0" max="100"/>
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
                        <h4>Expertise</h4>{/*TODO: implement multi checkbox*/}
                        <h4>Hobbies</h4>{/*TODO: implement multi checkbox*/}
                        <h4>Special needs</h4>{/*TODO: implement multi checkbox*/}
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
                            <input type="text" name="name" id="name" ref="name" defaultValue={this.state.name} placeholder="Moshe Levi"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref="email" defaultValue={this.state.email} placeholder="example@gmail.com"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Age</label>
                            <input type="number" min="0" max="120" name="age" id="age" ref="age" defaultValue={this.state.age} />
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
                            onChange={this.handleSelectChange.bind(this)}
                            placeholder="Select your favourite(s)"
                        />
                        <li>
                            <label className="login-label" htmlFor="age">Minimum age to save children</label>
                            <input type="number" min="0" max="12" name="minAge" id="minAge" ref="minAge" placeholder="0"/>
                        </li>
                        <li>
                            <label className="login-label" htmlFor="age">Maximum age to save children</label>
                            <input type="number" min="0" max="12" name="maxAge" id="maxAge" ref="maxAge" placeholder="8"/>
                        </li>
                        <li>
                            <label htmlFor="hour-fee" className="login-label" >Hour Fee</label>
                            <input className="input age" id="hour-fee" type="number" placeholder="25" ref="hourFee"
                                   required="true" min="1" max="100"/>
                        </li>

                        <h4>Working Hours</h4>{/*TODO: think about this component*/}

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




                    </ul>
                    <input type="submit" className="submit-invite" value="Sign Up"/>
                </form>;
        }
        return (
            <div id="register-page">
                <section className="invite-info">
                    <h1 className="login-title">Sign In</h1>
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
