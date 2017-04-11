"use strict";
import React, {Component} from 'react'
import { View, Image, Text} from 'react-native'
import Login from '../components/Login'
import RadioButtons from '../components/RadioButton'
import Logo from '../components/Logo'

export default class App extends React.Component {

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
                <RadioButtons
                    values={[
                      {label: 'I\'m A Parent', value: 0 },
                      {label: 'I\'m A Sitter', value: 1 }
                    ]}
                />
                <Login
                    navigation={this.props.navigation}
                />
            </View>
        );
  }
}