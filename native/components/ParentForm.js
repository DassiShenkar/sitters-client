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
    }

    render () {
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text>Languages</Text>
                {this.checkBox(langArray)}
                <Text>Max price</Text>
                <TextInput
                    type="TextInput"
                    name="maxPrice"
                    value={ this.props.user.watchMaxPrice ? this.props.user.watchMaxPrice : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <Text>Child name</Text>
                <TextInput
                    type="TextInput"
                    name="childName"
                    value={ this.props.user.childName ? this.props.user.childName : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeChildName(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
                <Text>Child age</Text>
                <TextInput
                    type="TextInput"
                    name="childAge"
                    value={ this.props.user.childAge ? this.props.user.childAge : 0 }
                    onFocus={(text) => this.props.actions.registerActions.changeChildAge(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
                <Text>Child Expertise</Text>
                {this.checkBox(expertiseArray)}
                <Text>Child Hobbies</Text>
                {this.checkBox(hobbiesArray)}
                <Text>Child Special needs</Text>
                {this.checkBox(needsArray)}
                <TextButton
                    onPress={ this.props.callback }
                    text="Submit" />
            </Form>
        );

    }
    checkBox (array) {
        return array.map(function(lang) {
           return  <CheckBox
               style={{flex: 1, padding: 10}}
               onClick={()=>{ } }
               isChecked={false}
               leftText={lang}
           />;
        });
    }
}