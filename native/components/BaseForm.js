"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View, Picker, StyleSheet } from 'react-native';
import {AgeFromDate} from 'age-calculator';
import { CheckboxGroup } from 'react-native-material-design';

import strings from '../../src/static/strings';

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.getLanguagesFromFacebook = this.getLanguagesFromFacebook.bind(this);
        this.calcAge = this.calcAge.bind(this);
        this.languagesChecked = this.languagesChecked.bind(this);
    }

    render () {
        const self = this;
        let languages = this.getLanguagesFromFacebook(this.props.register.languages);
        let selected = function(){
            if(self.props.user.languages) {
                let selected = [];
                strings.LANGUAGES.forEach(function(language) {
                    languages.forEach(function(lang) {
                        if(lang.label === language.label) {
                            selected.push(language.value);
                        }
                    });
                });
                return selected;
            } else {
                return [];
            }
        };
        return (
            <View>
                <Text style={styles.text}>User</Text>
                <TextInput
                    type="TextInput"
                    name="name"
                    placeholder="name"
                    value={ this.props.user.name ? this.props.user.name : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeName(text)}/>
                <TextInput
                    type="TextInput"
                    name="email"
                    placeholder="email"
                    value={ this.props.user.email ? this.props.user.email : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeEmail(text)}/>
                <TextInput
                    type="TextInput"
                    name="age"
                    placeholder="age"
                    value={ this.props.user.birthday ? this.calcAge(this.props.user.birthday).toString() : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeAge(text)}/>
                <Text style={styles.text}>Address</Text>
                <TextInput
                    type="TextInput"
                    name="city"
                    placeholder="city"
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[0] : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeCity(text)}/>
                <TextInput
                    type="TextInput"
                    name="street"
                    placeholder="street"
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[1] : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeStreet(text)}/>
                <TextInput
                    type="TextInput"
                    name="houseNumber"
                    placeholder="houseNumber"
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[2] : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeHouseNumber(text)}/>
                <Text style={styles.text}>Gender</Text>
                <Picker
                    selectedValue={ this.props.user.gender ?  this.props.user.gender[0].toUpperCase() + this.props.user.gender.slice(1): 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] }/>
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] }/>
                </Picker>
                <Text style={styles.text}>Profile picture</Text>
                <Image
                    source={this.props.user.picture ? {uri: this.props.user.picture.data.url} : null}
                    style={{width: 100, height: 100, borderRadius: 100}}/>
                <Text style={styles.text}>Languages</Text>
                <CheckboxGroup
                    onSelect={ (values) => self.languagesChecked }
                    checked={ selected() }
                    items={ strings.LANGUAGES } />
            </View>
        );
    }

    languagesChecked (selected) {
        this.props.actions.registerActions.changeLanguages(selected);
    }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || '0';
    }

    getLanguagesFromFacebook(languages){
        if(languages){
            return languages;
        }
        else if(this.props.user.languages){
            let langs =  [];
            this.props.user.languages.forEach(function(language){
                langs.push({value:language.name.toLowerCase(), label:language.name});
            });
            return langs;
        }
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
