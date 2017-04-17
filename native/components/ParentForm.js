"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import BaseForm from './BaseForm';
import TextButton from './TextButton';

const langArray = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];

export default class ParentForm extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    render () {
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text>Languages</Text>
                {this.checkBox(langArray)}
                <Text>Child</Text>
                <TextInput type="TextInput" name="maxPrice" placeholder="maxPrice" />
                <TextInput type="TextInput" name="childName" placeholder="childName" />
                <TextInput type="TextInput" name="childAge" placeholder="childAge" />
                <Text>Child Expertise</Text>
                {this.checkBox(expertiseArray)}
                <Text>Child Hobbies</Text>
                {this.checkBox(hobbiesArray)}
                <Text>Child Special needs</Text>
                {this.checkBox(needsArray)}
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

    navigate () {
        // TODO: add user to DB
        Actions.Feed();
    }
}