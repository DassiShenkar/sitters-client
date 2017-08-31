"use strict";
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Form from 'react-native-form';
import BaseForm from './BaseForm';
import strings from '../../src/static/strings';
import MyMultiSelect from './MyMultiSelect'
import RadioForm from 'react-native-simple-radio-button';

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
        const radio_props = [
            {label: strings.GENDER_WITH_BOTH[0], value: 0 },
            {label: strings.GENDER_WITH_BOTH[1], value: 1 },
            {label: strings.GENDER_WITH_BOTH[2], value: 2 }
        ];
        const gender_props = [
            {label: strings.GENDER[0], value: 0 },
            {label: strings.GENDER[1], value: 1 }
        ];
        return (
            <Form ref="parentForm">
                <BaseForm
                    { ...this.props }/>
                <Text style={styles.text}>Preffered Sitter Gender</Text>
                <View style={{marginBottom: 10, marginLeft: 10, marginTop: 10}}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={
                                this.props.register.watchChildGender ?
                                    this.props.register.watchChildGender === strings.GENDER_WITH_BOTH[2] ? 2 :
                                     this.props.register.watchChildGender === strings.GENDER_WITH_BOTH[1] ? 1 :
                                    0 : 0
                            }
                        onPress={(value) => {this.props.actions.registerActions.changeGenderWatchChild(radio_props[value].label)}}
                        formHorizontal={false}
                        labelHorizontal={true}
                        animation={true}
                        buttonSize={12}
                        buttonOuterSize={20}
                        buttonColor={'#f86966'}
                        labelColor={'#f86966'}
                        labelStyle={{fontSize: 16, fontFamily: 'OpenSans-Regular'}} />
                </View>
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
                <Text style={styles.text}>Child Difficulties</Text>
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
                <View style={{marginBottom: 10, marginLeft: 10, marginTop: 10}}>
                    <RadioForm
                        radio_props={gender_props}
                        initial={
                                    this.props.user.partnerGender ?
                                        this.props.user.partnerGender === strings.GENDER[1] ? 1 : 0 :
                                        0
                                }
                        onPress={(value) => {this.props.actions.registerActions.changePartnerGender(gender_props[value].label)}}
                        formHorizontal={false}
                        labelHorizontal={true}
                        animation={true}
                        buttonSize={12}
                        buttonOuterSize={20}
                        buttonColor={'#f86966'}
                        labelColor={'#f86966'}
                        labelStyle={{fontSize: 16, fontFamily: 'OpenSans-Regular'}} />
                </View>
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
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    textInput: {
        width: '80%',
        marginBottom: 10,
        marginLeft: 5,
        color: '#757575',
        fontFamily: 'OpenSans-Regular',
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
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    }
});