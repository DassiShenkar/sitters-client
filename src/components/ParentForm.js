import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import BaseForm from './BaseForm';
import geocoder from 'geocoder'
import axios from 'axios';
import strings from '../static/strings';
import {AgeFromDate} from 'age-calculator';
import RadioInput from "./controllers/radio/RadioInput";


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
    };
    getGeoCode(callback){
        let city = this.props.register.city != null ? this.props.register.city != null : this.props.user.location.name.split(',')[0];
        geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + city , function ( err, data ) {
            if(err)
                console.log(err); // TODO: when address is wrong, add callback
            else{
                callback(data);
            }
        });
    }
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }
    handleSubmitParent(e) {
        e.preventDefault();
        let self = this;
        let parent = {address:{},languages: []};
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                parent.languages.push(language.name);
            else
                parent.languages.push(language.value);
        });
        this.getGeoCode(function(data) {
            parent.address.longitude = data.results[0] != null? data.results[0].geometry.location.lng: 0;
            parent.address.latitude = data.results[0] != null? data.results[0].geometry.location.lat: 0;
        });
        parent = {
            _id : this.props.user.facebookID,
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            address: {
                city: this.props.register.city != null? this.props.register.city : this.props.user.location.name.split(',')[0],
                street: this.props.register.street,
                houseNumber: Number(this.props.register.houseNumber),
            },
            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: this.props.register.childExpertise? this.props.register.childExpertise: [],
                hobbies: this.props.register.childHobbies? this.props.register.childHobbies: [],
                specialNeeds: this.props.register.childSpecialNeeds? this.props.register.childSpecialNeeds: [],
            },
            partner:{
                gender: this.props.register.partnerGender,
                email:  this.props.register.partnerEmail,
                name:  this.props.register.partnerName
            }
        };
        axios({
            method: 'post',
            url: 'https://sitters-server.herokuapp.com/parent/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: parent
        }).then(function (res) {
            if (res.data) {  // user created
                self.props.actions.actionCreators.setUserData(res.data);
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
    render() {
        return (
            <form id="register-form" onSubmit={this.handleSubmitParent}>
                <BaseForm {...this.props}/>
                <h3>Child</h3>
                <TextInput label="Child Name"
                           placeholder="Child Name"
                           action={this.props.actions.registerActions.changeChildName}
                           {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeChildAge}
                           {...this.props}
                           reducer={'register'}/>
                <h4>Child Difficulties</h4>
                <CheckBoxInput name="childExpertise"
                               types={strings.EXPERTISE}
                               action={this.props.actions.registerActions.changeChildExpertise}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Child Hobbies</h4>
                <CheckBoxInput name="childHobbies"
                               types={strings.HOBBIES}
                               action={this.props.actions.registerActions.changeChildHobbies}
                               {...this.props}
                               reducer={'register'}
                />
                <h4>Child Special needs</h4>
                <CheckBoxInput name="childSpecialNeeds"
                               types={strings.SPECIAL_NEEDS}
                               action={this.props.actions.registerActions.changeChildSpecialNeeds}
                               {...this.props}
                               reducer={'register'}
                />
                <TextInput label="Max price for babysitting hour (USD)"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                           {...this.props}
                           reducer={'register'}/>
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
                <h4>Partner Gender</h4>
                    <RadioInput types={strings.GENDER}
                            defaultValue={this.props.user.partnerGender ?  this.props.user.partnerGender[0].toUpperCase() + this.props.user.partnerGender.slice(1):"" }
                            action={this.props.actions.registerActions.changePartnerGender}
                            radioType={'partnerGender'} {...this.props}
                            reducer={'register'}/>
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;