"use strict";
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import Geocoder from '../utils/GeoCoder'
import axios from 'axios';
import {AgeFromDate} from 'age-calculator';
import { Actions } from 'react-native-router-flux'

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import AppBar from '../components/AppBar';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RegisterActions from '../../src/actions/RegisterActions';

class Register extends Component {

    constructor(props) {
        super(props);
        this.parentCallback = this.parentCallback.bind(this);
        this.sitterCallback = this.sitterCallback.bind(this);
        this.setUserInDB = this.setUserInDB.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
    }
    
    render () {
        let appbar = this.props.registered ? <AppBar { ...this.props }/> : null;
        return (
            <View>
                { appbar }
                <ScrollView>
                    <View style={{ margin: 20 }}>
                        {this.props.user.userType === "I'm a parent" ?
                            <ParentForm
                                {...this.props}
                                callback={ this.parentCallback } /> :
                            <SitterForm
                                {...this.props}
                                callback={ this.sitterCallback } />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    getGeoCode(callback){
        let city = this.props.register.city != null ? this.props.register.city != null : this.props.user.location.name.split(',')[0];
        callback(Geocoder.getLatLng(this.props.register.street + " " + this.props.register.houseNumber + ", " + city));
    }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }

    parentCallback () {
        let self = this;
        let parent = {address:{},languages: [], matchBI: {}};
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                parent.languages.push(language.name);
            else
                parent.languages.push(language.name.toLowerCase());
        });
        this.getGeoCode(function(data) {
            parent.address.longitude = data != null ? data.lng: 0;
            parent.address.latitude = data != null ? data.lat: 0;
        });
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
                specialNeeds: this.props.register.childSpecialNeeds? this.props.register.childSpecialNeeds: []
            },
            partner:{
                gender: this.props.register.partnerGender ? this.props.register.partnerGender : 'Female',
                email:  this.props.register.partnerEmail ? this.props.register.partnerEmail : ' ',
                name:  this.props.register.partnerName ? this.props.register.partnerName : ' '
            }
        };
        //TODO: add personality test scores
        console.log(parent);
        self.setUserInDB(parent, 'parent/create');
    }

    sitterCallback() {// get all the form params and create sitter
        let self = this;
        let sitter = {address: {},languages: []};
        let langs = this.props.register.languages == null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages == null)
                sitter.languages.push(language.name);
            else
                sitter.languages.push(language.value);
        });
        this.getGeoCode(function(data) {
            sitter.address.longitude = data != null ? data.lng: 0;
            sitter.address.latitude = data != null ? data.lat: 0;
        });
        sitter = {
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
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            experience:  Number(this.props.register.experience),
            minAge:  Number(this.props.register.sitterMinAge),
            maxAge:  Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            availableNow: this.props.register.sitterImmediateAvailability.toLowerCase() === 'true',
            expertise: this.props.register.sitterExpertise? this.props.register.sitterExpertise: [],
            hobbies: this.props.register.sitterHobbies? this.props.register.sitterHobbies: [],
            specialNeeds: this.props.register.sitterSpecialNeeds? this.props.register.sitterSpecialNeeds: [],
            education: this.props.register.sitterEducation? this.props.register.sitterEducation: [],
            mobility: this.props.register.sitterMobility.toLowerCase() === 'true'
        };
        //TODO: add personality test scores
        console.log(sitter);
        self.setUserInDB(sitter, 'sitter/create');
    }

    async setUserInDB(data, path) {
        const self = this;
        axios({
            method: 'post',
            url: 'https://sittersdev.herokuapp.com/' + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: data
        }).then(function (res) {
            if (res.data) {  // user created
                self.props.actions.actionCreators.setUserData(res.data);
                Actions.Feed();
            }
            else { // user not created
                console.log('user not created');
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
            }
        }).catch(function (error) {
            console.log(error);
            Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
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
