import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import Geocoder from '../utils/GeoCoder'
import axios from 'axios';
import {AgeFromDate} from 'age-calculator';
import { Actions } from 'react-native-router-flux'

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as _ from "lodash";

class Register extends Component {

    constructor(props) {
        super(props);
        this.parentCallback = this.parentCallback.bind(this);
        this.sitterCallback = this.sitterCallback.bind(this);
        this.setUserInDB = this.setUserInDB.bind(this);
        this.getGeoCode = this.getGeoCode.bind(this);
    }
    
    render () {
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        {
                            this.props.user.userType === "I'm a Parent" ?
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
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function (question) {
            totalScore += question.value;
        });
        parent = {
            _id : this.props.user.facebookID.toString(),
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
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
            personalityTest: {
                questions: this.props.register.personalityQuestions,
                totalScore: totalScore
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
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function (question) {
            totalScore += question.value;
        });
        sitter = {
            _id : this.props.user.facebookID.toString(),
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            // address: {
            //     city: this.props.register.city != null? this.props.register.city : this.props.user.location.name.split(',')[0],
            //     street: this.props.register.street,
            //     houseNumber: Number(this.props.register.houseNumber),
            // },
            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            experience:  Number(this.props.register.experience),
            minAge:  Number(this.props.register.sitterMinAge),
            maxAge:  Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            personalityTest: {
                questions: this.props.register.personalityQuestions,
                totalScore: totalScore
            },
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
        let add = self.props.register.address.split(',');
        const street = add[0].split(' ');
        let houseNumber = street.pop();
        if (Number.isNaN(houseNumber)) {
            street.push(houseNumber);
            houseNumber = 0;
        }
        data.address = {
            city: self.props.register.address.split(',')[1],
            street: _.join(street, " "),
            houseNumber: Number(houseNumber),
        };
        data.isParent = path === 'parent/create';
        this.getGeoCode(function (data) {
            data.address.longitude = data != null ? data.lng : 0;
            data.address.latitude = data != null ? data.lat : 0;
        });
        console.log(data);
        Actions.Feed();
        // axios({
        //     method: 'post',
        //     url: 'https://sittersdev.herokuapp.com/' + path,
        //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        //     data: parent
        // }).then(function (res) {
        //     if (res.data) {  // user created
        //         self.props.actions.actionCreators.setUserData(res.data);
        //         Actions.Feed();
        //     }
        //     else { // user not created
        //         console.log('user not created');
        //         Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
        //     }
        // }).catch(function (error) {
        //         console.log(error);
        //         Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
        //     });
        // }
        // axios({
        //     method: 'post',
        //     // url: 'https://sitters-server.herokuapp.com/' + path,
        //     url: 'https://sittersdev.herokuapp.com/' + path,
        //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        //     data: data
        // }).then(function (res) {
        //     if (res.data) {  // user created
        //         self.props.actions.actionCreators.setUserData(res.data);
        //         Actions.Feed();
        //     }
        //     else { // user not created
        //         console.log('user not created');
        //         Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        //     Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
        // });
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    }
});

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
