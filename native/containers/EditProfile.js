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

        let parent = this.props.user;
        parent.name = this.props.register.name ? this.props.register.name : this.props.user.name;
        parent.email = this.props.register.email ? this.props.register.email : this.props.user.email;
        parent.age = this.props.register.age ? this.props.register.age : 0;
        parent.languages = setLangs;
        parent.gender = this.props.register.gender ? this.props.register.gender.toLowerCase() : this.props.user.gender;
        parent.maxPrice = this.props.register.name ? this.props.register.name : this.props.user.name;
        parent.name = Number(this.props.register.watchMaxPrice);
        parent.children.name = this.props.register.childName ? this.props.register.childName : '';
        parent.children.age = Number(this.props.register.watchMaxPrice);
        parent.children.expertise = this.props.register.childExpertise ? this.props.register.childExpertise : [];
        parent.children.hobbies = this.props.register.childHobbies ? this.props.register.childHobbies : [];
        parent.children.specialNeeds = this.props.register.specialNeeds ? this.props.register.specialNeeds : [];
        parent.partner.gender = this.props.register.partnerGender ? this.props.register.partnerGender : '';
        parent.partner.email = this.props.register.partnerEmail ? this.props.register.partnerEmail : '';
        parent.partner.name = this.props.register.partnerName ? this.props.register.partnerName : '';
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
        let sitter = this.props.user;
        sitter.name = this.props.register.name ? this.props.register.name : this.props.user.name;
        sitter.email = this.props.register.email ? this.props.register.email : this.props.user.email;
        sitter.age = this.props.register.age ? this.props.register.age : 0;
        sitter.gender = this.props.register.gender ? this.props.register.gender.toLowerCase() : this.props.user.gender;
        sitter.languages = setLangs;
        sitter.experience = Number(this.props.register.sitterExperience);
        sitter.minAge = Number(this.props.register.minAge);
        sitter.maxAge = Number(this.props.register.maxAge);
        sitter.hourFee = Number(this.props.register.hourFee);
        sitter.availableNow = this.props.register.sitterImmediateAvailability ? this.props.register.sitterImmediateAvailability.toLowerCase() === 'true' : true;
        sitter.expertise = this.props.register.sitterExpertise ? this.props.register.sitterExpertise: [];
        sitter.hobbies = this.props.register.hobbies ? this.props.register.hobbies: [];
        sitter.specialNeeds = this.props.register.specialNeeds ? this.props.register.specialNeeds: [];
        sitter.education = this.props.register.education ? this.props.register.education: [];
        sitter.mobility = this.props.register.mobility ? this.props.register.mobility: [];
        sitter.workingHours = this.props.workingHours;
        sitter.motto = this.props.register.sitterMotto ? this.props.register.sitterMotto : '';
        self.setUserInDB(sitter, 'sitter/update');
    }

    async setUserInDB(user, path) {
        const self = this;
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
            url: 'http://10.0.0.1:4444/' + path,
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
        backgroundColor: '#f86966',
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
