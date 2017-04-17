"use strict";
import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux'

import BaseForm from './BaseForm';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';

import AndroidTimePicker from './AndroidTimePicker'
import TextButton from './TextButton';
import strings from '../../src/static/strings';

const LANGUAGES = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SitterForm extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.languagesOnClick = this.languagesOnClick.bind(this);
        this.expertiseOnClick = this.expertiseOnClick.bind(this);
        this.hobbiesOnClick = this.hobbiesOnClick.bind(this);
        this.specialOnClick = this.specialOnClick.bind(this);
        this.languagesCheckBox = this.languagesCheckBox.bind(this);
        this.expertiseCheckBox = this.expertiseCheckBox.bind(this);
        this.hobbiesCheckBox = this.hobbiesCheckBox.bind(this);
        this.specialCheckBox = this.specialCheckBox.bind(this);
        this.timePickerCallback = this.timePickerCallback.bind(this);
    }

    render () {
        return (
            <Form ref="sitterForm">
                <BaseForm 
                    { ...this.props }/>
                <Text>Experience</Text>
                <TextInput
                    type="TextInput"
                    name="experience"
                    value={ this.props.user.sitterExperience ? this.props.user.sitterExperience : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeSitterExperience(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterExperience(text)} />
                <Text>Minimum age of child</Text>
                <TextInput
                    type="TextInput"
                    name="MinimumAge"
                    value={ this.props.user.sitterMinAge ? this.props.user.sitterMinAge : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeSitterMinimumAge(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMinimumAge(text)} />
                <Text>Maximum age of child</Text>
                <TextInput
                    type="TextInput"
                    name="MinimumAge"
                    value={ this.props.user.sitterMaxAge ? this.props.user.sitterMaxAge : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeSitterMaximumAge(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMaximumAge(text)} />
                <Text>Hour Fee</Text>
                <TextInput
                    type="TextInput"
                    name="hourFee"
                    value={ this.props.user.hourFee ? this.props.user.hourFee : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeSitterHourFee(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterHourFee(text)} />
                <Text>Are you available on call?</Text>
                <Picker
                    selectedValue={ this.props.user.sitterImmediateAvailability }
                    onValueChange={ (availability) => { this.props.actions.registerActions.changeSitterImmediateAvailability(availability) }}>
                    <Picker.Item label={ strings.BOOLEAN[0] } value={ strings.BOOLEAN[0] } />
                    <Picker.Item label={ strings.BOOLEAN[1] } value={ strings.BOOLEAN[1] } />
                </Picker>
                <Text>Languages</Text>
                {this.languagesCheckBox()}
                <Text>Sitter Expertise</Text>
                {this.expertiseCheckBox()}
                <Text>Sitter hobbies</Text>
                {this.hobbiesCheckBox()}
                <Text>Sitter Special needs</Text>
                {this.specialCheckBox()}
                <Text>Availble on:</Text>
                {this.timePicker()}
                <TextButton
                    onPress={ this.props.callback }
                    text="Submit" />
            </Form>
        );
    }
    languagesCheckBox () {
        const self = this;
        return LANGUAGES.map(function(data) {
            return  <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.languagesOnClick(data)}
                isChecked={false}
                leftText={data}
            />;
        });
    }

    languagesOnClick (data) {
        var newState;
        if(this.props.user.language && this.props.user.language.indexOf(data)){
            newState = [...this.props.user.languages.slice(data, 1)];
        } else if(this.props.user.language) {
            newState = [...this.props.user.languages, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeLanguages(newState);
    }

    expertiseCheckBox () {
        const self = this;
        return strings.EXPERTISE.map(function(data) {
            return  <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.expertiseOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    expertiseOnClick (data) {
        var newState;
        if(this.props.user.sitterExpertise && this.props.user.sitterExpertise.indexOf(data)){
            newState = [...this.props.user.sitterExpertise.slice(data, 1)];
        } else if(this.props.user.sitterExpertise) {
            newState = [...this.props.user.sitterExpertise, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeSitterExpertise(newState);
    }

    hobbiesCheckBox () {
        const self = this;
        return strings.HOBBIES.map(function(data) {
            return  <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.hobbiesOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    hobbiesOnClick (data) {
        var newState;
        if(this.props.user.sitterHobbies && this.props.user.sitterHobbies.indexOf(data)){
            newState = [...this.props.user.sitterHobbies.slice(data, 1)];
        } else if(this.props.user.sitterHobbies) {
            newState = [...this.props.user.sitterHobbies, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeSitterHobbies(newState);
    }

    specialCheckBox () {
        const self = this;
        return strings.SPECIAL_NEEDS.map(function(data) {
            return  <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.specialOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    specialOnClick (data) {
        var newState;
        if(this.props.user.sitterSpecialNeeds && this.props.user.sitterSpecialNeeds.indexOf(data)){
            newState = [...this.props.user.sitterSpecialNeeds.slice(data, 1)];
        } else if (this.props.user.sitterSpecialNeeds) {
            newState = [...this.props.user.sitterSpecialNeeds, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeSitterSpecialNeeds(newState);
    }

    timePicker () {
        const self = this;
        return days.map(function (day) {
           return <View>
                    <Text>{day}</Text>
                    <AndroidTimePicker
                        callback={ self.timePickerCallback }
                        day={ day }/>
                </View>;
        });
    }

    timePickerCallback (day, time) {
        // var newState = {
        //     ...this.props.user,
        //     day: time
        // };
        // this.props.actions.registerActions.changeSitterSpecialNeeds(newState);
    }
}
