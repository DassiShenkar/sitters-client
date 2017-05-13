"use strict";
import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

import BaseForm from './BaseForm';
import Form from 'react-native-form';
import { CheckboxGroup } from 'react-native-material-design';

import AndroidTimePicker from './AndroidTimePicker'
import TextButton from './TextButton';
import strings from '../../src/static/strings';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SitterForm extends React.Component {

    constructor(props) {
        super(props);
        this.timePickerCallback = this.timePickerCallback.bind(this);
        this.timePicker = this.timePicker.bind(this);
    }

    render () {
        const callback = this.props.callback;
        const self = this;
        return (
            <Form ref="sitterForm">
                <BaseForm 
                    { ...this.props }/>
                <Text>Experience</Text>
                <TextInput
                    type="TextInput"
                    name="experience"
                    value={ this.props.user.sitterExperience ? this.props.user.sitterExperience : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterExperience(text)} />
                <Text>Minimum age of child</Text>
                <TextInput
                    type="TextInput"
                    name="MinimumAge"
                    value={ this.props.user.sitterMinAge ? this.props.user.sitterMinAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMinimumAge(text)} />
                <Text>Maximum age of child</Text>
                <TextInput
                    type="TextInput"
                    name="MinimumAge"
                    value={ this.props.user.sitterMaxAge ? this.props.user.sitterMaxAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMaximumAge(text)} />
                <Text>Hour Fee</Text>
                <TextInput
                    type="TextInput"
                    name="hourFee"
                    value={ this.props.user.hourFee ? this.props.user.hourFee : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterHourFee(text)} />
                <Text>Are you available on call?</Text>
                <Picker
                    selectedValue={ this.props.user.sitterImmediateAvailability }
                    onValueChange={ (availability) => { this.props.actions.registerActions.changeSitterImmediateAvailability(availability) }}>
                    <Picker.Item label={ strings.BOOLEAN[0] } value={ strings.BOOLEAN[0] } />
                    <Picker.Item label={ strings.BOOLEAN[1] } value={ strings.BOOLEAN[1] } />
                </Picker>
                <Text>Sitter Expertise</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeSitterExpertise(values) }
                    checked={ [] }
                    items={ strings.EXPERTISE } />
                <Text>Sitter Hobbies</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeSitterHobbies(values) }
                    checked={ [] }
                    items={ strings.HOBBIES } />
                <Text>Sitter Special needs</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeSitterSpecialNeeds(values) }
                    checked={ [] }
                    items={ strings.SPECIAL_NEEDS } />
                <Text>Availble on:</Text>
                {this.timePicker()}
                <TextButton
                    onPress={ function() {
                        if(self.props.registered) {
                             callback();
                        } else {
                             Actions.PersonalityTest({callback: callback})
                        }
                    }}
                    text="Submit" />
            </Form>
        );
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

const styles = StyleSheet.create({

});
