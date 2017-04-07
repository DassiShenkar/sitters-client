import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import RadioInput from './controllers/RadioInput';
import baseData from '../data/BaseData';
import 'react-select/dist/react-select.css';
var {AgeFromDate} = require('age-calculator');
var Select = require('react-select');
var DEBUG = true;
var age;
import strings from '../static/strings';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        // let usr = JSON.parse(localStorage.getItem('user'));
        // if (DEBUG)
        //     console.log(usr);
        // if (usr.birthday) { // calculate age from birthday
        //     let date = usr.birthday.split("/");
        //     age = (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
        // }
        // this.state = {
        //     immediateFilter: "false",
        //     name: usr.name,
        //     email: usr.email,
        //     gender: usr.gender ? usr.gender : "female",
        //     profilePicture: usr.profileImage,
        //     coverPhoto: usr.coverImage,
        //     location: usr.location,
        //     timezone: usr.timezone,
        //     education: usr.education,
        //     currency: usr.currency,
        //     age: age,
        //     options: baseData.getLanguages(),
        //     childSpecialNeeds: [],
        //     languages: usr.languages,
        //     defaultTimeValue: '10:00'
        // };
        // if (DEBUG)
        //     console.log(this.state);
    };

    handleLanguageSelect(val) {
        this.setState({languages: val});
    }

    handleSubmitParent(e) {
        e.preventDefault();
        let parent = {
            name: this.refs.name.state.value,
            email: this.refs.email.state.value,
            age: this.refs.age.state.value,
            address: {
                city: this.refs.city.state.value,
                street: this.refs.street.state.value,
                houseNumber: this.refs.houseNumber.state.value,
            },
            gender: this.refs.genderRadio.state.value,
            profilePicture: this.state.profilePicture,
            coverPhoto: this.state.coverPhoto,
            timezone: this.state.timezone,
            maxPrice: this.refs.maxPrice.state.value,
            languages: this.state.languages,
            children: {
                name: this.refs.childName.state.value,
                age: this.refs.childAge.state.value,
                expertise: this.refs.childExpertise.state.value,
                hobbies: this.refs.childHobbies.state.value,
                specialNeeds: this.refs.childSpecialNeed.state.value,
            }
        };
    };


    render() {
        return (
            <form id="register-form" onSubmit={this.handleSubmitParent}>
                <TextInput ref='name' label="Name" placeholder="Moshe Levi"/>
                <TextInput ref='email' label="Email" type="email" placeholder="Enter your email"/>
                <TextInput ref='age' label="Age" type="number" placeholder="25"/>
                <h4>Address</h4>
                <TextInput ref='city' label="City" placeholder="Tel Aviv"/>
                <TextInput ref='street' label="Street" placeholder="Arlozorov"/>
                <TextInput ref='houseNumber' label="House Number" type="number" placeholder="4"/>
                <h3>Gender</h3>
                {/*<RadioInput ref="genderRadio" types={['Male', 'Female']} default={this.state.gender}/>*/}
                <RadioInput ref="userInput" types={strings.GENDER}
                            action={this.props.actions.actionCreators.changeUserType}
                            radioType={'userType'} {...this.props}
                            reducer={'user'}/>
                <h4>Profile picture</h4>
                {/*<img src={this.state.profilePicture} alt={this.state.name}/>*/}
                <h4>Languages</h4>
                {/*<Select*/}
                    {/*name="form-field-name"*/}
                    {/*multi={true}*/}
                    {/*value={this.state.languages}*/}
                    {/*options={this.state.options}*/}
                    {/*onChange={this.handleLanguageSelect.bind(this)}*/}
                    {/*placeholder="Select your favourite(s)"*/}
                {/*/>*/}
                <h3>Child</h3>
                <TextInput ref='maxPrice' label="Max price for watch" type="number" placeholder="20"/>
                <TextInput ref='childName' label="Child Name" placeholder="Yoel"/>
                <TextInput ref='childAge' label="Age" type="number" placeholder="2"/>
                <h4>Child Expertise</h4>
                <CheckBoxInput name="childExpertise" types={['Math', 'English', 'Physics']} ref="childExpertise"/>
                <h4>Child Hobbies</h4>
                <CheckBoxInput name="childHobbies"
                               types={['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV']}
                               ref="childHobbies"/>
                <h4>Child Special needs</h4>
                <CheckBoxInput name="childSpecialNeed"
                               types={['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays']}
                               ref="childSpecialNeed"/>
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;