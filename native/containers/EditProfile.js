"use strict";
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import AppBar from '../components/AppBar';
import TextButton from '../components/TextButton';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as WorkingHoursActions from '../../src/actions/WorkingHoursActions';
import * as LocationActions from '../actions/LocationActions';
import axios from 'axios';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.parentCallback = this.parentCallback.bind(this);
        this.sitterCallback = this.sitterCallback.bind(this);
        this.setUserInDB = this.setUserInDB.bind(this);
    }

    render () {
        console.log(this.props.user);
        let register = {
            address: this.props.user.address ? this.props.user.address : null,
            gender: this.props.user.gender ? this.props.user.gender : null,
            age: this.props.user.age ? this.props.user.age : 0,
            languages: this.props.user.languages ? this.props.user.languages : null,
            items: this.props.user.personality ? this.props.user.personality : null,
            watchChildGender: this.props.user.preferedGender ? this.props.user.preferedGender : "Both",
            watchMaxPrice: this.props.user.maxPrice ? this.props.user.maxPrice.toString() : null,
            childName: this.props.user.children ? this.props.user.children.name : null,
            childAge: this.props.user.children ? this.props.user.children.age.toString() : null,
            childExpertise: this.props.user.children ? this.props.user.children.expertise : null,
            childHobbies: this.props.user.children ? this.props.user.children.hobbies : null,
            childSpecialNeeds: this.props.user.children ? this.props.user.children.specialNeeds : null,
            partnerName: this.props.user.partner ? this.props.user.partner.name : null,
            partnerEmail: this.props.user.partner ? this.props.user.partner.email : null,
            partnerGender: this.props.user.partner ? this.props.user.partner.gender : null,
            sitterMotto: this.props.user.motto ? this.props.user.motto : null,
            sitterExperience: this.props.user.experience ? this.props.user.experience.toString() : null,
            sitterMinAge: this.props.user.minAge ? this.props.user.minAge.toString() : null,
            sitterMaxAge: this.props.user.maxAge ? this.props.user.maxAge.toString() : null,
            hourFee: this.props.user.hourFee ? this.props.user.hourFee.toString() : null,
            sitterImmediateAvailability: this.props.user.availableNow ? this.props.user.availableNow : null,
            sitterMobility: this.props.user.mobility ? this.props.user.mobility : null,
            sitterEducation: this.props.user.education ? this.props.user.education : null,
            sitterExpertise: this.props.user.expertise ? this.props.user.expertise : null,
            sitterHobbies: this.props.user.hobbies ? this.props.user.hobbies : null,
            sitterSpecialNeeds: this.props.user.specialNeeds ? this.props.user.specialNeeds : null
        };
        let workingHours = this.props.user.workingHours ? this.props.user.workingHours : null;
        return (
            <View>
                <AppBar
                    {...this.props} />
                <View style={{height: "88.5%"}}>
                    <ScrollView>
                        <View style={styles.container}>
                            {
                                this.props.user.userType === "I'm a Parent" ?
                                    <ParentForm
                                        {...this.props}
                                        register={register}
                                        workingHours={workingHours} /> :
                                    <SitterForm
                                        {...this.props}
                                        register={register}
                                        workingHours={workingHours} />
                            }
                        </View>
                        <TextButton
                            styles={styles.button}
                            onPress={ this.props.user.userType === "I'm a Parent" ? () => {this.parentCallback()} : () => {this.sitterCallback()}}
                            text="Update" />
                    </ScrollView>
                </View>
            </View>
        );
    }

    parentCallback () {
        let self = this;
        let langs = this.props.register.languages ? this.props.register.languages  : this.props.user.languages;
        let setLangs = [];
        langs.forEach (function(language){
            if(self.props.register.languages)
                setLangs.push(language);
            else
                setLangs.push(language);
        });
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function(question){
            totalScore += question.value;
        });
        let parent = {
            _id : this.props.user._id.toString(),
            name: this.props.register.name ? this.props.register.name : this.props.user.name,
            email: this.props.register.email ? this.props.register.email : this.props.user.email,
            age: this.props.register.age ? this.props.register.age: 0,
            languages: setLangs,
            gender: this.props.register.gender ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto ? this.props.user.coverPhoto.source: "",
            timezone: this.props.user.timezone ? this.props.user.timezone: "",
            profilePicture: this.props.user.picture ? this.props.user.picture.data.url: "",
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: this.props.register.childExpertise? this.props.register.childExpertise: [],
                hobbies: this.props.register.childHobbies? this.props.register.childHobbies: [],
                specialNeeds: this.props.register.childSpecialNeeds? this.props.register.childSpecialNeeds: []
            },
            userType: "I'm a Parent",
            notifications: [],
            multipleInvites: [],
            invites: [],
            blacklist: [],
            pushNotifications: {},
            personality: this.props.register.personality ? this.props.register.personality : [],
            settings: {
                allowNotification: true,
                allowSuggestions: true,
                allowShowOnSearch: true
            },
            friends: this.props.user.friends,
            // preferedGender: this.props.register.watchChildGender.toLowerCase(),
            partner:{
                gender: this.props.register.partnerGender ? this.props.register.partnerGender : 'Female',
                email:  this.props.register.partnerEmail ? this.props.register.partnerEmail : ' ',
                name:  this.props.register.partnerName ? this.props.register.partnerName : ' '
            },
            isParent: true
        };
        self.setUserInDB(parent, 'parent/update');
    }

    sitterCallback() {// get all the form params and create sitter
        let self = this;
        let langs = this.props.register.languages ? this.props.register.languages : this.props.user.languages;
        let setLangs = [];
        langs.forEach (function(language){
            if(self.props.register.languages)
                setLangs.push(language.name);
            else
                setLangs.push(language.name.toLowerCase());
        });
        let totalScore = 0;
        this.props.register.personalityQuestions.forEach(function(question){
            totalScore += question.value;
        });
        let sitter = {
            _id : this.props.user.facebookID.toString(),
            name: this.props.register.name ? this.props.register.name : this.props.user.name,
            email: this.props.register.email ? this.props.register.email : this.props.user.email,
            age: this.props.register.age ? this.props.register.age : 0,
            gender: this.props.register.gender ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            languages: setLangs,
            address: {},
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            experience:  Number(this.props.register.sitterExperience),
            minAge:  Number(this.props.register.sitterMinAge),
            maxAge:  Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            personality: this.props.register.personality ? this.props.register.personality : [],
            userType: "I'm a Sitter",
            reviews: [],
            invites: [],
            pushNotifications: {},
            multipleInvites: [],
            lastInvite: "",
            availableNow: this.props.register.sitterImmediateAvailability ? this.props.register.sitterImmediateAvailability.toLowerCase() === 'true' : true,
            expertise: this.props.register.sitterExpertise? this.props.register.sitterExpertise: [],
            hobbies: this.props.register.sitterHobbies? this.props.register.sitterHobbies: [],
            specialNeeds: this.props.register.sitterSpecialNeeds? this.props.register.sitterSpecialNeeds: [],
            education: this.props.register.sitterEducation? this.props.register.sitterEducation: [],
            mobility: this.props.register.sitterMobility ? this.props.register.sitterMobility : '',
            friends: this.props.user.friends,
            workingHours: this.props.workingHours,
            motto: this.props.register.sitterMotto,
            isParent: false,
            settings: {
                allowNotification: true,
                allowSuggestions: true,
                allowShowOnSearch: true
            }
        };
        self.setUserInDB(sitter, 'sitter/update');
    }

    async setUserInDB(user, path) {
        const self = this;
        // let add = self.props.register.address.split(',');
        // const street = add[0].split(' ');
        // let houseNumber = street.pop();
        // if (Number.isNaN(houseNumber)) {
        //     street.push(houseNumber);
        //     houseNumber = 0;
        // }
        // user.address = {
        //     city: self.props.register.address.split(',')[1],
        //     street: _.join(street, " "),
        //     houseNumber: Number(houseNumber),
        //     longitude: this.props.location.location.lng ? this.props.location.location.lng : 0,
        //     latitude: this.props.location.location.lat ? this.props.location.location.lat : 0
        // };
        user.address = {
            city: self.props.user.address.city,
            street: self.props.user.address.street,
            houseNumber: self.props.user.address.houseNumber,
            longitude: self.props.user.address.longitude,
            latitude: self.props.user.address.latitude
        };
        user.isParent = path === 'parent/update';
        console.log(user);
        axios({
            method: 'post',
            url: 'http://192.168.1.70:4444/' + path,
            // url: 'https://sitters-server.herokuapp.com/' + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
        }).then(function (res) {
            if (res.data) {  // user created
                path === 'parent/update' ? self.props.actions.actionCreators.setParentData(res.data) : self.props.actions.actionCreators.setSitterData(res.data);
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

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        fontSize: 16,
        width: 70,
        alignSelf : 'flex-end',
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        marginRight: 15
    }
});


function mapStateToProps(state) {
    return {
        user: state.user,
        register: state.register,
        workingHours: state.workingHours,
        location: state.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions : {
            actionCreators: bindActionCreators(actionCreators, dispatch),
            registerActions: bindActionCreators(RegisterActions, dispatch),
            workingHoursActions: bindActionCreators(WorkingHoursActions,dispatch),
            locationActions: bindActionCreators(LocationActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
