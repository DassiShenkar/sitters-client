"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View, Picker  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
import { CheckboxGroup } from 'react-native-material-design';
import BaseForm from './BaseForm';
import TextButton from './TextButton';
import strings from '../../src/static/strings';

export default class ParentForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const callback = this.props.callback;
        const self = this;
        let expertise = function() {
            let array = [];
            strings.EXPERTISE.map(function (expertise) {
                array.push({value: expertise.toLowerCase(), label: expertise})
            });
            return array;
        };
        let hobbies = function() {
            let array = [];
            strings.HOBBIES.map(function (hobby) {
                array.push({value: hobby.toLowerCase(), label: hobby})
            });
            return array;
        };
        let needs = function() {
            let array = [];
            strings.SPECIAL_NEEDS.map(function (need) {
                array.push({value: need.toLowerCase(), label: need})
            });
            return array;
        };
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text>Max price</Text>
                <TextInput
                    type="TextInput"
                    name="maxPrice"
                    value={ this.props.user.watchMaxPrice ? this.props.user.watchMaxPrice : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <Text>Child name</Text>
                <TextInput
                    type="TextInput"
                    name="childName"
                    value={ this.props.user.childName ? this.props.user.childName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
                <Text>Child age</Text>
                <TextInput
                    type="TextInput"
                    name="childAge"
                    value={ this.props.user.childAge ? this.props.user.childAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
                <Text>Child Expertise</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildExpertise(values) }
                    checked={ [] }
                    items={ expertise() } />
                <Text>Child Hobbies</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildHobbies(values) }
                    checked={ [] }
                    items={ hobbies() } />
                <Text>Child Special needs</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildSpecialNeeds(values) }
                    checked={ [] }
                    items={ needs() } />
                <Text>Partner name</Text>
                <TextInput
                    type="TextInput"
                    name="maxPrice"
                    value={ this.props.user.partnerName ? this.props.user.partnerName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerName(text)} />
                <Text>Partner email</Text>
                <TextInput
                    type="TextInput"
                    name="childName"
                    value={ this.props.user.parterEmail ? this.props.user.parterEmail : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerEmail(text)} />
                <Text>Partner gender</Text>
                <Picker
                    selectedValue={ this.props.user.partnerGender ?  this.props.user.partnerGender[0].toUpperCase() + this.props.user.partnerGender.slice(1) : 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changePartnerGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] } />
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] } />
                </Picker>
                <TextButton
                    onPress={ function() {
                        if(self.props.registered) {
                             callback();
                        } else {
                             Actions.PersonalityTestIntro({callback: callback})
                        }
                    }}
                    text="Submit" />
            </Form>
        );

    }
}