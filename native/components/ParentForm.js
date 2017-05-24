"use strict";
import React, { Component } from 'react';
import { Text, TextInput, View, Picker, StyleSheet  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
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
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text style={styles.text}>Preffered Sitter Gender</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={ this.props.register.watchChildGender ?  this.props.register.watchChildGender: 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGenderWatchChild(gender) }}>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[2] } value={ strings.GENDER_WITH_BOTH[2] }/>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[1] } value={ strings.GENDER_WITH_BOTH[1] }/>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[0] } value={ strings.GENDER_WITH_BOTH[0] }/>
                </Picker>
                <Text style={styles.text}>Max price</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    name="maxPrice"
                    placeholder="Enter your max price per hour for watch"
                    value={ this.props.register.watchMaxPrice ? this.props.register.watchMaxPrice : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <TextButton
                    styles={styles.button}
                    onPress={ function() {
                        if(self.props.registered) {
                             callback();
                        } else {
                             Actions.PersonalityTest({callback: callback})
                        }
                    }}
                    text="Next step" />
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#f7a1a1',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    textInput: {
        width: '80%',
        marginBottom: 10,
        marginLeft: 5,
        color: '#f7a1a1'
    },
    picker: {
        width: '30%',
        marginLeft: 3,
        alignSelf : 'flex-start',
        marginBottom: 10
    },
    button: {
        fontSize: 16,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        marginRight: 15
    }
});