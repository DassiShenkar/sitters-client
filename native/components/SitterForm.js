"use strict";
import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux'

import BaseForm from './BaseForm';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';

import AndroidTimePicker from './AndroidTimePicker'
import TextButton from './TextButton';

const langArray = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SitterForm extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    render () {
        return (
            <Form ref="sitterForm">
                <BaseForm 
                    { ...this.props }/>
                <TextInput type="TextInput" name="experience"  placeholder="Years of experience"/>
                <TextInput type="TextInput" name="MinimumAge"  placeholder="Minimum age to save children"/>
                <TextInput type="TextInput" name="hourFee"  placeholder="Hour Fee"/>
                <Text>Immediate availability?</Text>
                <Picker
                    selectedValue={"Yes"}
                    onValueChange={(pick) => {}}>
                    <Picker.Item label="Yes" value="yes" />
                    <Picker.Item label="No" value="no" />
                </Picker>
                <Text>Languages</Text>
                {this.checkBox(langArray)}
                <Text>Sitter Expertise</Text>
                {this.checkBox(expertiseArray)}
                <Text>Sitter Hobbies</Text>
                {this.checkBox(hobbiesArray)}
                <Text>Sitter Special needs</Text>
                {this.checkBox(needsArray)}
                {this.timePicker()}
                <TextButton
                    onPress={this.navigate}
                    text="Submit" />
            </Form>
        );
    }
    checkBox (array) {
        return array.map(function(lang) {
            return  <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{ alert(lang) } }
                isChecked={false}
                leftText={lang}
            />;
        });
    }
    timePicker () {
        return days.map(function (day) {
           return <View>
                    <Text>{day}</Text>
                    <AndroidTimePicker />
                </View>;
        });
    }
    
    navigate () {
        // TODO: add user to DB
        if(this.props.exists && this.props.exists === true){
            Actions.Feed();
        } else {
            Actions.PersonalityTestIntro();
        }
    }
}
