"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Picker } from 'react-native'
import FaceBookLogin from '../components/FaceBookLogin'
// import RadioButtons from '../components/RadioButton'
import Logo from '../components/Logo'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Logo
                    companyName="Sitters"
                />
                 <Text>A Booking Platform for Parents and Sitters</Text>
                <Picker
                    selectedValue={"I\'m A Parent"}
                    onValueChange={(pick) => {}}>
                    <Picker.Item label="I'm A Parent" value="Parent" />
                    <Picker.Item label="I'm A Sitter" value="Sitter" />
                </Picker>
                <FaceBookLogin
                    { ...this.props }
                />
            </View>
        );
  }
}

// <RadioButtons
//     values={[
//                       { label: 'I\'m A Parent', value: 0 },
//                       { label: 'I\'m A Sitter', value: 1 }
//                     ]}
// />