"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, TouchableWithoutFeedback, View  } from 'react-native';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import BaseForm from './BaseForm';

const langArray = ["Hebrew", "English", "Russian", "Spanish", "French"];
const expertiseArray = ['Math', 'English', 'Physics'];
const hobbiesArray = ['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV'];
const needsArray = ['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays'];

export default class ParentForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { navigate } = this.props.navigation;
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
                <View>
                    <TouchableWithoutFeedback onPress={this._onPress}>
                        <Text>Submit</Text>
                    </TouchableWithoutFeedback>
                </View>
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
    _onPress () {
        navigate('Feed');
    }
}