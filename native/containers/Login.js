"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Navigator } from 'react-native'
import FaceBookLogin from '../components/FaceBookLogin'
import RadioButtons from '../components/RadioButton'
import Logo from '../components/Logo'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator} />
        );
    }

    renderScene () {
        return (
            <View>
                <Logo
                    companyName="Sitters"
                />
                 <Text>A Booking Platform for Parents and Sitters</Text>
                <RadioButtons
                    values={[
                      { label: 'I\'m A Parent', value: 0 },
                      { label: 'I\'m A Sitter', value: 1 }
                    ]}
                />
                <FaceBookLogin
                    { ...this.props }
                />
            </View>
        );
  }
}