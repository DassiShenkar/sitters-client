import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import RadioInput from './controllers/RadioInput';
import SelectInput from './controllers/SelectInput';
import baseData from '../data/BaseData';
import axios from 'axios';
var {AgeFromDate} = require('age-calculator');

var DEBUG = true;
var age;
import strings from '../static/strings';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        // if (usr.birthday) { // calculate age from birthday
        //     let date = usr.birthday.split("/");
        //     age = (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
        // }
        //     defaultTimeValue: '10:00'
        // };
    };

    // handleLanguageSelect(val) {
    //     this.setState({languages: val});
    // }

    handleSubmitParent(e) {
        e.preventDefault();
        let languages = [];
        this.props.register.languages.forEach (function(language){
            languages.push(language.value);
        });
        let parent = {
            name: this.props.register.name,
            email: this.props.register.email,
            age: this.props.register.age,
            address: {
                city: this.props.register.city,
                street: this.props.register.street,
                houseNumber: this.props.register.houseNumber,
            },
            gender: this.props.register.gender.toLowerCase(),
            // profilePicture: this.state.profilePicture,
            // coverPhoto: this.state.coverPhoto,
            // timezone: this.state.timezone,
            maxPrice: this.props.register.watchMaxPrice,
            languages: languages,
            children: {
                name: this.props.register.childName,
                age: this.props.register.childAge,
                expertise: this.props.register.childExpertise,
                hobbies: this.props.register.childHobbies,
                specialNeeds: this.props.register.childSpecialNeeds,
            }
        };
        console.log(parent);
        axios.post('http://localhost:4000/parent/create', {
            data: JSON.stringify(parent),
            headers: {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin' : '*','Content-Type': 'application/json'}
        })
            .then(function (res) {
                console.log(res);
                // if (res.data) {  // user exists
                //     localStorage.setItem("isAuth", "true");
                //     self.props.router.push('/feed');
                // }
                // else { // user not exist
                //     console.log("unknown user");
                //     self.props.actions.actionCreators.createUser(response);
                //     self.props.router.push('/register')
                // }
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    render() {
        return (
            <form id="register-form" onSubmit={this.handleSubmitParent}>
                <TextInput label="Name"
                           placeholder="Moshe Levi"
                           action={this.props.actions.registerActions.changeName}
                           inputType={'name'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Email"
                           type="email"
                           placeholder="Enter your email"
                           action={this.props.actions.registerActions.changeEmail}
                           inputType={'email'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeAge}
                           inputType={'age'} {...this.props}
                           reducer={'register'}/>
                <h4>Address</h4>
                <TextInput label="City"
                           placeholder="Tel Aviv"
                           action={this.props.actions.registerActions.changeCity}
                           inputType={'city'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Name"
                           placeholder="Arlozorov"
                           action={this.props.actions.registerActions.changeStreet}
                           inputType={'street'} {...this.props}
                           reducer={'register'}/>
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
                <h4>Languages</h4>
                <SelectInput
                    placeholder="Select your languages"
                    options={baseData.getLanguages()}
                    {...this.props}
                    defaultLanguages={this.props.register.languages}
                    action={this.props.actions.registerActions.changeLanguages}
                    inputType={'languages'} {...this.props}
                    reducer={'register'}/>
                <h3>Child</h3>
                <TextInput label="Max price for watch"
                           type="number"
                           placeholder="20"
                           action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                           inputType={'watchMaxPrice'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Child Name"
                           placeholder="Yoel Levi"
                           action={this.props.actions.registerActions.changeChildName}
                           inputType={'childName'} {...this.props}
                           reducer={'register'}/>
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
                <h4>Child Hobbies</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeChildHobbies}
                               inputType={'childHobbies'} {...this.props}
                               reducer={'register'}
                />
                <h4>Child Special needs</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeChildSpecialNeeds}
                               inputType={'childSpecialNeeds'} {...this.props}
                               reducer={'register'}
                />
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;