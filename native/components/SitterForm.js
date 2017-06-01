"use strict";
import React, { Component } from 'react';
import { View, TextInput, Text, Picker, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import BaseForm from './BaseForm';
import Form from 'react-native-form';
import TextButton from './TextButton';
import strings from '../../src/static/strings';
import MyMultiSelect from './MyMultiSelect'


export default class SitterForm extends React.Component {

    constructor(props) {
        super(props);
        this.timePicker = this.timePicker.bind(this);
        this.getEducationFromFacebook = this.getEducationFromFacebook.bind(this);
        this.expChecked = this.expChecked.bind(this);
        this.removeExp = this.removeExp.bind(this);
        this.eduChecked = this.eduChecked.bind(this);
        this.removeEdu = this.removeEdu.bind(this);
        this.hobbiesChecked = this.hobbiesChecked.bind(this);
        this.removeHobbies = this.removeHobbies.bind(this);
        this.needsChecked = this.needsChecked.bind(this);
        this.removeNeeds = this.removeNeeds.bind(this);
        this.mobilityChecked = this.mobilityChecked.bind(this);
        this.removeMobility = this.removeMobility.bind(this);
    }

    render () {
        const callback = this.props.callback;
        return (
            <Form ref="sitterForm">
                <BaseForm 
                    { ...this.props }/>
                <Text style={styles.text}>Motto</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    maxLength={26}
                    underlineColorAndroid="#f7a1a1"
                    name="motto"
                    placeholder="Write your life motto"
                    value={ this.props.register.sitterMotto ? this.props.register.sitterMotto : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMotto(text)} />
                <Text style={styles.text}>Experience</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    name="experience"
                    placeholder="Sitter experience"
                    value={ this.props.register.sitterExperience ? this.props.register.sitterExperience : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterExperience(text)} />
                <Text style={styles.text}>Minimum age of child</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    name="Minimum age of child"
                    placeholder="Minimum child age"
                    value={ this.props.register.sitterMinAge ? this.props.register.sitterMinAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMinimumAge(text)} />
                <Text style={styles.text}>Maximum age of child</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    placeholder="Maximum child age"
                    name="MinimumAge"
                    value={ this.props.register.sitterMaxAge ? this.props.register.sitterMaxAge : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterMaximumAge(text)} />
                <Text style={styles.text}>Hour Fee</Text>
                <TextInput
                    style={styles.textInput}
                    type="TextInput"
                    selectionColor="#f7a1a1"
                    underlineColorAndroid="#f7a1a1"
                    name="hourFee"
                    placeholder="Hour fee per hour in $"
                    value={ this.props.register.hourFee ? this.props.register.hourFee : null }
                    onChangeText={(text) => this.props.actions.registerActions.changeSitterHourFee(text)} />
                <Text style={styles.text}>Immediate Availability</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={ this.props.register.sitterImmediateAvailability ? this.props.register.sitterImmediateAvailability : null }
                    onValueChange={ (availability) => { this.props.actions.registerActions.changeSitterImmediateAvailability(availability) }}>
                    <Picker.Item label={ strings.BOOLEAN[0] } value={ strings.BOOLEAN[0] } />
                    <Picker.Item label={ strings.BOOLEAN[1] } value={ strings.BOOLEAN[1] } />
                </Picker>
                <Text style={styles.text}>Mobility?</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.MOBILITY}
                    selected={this.props.register.sitterMobility ? this.props.register.sitterMobility : []}
                    update={this.mobilityChecked}
                    remove={this.removeMobility} />
                <Text style={styles.text}>Education</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.EDUCATION}
                    selected={this.getEducationFromFacebook(this.props.register.sitterEducation)}
                    update={this.eduChecked}
                    remove={this.removeEdu} />
                <Text style={styles.text}>Expertise</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.EXPERTISE}
                    selected={this.props.register.sitterExpertise ? this.props.register.sitterExpertise : []}
                    update={this.expChecked}
                    remove={this.removeExp} />
                <Text style={styles.text}>Hobbies</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.HOBBIES}
                    selected={this.props.register.sitterHobbies ? this.props.register.sitterHobbies : []}
                    update={this.hobbiesChecked}
                    remove={this.removeHobbies} />
                <Text style={styles.text}>Special Needs Qualifications</Text>
                <MyMultiSelect
                    style={{ marginBottom: 10 }}
                    items={strings.SPECIAL_NEEDS}
                    selected={this.props.register.sitterSpecialNeeds ? this.props.register.sitterSpecialNeeds : []}
                    update={this.needsChecked}
                    remove={this.removeNeeds} />
                <Text style={styles.text}>Availble on:</Text>
                {this.timePicker()}
                <TextButton
                    styles={styles.button}
                    onPress={ () => {callback()}}
                    text="Submit" />
            </Form>
        );
    }

    mobilityChecked() {
        let mobility = this.props.register.sitterMobility ? this.props.register.sitterMobility : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...mobility];
        this.props.actions.registerActions.changeSitterMobility(array);
    }

    removeMobility() {
        let mobility = this.props.register.sitterMobility ? this.props.register.sitterMobility : [];
        let array =  mobility.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeSitterMobility(array);
    }

    eduChecked (selected) {
        let education = this.getEducationFromFacebook(this.props.register.sitterEducation);
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...education];
        this.props.actions.registerActions.changeSitterEducation(array);
    }

    removeEdu(removed) {
        let education = this.getEducationFromFacebook(this.props.register.sitterEducation);
        let array =  education.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeSitterEducation(array);
    }

    expChecked (selected) {
        let expertise = this.props.register.sitterExpertise ? this.props.register.sitterExpertise : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...expertise];
        this.props.actions.registerActions.changeSitterExpertise(array);
    }

    removeExp(removed) {
        let expertise = this.props.register.sitterExpertise ? this.props.register.sitterExpertise : [];
        let array =  expertise.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeSitterExpertise(array);
    }

    hobbiesChecked (selected) {
        let hobbies = this.props.register.sitterHobbies ? this.props.register.sitterHobbies : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...hobbies];
        this.props.actions.registerActions.changeSitterHobbies(array);
    }

    removeHobbies(removed) {
        let hobbies = this.props.register.sitterHobbies ? this.props.register.sitterHobbies : [];
        let array =  hobbies.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeSitterHobbies(array);
    }

    needsChecked (selected) {
        let needs = this.props.register.sitterSpecialNeeds ? this.props.register.sitterSpecialNeeds : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...needs];
        this.props.actions.registerActions.changeSitterSpecialNeeds(array);
    }

    removeNeeds(removed) {
        let needs = this.props.register.sitterSpecialNeeds ? this.props.register.sitterSpecialNeeds : [];
        let array =  needs.filter(function(el) {
            return el !== removed;
        });
        this.props.actions.registerActions.changeSitterSpecialNeeds(array);
    }

    timePicker () {
        const self = this;
        return strings.WEEK_DAYS.map(function (day) {
            return <View key={ Math.random() }>
                <Text style={styles.text} key={ Math.random() }>{day}</Text>
                <MyMultiSelect
                    key={ Math.random() }
                    style={{ marginBottom: 10 }}
                    items={strings.HOURS}
                    selected={self.props.workingHours[day] ? self.props.workingHours[day] : []}
                    update={(selected) => {
                        let hours = self.props.workingHours[day] ? self.props.workingHours[day] : [];
                        console.log(hours);
                        let select = [];
                        selected.map(function(item){
                            select.push(item.name);
                        });
                        let array = [...select, ...hours];
                        console.log(array);
                        self.props.actions.workingHoursActions.changeWorkingHours(array, day);
                    }}
                    remove={(removed) => {
                        let hours = self.props.workingHours[day] ? self.props.workingHours[day] : [];
                        let array =  hours.filter(function(el) {
                            return el !== removed;
                        });
                        self.props.actions.workingHoursActions.changeWorkingHours(array, day);
                    }}
                />
            </View>;
        });
    }

    getEducationFromFacebook(education) {
        if (education) {
            return education;
        }
        else if (this.props.user.education) {
            let eduList = [];
            let facebookEducation = this.props.user.education;
            facebookEducation.forEach(function (obj) {
                if (eduList.indexOf(obj.type) === -1) {
                    eduList.push(obj.type);
                }
            });
            return eduList;
        }
        else {
            return [];
        }
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
        width: 70,
        alignSelf : 'flex-end',
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        marginRight: 15
    },
    header: {
        color: '#f7a1a1',
        fontSize: 19,
        marginLeft: 10,
        fontWeight: 'bold'
    }
});
