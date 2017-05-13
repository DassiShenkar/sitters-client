"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View, Picker, StyleSheet  } from 'react-native';
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
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text style={styles.text}>Max price</Text>
                <TextInput
                    type="TextInput"
                    name="max Price"
                    placeholder="maxPrice"
                    value={ this.props.register.watchMaxPrice ? this.props.register.watchMaxPrice : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <Text style={styles.text}>Child name</Text>
                <TextInput
                    type="TextInput"
                    name="child Name"
                    placeholder="childName"
                    value={ this.props.register.childName ? this.props.register.childName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
                <Text style={styles.text}>Child age</Text>
                <TextInput
                    type="TextInput"
                    name="childAge"
                    placeholder="child Age"
                    value={ this.props.register.childAge ? this.props.register.childAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
                <Text style={styles.text}>Child Expertise</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildExpertise(values) }
                    checked={ [] }
                    items={ strings.EXPERTISE } />
                <Text style={styles.text}>Child Hobbies</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildHobbies(values) }
                    checked={ [] }
                    items={ strings.HOBBIES } />
                <Text style={styles.text}>Child Special needs</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.props.actions.registerActions.changeChildSpecialNeeds(values) }
                    checked={ [] }
                    items={ strings.SPECIAL_NEEDS } />
                <Text style={styles.text}>Partner name</Text>
                <TextInput
                    type="TextInput"
                    name="parnterName"
                    placeholder="parnter Name"
                    value={ this.props.register.partnerName ? this.props.register.partnerName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerName(text)} />
                <Text style={styles.text}>Partner email</Text>
                <TextInput
                    type="TextInput"
                    name="parnterEmail"
                    placeholder="parnter Email"
                    value={ this.props.register.parterEmail ? this.props.register.parterEmail : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerEmail(text)} />
                <Text style={styles.text}>Partner gender</Text>
                <Picker
                    selectedValue={ this.props.user.partnerGender ?  this.props.user.partnerGender[0].toUpperCase() + this.user.partnerGender.slice(1) : 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changePartnerGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] } />
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] } />
                </Picker>
                <TextButton
                    styles={styles.button}
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
}

const styles = StyleSheet.create({
    text: {
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        fontSize: 20,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        marginRight: 15
    }
});