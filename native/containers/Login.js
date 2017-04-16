"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Picker } from 'react-native'
import FaceBookLogin from '../components/FaceBookLogin'
// import RadioButtons from '../components/RadioButton'
import Logo from '../components/Logo'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.pick = this.pick.bind(this);
        this.state = {
            userType: "I'm A Parent"
        }
    }

    render () {
        return (
            <View>
                <Logo
                    companyName="Sitters"
                />
                 <Text>A Booking Platform for Parents and Sitters</Text>
                <Picker
                    selectedValue={ this.state.userType }
                    onValueChange={ this.pick }>
                    <Picker.Item label="I'm A Parent" value="I'm A Parent" />
                    <Picker.Item label="I'm A Sitter" value="I'm A Sitter" />
                </Picker>
                <FaceBookLogin
                    userType = { this.state.userType }
                    { ...this.props }
                />
            </View>
        );
    }

    pick (pick) {
        var newState = {};
        alert(pick.value);
        newState.userType = pick.value;
        this.setState(newState)
    }
}