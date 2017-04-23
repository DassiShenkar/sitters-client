"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import BaseForm from './BaseForm';
import TextButton from './TextButton';
import strings from '../../src/static/strings';

const LANGUAGES = ["Hebrew", "English", "Russian", "Spanish", "French"];

export default class ParentForm extends React.Component {

    constructor(props) {
        super(props);
        this.languagesOnClick = this.languagesOnClick.bind(this);
        this.expertiseOnClick = this.expertiseOnClick.bind(this);
        this.hobbiesOnClick = this.hobbiesOnClick.bind(this);
        this.specialOnClick = this.specialOnClick.bind(this);
        this.languagesCheckBox = this.languagesCheckBox.bind(this);
        this.expertiseCheckBox = this.expertiseCheckBox.bind(this);
        this.hobbiesCheckBox = this.hobbiesCheckBox.bind(this);
        this.specialCheckBox = this.specialCheckBox.bind(this);
    }

    render () {
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text>Languages</Text>
                {this.languagesCheckBox()}
                <Text>Max price</Text>
                <TextInput
                    type="TextInput"
                    name="maxPrice"
                    value={ this.props.user.watchMaxPrice ? this.props.user.watchMaxPrice : ' '}
                    onFocus={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <Text>Child name</Text>
                <TextInput
                    type="TextInput"
                    name="childName"
                    value={ this.props.user.childName ? this.props.user.childName : ' '}
                    onFocus={(text) => this.props.actions.registerActions.changeChildName(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
                <Text>Child age</Text>
                <TextInput
                    type="TextInput"
                    name="childAge"
                    value={ this.props.user.childAge ? this.props.user.childAge : ' ' }
                    onFocus={(text) => this.props.actions.registerActions.changeChildAge(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
                <Text>Child Expertise</Text>
                {this.expertiseCheckBox()}
                <Text>Child Hobbies</Text>
                {this.hobbiesCheckBox()}
                <Text>Child Special needs</Text>
                {this.specialCheckBox()}
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
                key={ data }
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
                key={ data }
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.expertiseOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    expertiseOnClick (data) {
        var newState;
        if(this.props.user.childExpertise && this.props.user.childExpertise.indexOf(data)){
            newState = [...this.props.user.childExpertise.slice(data, 1)];
        } else if(this.props.user.childExpertise) {
            newState = [...this.props.user.childExpertise, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeChildExpertise(newState);
    }

    hobbiesCheckBox () {
        const self = this;
        return strings.HOBBIES.map(function(data) {
            return  <CheckBox
                key={ data }
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.hobbiesOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    hobbiesOnClick (data) {
        var newState;
        if(this.props.user.childHobbies && this.props.user.childHobbies.indexOf(data)){
            newState = [...this.props.user.childHobbies.slice(data, 1)];
        } else if(this.props.user.childHobbies) {
            newState = [...this.props.user.childHobbies, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeChildHobbies(newState);
    }

    specialCheckBox () {
        const self = this;
        return strings.SPECIAL_NEEDS.map(function(data) {
            return  <CheckBox
                key={ data }
                style={{flex: 1, padding: 10}}
                onClick={ ()=>self.specialOnClick(data) }
                isChecked={false}
                leftText={data}
            />;
        });
    }

    specialOnClick (data) {
        var newState;
        if(this.props.user.childSpecialNeeds && this.props.user.childSpecialNeeds.indexOf(data)){
            newState = [...this.props.user.childSpecialNeeds.slice(data, 1)];
        } else if (this.props.user.childSpecialNeeds) {
            newState = [...this.props.user.childSpecialNeeds, data];
        } else {
            newState = [data];
        }
        this.props.actions.registerActions.changeChildSpecialNeeds(newState);
    }

}