"use strict";
import React, { Component } from 'react';
import { Text, TextInput, Image, View } from 'react-native';
import RadioButtons from './RadioButton'

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Text>User</Text>
                <TextInput type="TextInput" name="name"  placeholder="name"/>
                <TextInput type="TextInput" name="email" placeholder="email" />
                <TextInput type="TextInput" name="age" placeholder="age" />
                <Text>Address</Text>
                <TextInput type="TextInput" name="city" placeholder="city" />
                <TextInput type="TextInput" name="street" placeholder="street" />
                <TextInput type="TextInput" name="houseNumber" placeholder="houseNumber" />
                <Text>Gender</Text>
                <RadioButtons
                    values={[
                    {label: 'Male', value: 0 },
                    {label: 'Female', value: 1 }
                    ]} />
                <Text>Profile picture</Text>
                <Image />
            </View>
        );
    }
}
