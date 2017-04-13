"use strict";
import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import BaseForm from './BaseForm';
import RadioButtons from './RadioButton';
import Form from 'react-native-form';
import PersonalityTest from './PersonalityTest';
import CheckBox from 'react-native-check-box';
import AndroidTimePicker from './AndroidTimePicker'

const langArray = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SitterForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Form ref="sitterForm">
                <BaseForm />
                <TextInput type="TextInput" name="experience"  placeholder="Years of experience"/>
                <TextInput type="TextInput" name="MinimumAge"  placeholder="Minimum age to save children"/>
                <TextInput type="TextInput" name="hourFee"  placeholder="Hour Fee"/>
                <Text>Immediate availability?</Text>
                <RadioButtons
                    values={[
                    {label: 'Yes', value: 0 },
                    {label: 'No', value: 1 }
                    ]} />
                <Text>Languages</Text>
                {this.checkBox(langArray)}
                <Text>Sitter Expertise</Text>
                {this.checkBox(expertiseArray)}
                <Text>Sitter Hobbies</Text>
                {this.checkBox(hobbiesArray)}
                <Text>Sitter Special needs</Text>
                {this.checkBox(needsArray)}
                <PersonalityTest />
                {this.timePicker()}
                <TouchableOpacity onPress={this.navigate.bind(this)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
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
        var id = 'Feed';
        // TODO: add user to DB
        var navObj = {
            id: id,
            passProps: {
                userType: 'Parent'
            },
            type: 'NORMAL'
        };
        alert(id);
        this.props.navigator.push(navObj);
    }
}
