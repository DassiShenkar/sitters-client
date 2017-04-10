"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image } from 'react-native';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import BaseForm from './BaseForm';

const langArray = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];

var ParentForm = React.createClass({
    render: function () {
        return (
            <Form ref="parentForm">
                <BaseForm />
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
            </Form>
        );

    },
    checkBox: function (array) {
        return array.map(function(lang) {
           return  <CheckBox
               style={{flex: 1, padding: 10}}
               onClick={()=>{ alert(lang) } }
               isChecked={false}
               leftText={lang}
           />;
        });
    }
});

export default ParentForm;