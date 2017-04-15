"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View, Picker } from 'react-native';

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Text>User</Text>
                <TextInput 
                    type="TextInput" 
                    name="name"  
                    placeholder="Name" />
                <TextInput 
                    type="TextInput" 
                    name="email" 
                    placeholder="email" />
                <TextInput 
                    type="TextInput" 
                    name="age" 
                    placeholder="age" />
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
                    selectedValue={"Male"}
                    onValueChange={(pick) => {}}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
                <Text>Profile picture</Text>
                <Image />
            </View>
        );
    }
}
