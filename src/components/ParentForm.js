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
                <TextInput label="Name"
                           placeholder="Moshe Levi"
                           action={this.props.actions.registerActions.changeName}
                           inputType={'name'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='email' label="Email" type="email" placeholder="Enter your email"/>*/}
                <TextInput label="Email"
                           type="email"
                           placeholder="Enter your email"
                           action={this.props.actions.registerActions.changeEmail}
                           inputType={'email'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='age' label="Age" type="number" placeholder="25"/>*/}
                <TextInput label="Age"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeAge}
                           inputType={'age'} {...this.props}
                           reducer={'register'}/>
                <h4>Address</h4>
                {/*<TextInput ref='city' label="City" placeholder="Tel Aviv"/>*/}
                <TextInput label="City"
                           placeholder="Tel Aviv"
                           action={this.props.actions.registerActions.changeCity}
                           inputType={'city'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='street' label="Street" placeholder="Arlozorov"/>*/}
                <TextInput label="Name"
                           placeholder="Arlozorov"
                           action={this.props.actions.registerActions.changeStreet}
                           inputType={'street'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='houseNumber' label="House Number" type="number" placeholder="4"/>*/}
                <TextInput label="House Number"
                           type="number"
                           placeholder="37"
                           action={this.props.actions.registerActions.changeHouseNumber}
                           inputType={'houseNumber'} {...this.props}
                           reducer={'register'}/>
                <h3>Gender</h3>
                <RadioInput ref="userInput" types={strings.GENDER}
                            action={this.props.actions.registerActions.changeGender}
                            radioType={'gender'} {...this.props}
                            reducer={'register'}/>
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
                {/*<TextInput ref='maxPrice' label="Max price for watch" type="number" placeholder="20"/>*/}
                <TextInput label="Max price for watch"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                           inputType={'childMaxPrice'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='childName' label="Child Name" placeholder="Yoel"/>*/}
                <TextInput label="Child Name"
                           placeholder="Yoel Levi"
                           action={this.props.actions.registerActions.changeChildName}
                           inputType={'childName'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='childAge' label="Age" type="number" placeholder="2"/>*/}
                <TextInput label="Age"
                           type="number"
                           placeholder="2"
                           action={this.props.actions.registerActions.changeChildAge}
                           inputType={'childAge'} {...this.props}
                           reducer={'register'}/>
                <h4>Child Expertise</h4>
                <CheckBoxInput name="childExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeChildExpertise}
                               inputType={'childExpertise'} {...this.props}
                               reducer={'register'}
                />
                {/*<h4>Child Hobbies</h4>*/}
                {/*<CheckBoxInput name="childHobbies"*/}
                               {/*types={['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV']}*/}
                               {/*ref="childHobbies"/>*/}
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeChildHobbies}
                               inputType={'childHobbies'} {...this.props}
                               reducer={'register'}
                />
                {/*<h4>Child Special needs</h4>*/}
                {/*<CheckBoxInput name="childSpecialNeed"*/}
                               {/*types={['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays']}*/}
                               {/*ref="childSpecialNeed"/>*/}
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;