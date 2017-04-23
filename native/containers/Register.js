"use strict";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
// import geocoder from 'geocoder'
import axios from 'axios';
import {AgeFromDate} from 'age-calculator';
import { Actions } from 'react-native-router-flux'

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RegisterActions from '../../src/actions/RegisterActions';

class Register extends Component {

    constructor(props) {
        super(props);
        this.responseCallback = this.responseCallback.bind(this);
        this.setUserInDB = this.setUserInDB.bind(this);
        // this.getGeoCode = this.getGeoCode.bind(this);
    }
    
    render () {
        return (
            <ScrollView>
                {this.props.user.userType === "I'm a Parent" ?
                    <ParentForm
                        {...this.props}
                        callback={ this.responseCallback } /> :
                    <SitterForm
                        {...this.props}
                        callback={ this.responseCallback } />
                }
            </ScrollView>
        );
    }

    // getGeoCode(callback){
    //     let city = this.props.register.city != null ? this.props.register.city != null : this.props.user.location.name.split(',')[0];
    //     geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + city , function ( err, data ) {
    //         if(err)
    //             console.log(err); // TODO: when address is wrong, add callback
    //         else{
    //             callback(data);
    //         }
    //     });
    // }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }

    responseCallback () {
        let self = this;
        let parent = {address:{},languages: []};
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                parent.languages.push(language.name);
            else
                parent.languages.push(language.value);
        });
        // this.getGeoCode(function(data) {
        //     parent.address.longitude = data.results[0] != null? data.results[0].geometry.location.lng: 0;
        //     parent.address.latitude = data.results[0] != null? data.results[0].geometry.location.lat: 0;
        // });
        parent = {
            _id : this.props.user.facebookID.toString(),
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
            timezone: this.props.user.timezone.toString(),
            profilePicture: this.props.user.picture.data.url,
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: this.props.register.childExpertise? this.props.register.childExpertise: [],
                hobbies: this.props.register.childHobbies? this.props.register.childHobbies: [],
                specialNeeds: this.props.register.childSpecialNeeds? this.props.register.childSpecialNeeds: [],
            }//,
            // partner:{
            //     gender: this.props.register.partnerGender,
            //     email:  this.props.register.partnerEmail,
            //     name:  this.props.register.partnerName
            // }
        };
        self.setUserInDB(parent);
    }

    async setUserInDB(data) {
        const self = this;
        //alert(JSON.stringify(data));
        axios({
            method: 'post',
            url: 'https://sitters-server.herokuapp.com/parent/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: data
        }).then(function (res) {
            if (res.data) {  // user created
                self.props.actions.actionCreators.setUserData(res.data);
                Actions.Feed();
            }
            else { // user not created
                alert("user not created");
                //TODO: think about error when user not created
            }
        }).catch(function (error) {
            alert(JSON.stringify(error));
            //TODO: think about error when user not created
        });
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        register: state.register
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions : {
            actionCreators: bindActionCreators(actionCreators, dispatch),
            registerActions: bindActionCreators(RegisterActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
