"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View, Picker } from 'react-native';

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        alert(this.props.user.picture);
        return (
            <View>
                <Text>User</Text>
                <TextInput 
                    type="TextInput" 
                    name="name"
                    value={ this.props.user.name }/>
                <TextInput 
                    type="TextInput" 
                    name="email"
                    value={ this.props.user.email }/>
                <TextInput 
                    type="TextInput" 
                    name="age"
                    value={ this.props.user.birthday }/> 
                <Text>Address</Text>
                <TextInput 
                    type="TextInput" 
                    name="city" 
                    placeholder="city" />
                <TextInput 
                    type="TextInput" 
                    name="street" 
                    placeholder="street" />
                <TextInput 
                    type="TextInput" 
                    name="houseNumber" 
                    placeholder="houseNumber" />
                <Text>Gender</Text>
                <Picker
                    selectedValue={ this.props.user.gender }
                    onValueChange={(pick) => {}}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
                <Text>Profile picture</Text>
                <Image 
                    source={{url:this.props.user.picture}}
                    style={{width: 50, height: 50}} />
            </View>
        );
    }
}
