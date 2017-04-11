import React from 'react';
import TextInput from './controllers/TextInput';
import CheckBoxInput from './controllers/CheckBoxInput';
import BaseForm from './BaseForm';
import geocoder from'geocoder'
import axios from 'axios';
// var {AgeFromDate} = require('age-calculator');
//
// var age;
import strings from '../static/strings';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
        // if (usr.birthday) { // calculate age from birthday
        //     let date = usr.birthday.split("/"); TODO: get birthday from facebook and put in redux and age component
        //     age = (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
        // }
        //     defaultTimeValue: '10:00'
        // };
    };
    getGeoCode(callback){
        geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + this.props.register.city , function ( err, data ) {
            if(err)
                console.log(err); // TODO: when address is wrong, add callback
            else{
                callback(data);
            }
        });
    }
    handleSubmitParent(e) {
        e.preventDefault();
        let parent = {address:{},languages: []};
        this.props.register.languages.forEach (function(language){
            parent.languages.push(language.value);
        });
        this.getGeoCode(function(data) {
            parent.address.longitude = data.results[0].geometry.location.lng;
            parent.address.latitude = data.results[0].geometry.location.lat;
        });
        parent = {
            name: this.props.register.name,
            email: this.props.register.email,
            age: parseInt(this.props.register.age,10),
            address: {
                city: this.props.register.city,
                street: this.props.register.street,
                houseNumber: parseInt(this.props.register.houseNumber,10),
            },
            gender: this.props.register.gender.toLowerCase(),
            coverPhoto: this.props.user.facebookData.cover.source,
            timezone: this.props.user.facebookData.timezone,
            profilePicture: this.props.user.facebookData.picture.data.url,
            maxPrice: parseInt(this.props.register.watchMaxPrice,10),
            children: {
                name: this.props.register.childName,
                age: parseInt(this.props.register.childAge,10),
                expertise: this.props.register.childExpertise,
                hobbies: this.props.register.childHobbies,
                specialNeeds: this.props.register.childSpecialNeeds,
            }
        };
        axios({
            method: 'post',
            url: 'http://localhost:4000/parent/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: parent
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // user created
                localStorage.setItem("isAuth", "true");
                self.props.router.push('/feed');
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
                <input type="submit" className="submit-invite" value="Sign Up"/>
            </form>
        );
    };
}

export default Form;