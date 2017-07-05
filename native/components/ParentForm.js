"use strict";
import React, { Component } from 'react';
import { Text, TextInput, View, Picker, StyleSheet  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
import BaseForm from './BaseForm';
import TextButton from './TextButton';
import strings from '../../src/static/strings';
import MyMultiSelect from './MyMultiSelect'

export default class ParentForm extends React.Component {

    constructor(props) {
        super(props);
        this.expChecked = this.expChecked.bind(this);
        this.removeExp = this.removeExp.bind(this);
        this.hobbiesChecked = this.hobbiesChecked.bind(this);
        this.removeHobbies = this.removeHobbies.bind(this);
        this.needsChecked = this.needsChecked.bind(this);
        this.removeNeeds = this.removeNeeds.bind(this);
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
                    selectedValue={ this.props.register.watchChildGender ?  this.props.register.watchChildGender: strings.GENDER_WITH_BOTH[0] }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGenderWatchChild(gender) }}>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[2] } value={ strings.GENDER_WITH_BOTH[2] }/>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[1] } value={ strings.GENDER_WITH_BOTH[1] }/>
                    <Picker.Item label={ strings.GENDER_WITH_BOTH[0] } value={ strings.GENDER_WITH_BOTH[0] }/>
                </Picker>
                <Text style={styles.text}>Max price</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    name="maxPrice"
                    placeholder="Enter your max price per hour for watch"
                    value={ this.props.register.watchMaxPrice ? this.props.register.watchMaxPrice : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildMaxPriceForWatch(text)} />
                <Text style={styles.header}>Child</Text>
                <Text style={styles.text}>Child name</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    name="child Name"
                    placeholder="Child name"
                    value={ this.props.register.childName ? this.props.register.childName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
                <Text style={styles.text}>Child age</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    name="childAge"
                    placeholder="child Age"
                    value={ this.props.register.childAge ? this.props.register.childAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
                <Text style={styles.text}>Child Expertise</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.EXPERTISE}
                    selected={this.props.register.childExpertise ? this.props.register.childExpertise : []}
                    update={this.expChecked}
                    remove={this.removeExp} />
                <Text style={styles.text}>Child Hobbies</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.HOBBIES}
                    selected={this.props.register.childHobbies ? this.props.register.childHobbies : []}
                    update={this.hobbiesChecked}
                    remove={this.removeHobbies} />
                <Text style={styles.text}>Child Special needs</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.SPECIAL_NEEDS}
                    selected={this.props.register.childSpecialNeeds ? this.props.register.childSpecialNeeds : []}
                    update={this.needsChecked}
                    remove={this.removeNeeds} />
                <Text style={styles.header}>Partner</Text>
                <Text style={styles.text}>Partner name</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    name="parnterName"
                    placeholder="parnter Name"
                    value={ this.props.register.partnerName ? this.props.register.partnerName : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerName(text)} />
                <Text style={styles.text}>Partner email</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    name="parnterEmail"
                    placeholder="parnter Email"
                    value={ this.props.register.parterEmail ? this.props.register.parterEmail : null}
                    onChangeText={(text) => this.props.actions.registerActions.changePartnerEmail(text)} />
                <Text style={styles.text}>Partner gender</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={ this.props.user.partnerGender ?  this.props.user.partnerGender : 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changePartnerGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] } />
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] } />
                </Picker>
            </Form>
        );
    }

    expChecked (selected) {
        let expertise = this.props.register.childExpertise ? this.props.register.childExpertise : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name)
        });
        let array = [...select, ...expertise];
        this.props.actions.registerActions.changeChildExpertise(array);
    }

    removeExp(removed) {
        let expertise = this.props.register.childExpertise ? this.props.register.childExpertise : [];
        let array =  expertise.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeChildExpertise(array);
    }

    hobbiesChecked (selected) {
        let hobbies = this.props.register.childHobbies ? this.props.register.childHobbies : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name)
        });
        let array = [...select, ...hobbies];
        this.props.actions.registerActions.changeChildHobbies(array);
    }

    removeHobbies(removed) {
        let hobbies = this.props.register.childHobbies ? this.props.register.childHobbies : [];
        let array =  hobbies.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeChildHobbies(array);
    }

    needsChecked (selected) {
        let needs = this.props.register.childSpecialNeeds ? this.props.register.childSpecialNeeds : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name)
        });
        let array = [...select, ...needs];
        this.props.actions.registerActions.changeChildSpecialNeeds(array);
    }

    removeNeeds(removed) {
        let needs = this.props.register.childSpecialNeeds ? this.props.register.childSpecialNeeds : [];
        let array =  needs.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeChildSpecialNeeds(array);
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#f86966',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    textInput: {
        width: '80%',
        marginBottom: 10,
        marginLeft: 5,
        color: '#757575'
    },
    picker: {
        width: '30%',
        marginLeft: 3,
        alignSelf : 'flex-start',
        marginBottom: 10
    },
    header: {
        color: '#f86966',
        fontSize: 19,
        marginLeft: 10,
        fontWeight: 'bold'
    }
});