"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View, Picker, StyleSheet } from 'react-native';
import {AgeFromDate} from 'age-calculator';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import MyMultiSelect from './MyMultiSelect'

import strings from '../../src/static/strings';

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.getLanguagesFromFacebook = this.getLanguagesFromFacebook.bind(this);
        this.calcAge = this.calcAge.bind(this);
        this.languagesChecked = this.languagesChecked.bind(this);
        this.onChange = this.onChange.bind(this);
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
                <Text style={styles.text}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="name"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    placeholder="name"
                    value={ this.props.user.name ? this.props.user.name : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeName(text)}/>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="email"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    placeholder="email"
                    value={ this.props.user.email ? this.props.user.email : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeEmail(text)}/>
                <Text style={styles.text}>Age</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="age"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    placeholder="age"
                    value={ this.props.user.birthday ? this.calcAge(this.props.user.birthday).toString() : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeAge(text)}/>
                <Text style={styles.text}>Address</Text>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          console.log(data);
                          console.log(details);
                          this.onChange(data);
                        }}
                        getDefaultValue={() => {
                          return this.props.user.address; // text input default value
                        }}
                        styles={{
                            textInputContainer: {
                              backgroundColor: 'rgba(0,0,0,0)',
                              borderTopWidth: 0,
                              borderBottomWidth:1,
                              marginBottom: 10
                            },
                            textInput: {
                              marginLeft: 0,
                              marginRight: 0,
                              height: 38,
                              color: '#f7a1a1',
                              fontSize: 16
                            }
                        }}
                        query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: 'AIzaSyAdwS1J07gIr4XzwkJeZsrszkMKCBm4Tb8',
                          language: 'en' // language of the results
                        }} />
                </View>
                <Text style={styles.text}>Gender</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={ this.props.user.gender ?  this.props.user.gender : 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] }/>
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] }/>
                </Picker>
                <Text style={styles.text}>Languages</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.LANGUAGES}
                    selected={self.props.register.languages ? self.props.register.languages : this.props.user.languages}
                    update={this.languagesChecked} />
            </View>
        );
    }

    languagesChecked (selected) {
        console.log(selected);
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

    onChange(address){
        console.log(address);
        this.props.actions.registerActions.changeUserAddress(address);
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
    }
});
