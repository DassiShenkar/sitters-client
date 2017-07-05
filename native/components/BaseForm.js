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
        this.personalityChecked = this.personalityChecked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.removeLang = this.removeLang.bind(this);
        this.removePer = this.removePer.bind(this);
    }

    render () {
        const self = this;
        let addressString = this.props.register.address ? this.props.register.address.street + ' ' + this.props.register.address.houseNumber + ', ' + this.props.register.address.city : null;
        return (
            <View>
                <Text style={styles.header}>Personal info</Text>
                <Text style={styles.text}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="name"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    placeholder="Name"
                    value={ this.props.user.name ? this.props.user.name : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeName(text)}/>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="email"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    placeholder="Email"
                    value={ this.props.user.email ? this.props.user.email : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeEmail(text)}/>
                <Text style={styles.text}>Age</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    name="age"
                    selectionColor="#757575"
                    underlineColorAndroid="#757575"
                    placeholder="Age"
                    value={ this.props.user.birthday ? this.calcAge(this.props.user.birthday).toString() : this.props.user.age ? this.props.user.age.toString() : null }
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
                        onPress={(data, details) => { this.onChange(data, details)}}
                        getDefaultValue={() => {
                          return addressString; // text input default value
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
                              color: '#757575',
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
                    selectedValue={this.props.user.gender ? this.props.user.gender : this.props.register.gender ?  this.props.register.gender : 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] }/>
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] }/>
                </Picker>
                <Text style={styles.text}>Languages</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.LANGUAGES}
                    selected={self.props.register.languages ? self.props.register.languages : self.props.user.languages}
                    update={this.languagesChecked}
                    remove={this.removeLang}/>
                <Text style={styles.text}>Pick 6 words that describe you</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.PERSONALITY_WORDS}
                    selected={self.props.register.items ? self.props.register.items : []}
                    update={this.personalityChecked}
                    remove={this.removePer}/>
            </View>
        );
    }

    languagesChecked (selected) {
        let languages = this.props.register.languages ? this.props.register.languages : this.props.user.languages ? this.props.user.languages : [];
        let array = [...selected, ...languages];
        this.props.actions.registerActions.changeLanguages(array);
    }

    removeLang(removed) {
        let languages = this.props.register.languages ? this.props.register.languages : this.props.user.languages;
        let array =  languages.filter(function(el) {
            return el.name !== removed.name;
        });
        this.props.actions.registerActions.changeLanguages(array);
    }

    personalityChecked (selected) {
        let personality = this.props.register.items ? this.props.register.items : [];
        if(personality.length >= 6 || selected > 6) {
            alert('Please pick 6 items only');
            return;
        }
        let array = [...selected, ...personality];
        this.props.actions.registerActions.changePersonalityItems(array);
    }

    removePer(removed) {
        let personality = this.props.register.items ? this.props.register.items : [];
        let array =  personality.filter(function(el) {
            return el.name !== removed.name;
        });
        this.props.actions.registerActions.changePersonalityItems(array);
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

    onChange(data, details){
        this.props.actions.locationActions.addLocation(details.geometry.location);
        this.props.actions.registerActions.changeUserAddress(data.description);
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OpenSans-Regular',
        color: '#f86966',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    textInput: {
        fontFamily: 'OpenSans-Regular',
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
        fontFamily: 'OpenSans-Regular',
        color: '#f86966',
        fontSize: 19,
        marginLeft: 10,
        fontWeight: 'bold'
    }
});
