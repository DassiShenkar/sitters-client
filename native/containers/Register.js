import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import axios from 'axios';
import {AgeFromDate} from 'age-calculator';
import { Actions } from 'react-native-router-flux'

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RegisterActions from '../../src/actions/RegisterActions';
import * as WorkingHoursActions from '../../src/actions/WorkingHoursActions';
import * as LocationActions from '../actions/LocationActions';
import * as _ from "lodash";

class Register extends Component {

    constructor(props) {
        super(props);
        this.parentCallback = this.parentCallback.bind(this);
        this.sitterCallback = this.sitterCallback.bind(this);
        this.setUserInDB = this.setUserInDB.bind(this);
    }
    
    render () {
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        {
                            this.props.user.userType === "I'm a parent" ?
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
    
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }

    parentCallback () {
        let self = this;
        let langs = this.props.register.languages ? this.props.register.languages  : this.props.user.languages;
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
        let parent = {
            _id : this.props.user.facebookID.toString(),
            name: this.props.register.name != null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email != null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age != null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),

            gender: this.props.register.gender != null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto?this.props.user.coverPhoto.source: "",
            timezone: this.props.user.timezone? this.props.user.timezone: "",
            profilePicture: this.props.user.picture? this.props.user.picture.data.url: "",
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: this.props.register.childExpertise? this.props.register.childExpertise: [],
                hobbies: this.props.register.childHobbies? this.props.register.childHobbies: [],
                specialNeeds: this.props.register.childSpecialNeeds? this.props.register.childSpecialNeeds: []
            },
            userType: "I'm a parent",
            notifications: [],
            invites: [],
            blacklist: [],
            personalityTest: {
                questions: this.props.register.personalityQuestions,
                totalScore: totalScore
            },
            matchBI: {
                matchScores: [],
                median: 0
            },
            settings: {
                allowNotification: true,
                allowSuggestions: true
            },
            mutualFriends: this.props.user.friends,
            preferedGender: this.props.register.watchChildGender.toLowerCase(),
            partner:{
                gender: this.props.register.partnerGender ? this.props.register.partnerGender : 'Female',
                email:  this.props.register.partnerEmail ? this.props.register.partnerEmail : ' ',
                name:  this.props.register.partnerName ? this.props.register.partnerName : ' '
            }
        };
        self.setUserInDB(parent, 'parent/create');
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
            age: this.props.register.age ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            gender: this.props.register.gender ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto.source,
            languages: setLangs,
            address: {},
            timezone: this.props.user.timezone,
            profilePicture: this.props.user.picture.data.url,
            experience:  Number(this.props.register.experience),
            minAge:  Number(this.props.register.sitterMinAge),
            maxAge:  Number(this.props.register.sitterMaxAge),
            hourFee: Number(this.props.register.hourFee),
            matchBI: {},
            personality: {},
            userType: "I'm a sitter",
            personalityTest: {
                questions: this.props.register.personalityQuestions,
                totalScore: totalScore
            },
            reviews: [],
            invites: [],
            lastInvite: "",
            availableNow: this.props.register.sitterImmediateAvailability ? this.props.register.sitterImmediateAvailability.toLowerCase() === 'true' : true,
            expertise: this.props.register.sitterExpertise? this.props.register.sitterExpertise: [],
            hobbies: this.props.register.sitterHobbies? this.props.register.sitterHobbies: [],
            specialNeeds: this.props.register.sitterSpecialNeeds? this.props.register.sitterSpecialNeeds: [],
            education: this.props.register.sitterEducation? this.props.register.sitterEducation: [],
            mobility: this.props.register.sitterMobility ? this.props.register.sitterMobility.toLowerCase() === 'true' : true,
            mutualFriends: this.props.user.friends
        };
        self.setUserInDB(sitter, 'sitter/create');
    }

    async setUserInDB(user, path) {
        const self = this;
        console.log(self.props.user.address);
        let add = self.props.user.address.split(',');
        const street = add[0].split(' ');
        let houseNumber = street.pop();
        if (Number.isNaN(houseNumber)) {
            street.push(houseNumber);
            houseNumber = 0;
        }
        user.address = {
            city: self.props.user.address.split(',')[1],
            street: _.join(street, " "),
            houseNumber: Number(houseNumber),
            longitude: this.props.location.location.lng ? this.props.location.location.lng : 0,
            latitude: this.props.location.location.lat ? this.props.location.location.lat : 0
        };
        user.isParent = path === 'parent/create';
        console.log(this.props.location);
        console.log(user);
        axios({
            method: 'post',
            url: 'https://sittersdev.herokuapp.com/' + path,
            // url: 'https://sitters-server.herokuapp.com/' + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
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

const styles = StyleSheet.create({
    container: {
        margin: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
