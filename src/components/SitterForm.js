import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import RadioInput from './controllers/RadioInput';
import WorkingHours from './controllers/WorkingHours';
import BaseData from '../data/BaseData';
import PersonalityTest from './PersonalityTest'
import BaseForm from './BaseForm';
// import 'react-select/dist/react-select.css';
import strings from '../static/strings';
// var {AgeFromDate} = require('age-calculator');
// var Select = require('react-select');
// var DEBUG = true;
// var age;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
    }
    //     this.handleLanguageSelect       = this.handleLanguageSelect.bind(this);
    //     let usr = JSON.parse(localStorage.getItem('user'));
    //     if(DEBUG)
    //         console.log(usr);
    //     if(usr.birthday){ // calculate age from birthday
    //         let date = usr.birthday.split("/");
    //         age = (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    //     }
    //     this.state = {
    //         immediateFilter: "false",
    //         name: usr.name,
    //         email: usr.email,
    //         gender: usr.gender?usr.gender:"female",
    //         profilePicture: usr.profileImage,
    //         coverPhoto: usr.coverImage,
    //         location: usr.location,
    //         timezone: usr.timezone,
    //         education: usr.education,
    //         currency: usr.currency,
    //         age: age,
    //         options : BaseData.getLanguages(),
    //         childSpecialNeeds : [],
    //         languages : usr.languages,
    //         defaultTimeValue: '10:00'
    //     };
    //     if(DEBUG)
    //         console.log(this.state);
    // };

    // handleLanguageSelect(val) {
    //     this.setState({languages: val});
    // }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        // let sitter = {
        //     //gender: this.refs.genderRadio.state.value,
        //     name: this.refs.name.state.value,
        //     email: this.refs.email.state.value,
        //     age: this.refs.age.state.value,
        //     address: {
        //         city: this.refs.city.state.value,
        //         street: this.refs.street.state.value,
        //         houseNumber: this.refs.houseNumber.state.value,
        //     },
        //     profilePicture: this.state.profilePicture,
        //     coverPhoto: this.state.coverPhoto,
        //     timezone: this.state.timezone,
        //     languages: this.state.languages,
        //     education: this.state.education,
        //     minAge: this.refs.minAge.state.value,
        //     maxAge: this.refs.maxAge.state.value,
        //     hourFee: parseInt(this.refs.hourFee.state.value,10),
        //     //availableNow: this.refs.availableNow.state.value == "true",
        //     expertise: this.refs.sitterExpertise.state.value,
        //     hobbies: this.refs.sitterHobbies.state.value,
        //     specialNeeds: this.refs.sitterSpecialNeeds.state.value
        // };
    }

    render() {
        return (
            <form id="register-form" onSubmit={this.handleSubmitSitter}>


                {/*<TextInput label="Email"*/}
                           {/*type="email"*/}
                           {/*placeholder="Enter your email"*/}
                           {/*action={this.props.actions.registerActions.changeEmail}*/}
                           {/*inputType={'email'} {...this.props}*/}
                           {/*reducer={'register'}/>*/}
                {/*<TextInput label="Age"*/}
                           {/*type="number"*/}
                           {/*placeholder="25"*/}
                           {/*action={this.props.actions.registerActions.changeAge}*/}
                           {/*inputType={'age'} {...this.props}*/}
                           {/*reducer={'register'}/>*/}
                <BaseForm {...this.props} />

                {/*<TextInput ref='minAge' label="Minimum age to save children" type="number" placeholder="0" />*/}
                <TextInput label="Minimum age to save children"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeSitterMinimumAge}
                           inputType={'sitterMinAge'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='maxAge' label="Maximum age to save children" type="number" placeholder="8" />*/}
                <TextInput label="Age"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeSitterMaximumAge}
                           inputType={'sitterMaxAge'} {...this.props}
                           reducer={'register'}/>
                {/*<TextInput ref='hourFee' label="Age" type="number" placeholder="25" />*/}
                <TextInput label="Hour Fee"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeSitterHourFee}
                           inputType={'hourFee'} {...this.props}
                           reducer={'register'}/>
                <h4>Working Hours</h4>{/*TODO: think about this component*/}
                <WorkingHours days={strings.WEEK_DAYS} />
                <h3>Immediate availability</h3>
                {/*<RadioInput ref="availableNow" types={['True','False']} default="False"/>*/}
                <RadioInput types={strings.BOOLEAN}
                            action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                            radioType={'sitterImmediateAvailability'} {...this.props}
                            reducer={'register'}/>
                <h4>Sitter Expertise</h4>{/*TODO: implement multi checkbox*/}
                {/*<CheckBoxInput name="sitterExpertise" types={['Math','English','Physics']} ref="sitterExpertise"/>*/}
                <CheckBoxInput name="sitterExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeSitterExpertise}
                               inputType={'sitterExpertise'} {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Hobbies</h4>{/*TODO: implement multi checkbox*/}
                {/*<CheckBoxInput name="sitterHobbies" types={['Reading','Painting','Traveling','Sports','Swimming','Sleeping','Watching TV']} ref="sitterHobbies"/>*/}
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeSitterHobbies}
                               inputType={'sitterHobbies'} {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Special needs</h4>{/*TODO: implement multi checkbox*/}
                {/*<CheckBoxInput name="sitterHobbies" types={['ADD','Aphasia/Dysphagia','Auditory Processing','Autism','Cystic Fibrosis','Developmental Delays']} ref="sitterSpecialNeeds"/>*/}
                <CheckBoxInput name="childHobbies"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                               inputType={'sitterSpecialNeeds'} {...this.props}
                               reducer={'register'}
                />
                <h4>Sitter Personality Test:</h4>
                {/*<PersonalityTest questions={BaseData.getQuestions()}/>*/}
                <input type="submit" className="submit-invite" value="Sign Up"/>{/*TODO: pass question from server*/}
            </form>
        );
    };
}

export default Form;