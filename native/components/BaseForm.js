"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View, Picker } from 'react-native';
import {AgeFromDate} from 'age-calculator';

import strings from '../../src/static/strings';

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ margin: 20 }}>
                <Text>User</Text>
                <TextInput 
                    type="TextInput" 
                    name="name"
                    value={ this.props.user.name ? this.props.user.name : "Enter Your Name" }
                    onFocus={(text) => this.props.actions.registerActions.changeName(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeName(text)} />
                <TextInput 
                    type="TextInput" 
                    name="email"
                    value={ this.props.user.email ? this.props.user.email : "Enter Your Email" }
                    onFocus={(text) => this.props.actions.registerActions.changeEmail(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeEmail(text)} />
                <TextInput 
                    type="TextInput" 
                    name="age"
                    value={ this.props.user.birthday ? this.calcAge(this.props.user.birthday).toString() : "Enter Your Age" }
                    onFocus={(text) => this.props.actions.registerActions.changeAge(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeAge(text)} />
                <Text>Address</Text>
                <TextInput 
                    type="TextInput" 
                    name="city" 
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[0] : 'City' }
                    onFocus={(text) => this.props.actions.registerActions.changeCity(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeCity(text)} />
                <TextInput 
                    type="TextInput" 
                    name="street"
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[1] : 'Street' }
                    onFocus={(text) => this.props.actions.registerActions.changeStreet(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeStreet(text)} />
                <TextInput 
                    type="TextInput" 
                    name="houseNumber"
                    value={ this.props.user.location ? this.props.user.location.name.split(',')[2] : 'House Number' }
                    onFocus={(text) => this.props.actions.registerActions.changeHouseNumber(' ')}
                    onChangeText={(text) => this.props.actions.registerActions.changeHouseNumber(text)} />
                <Text>Gender</Text>
                <Picker
                    selectedValue={ this.props.user.gender ?  this.props.user.gender[0].toUpperCase() + this.props.user.gender.slice(1): 'Female' }
                    onValueChange={(gender) => { this.props.actions.registerActions.changeGender(gender) }}>
                    <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] } />
                    <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] } />
                </Picker>
                <Text>Profile picture</Text>
                <Image
                    source={this.props.user.picture ? {uri: this.props.user.picture.data.url} : ''}
                    style={{width: 50, height: 50}} />
            </View>
        );
    }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || '0';
    }
}
