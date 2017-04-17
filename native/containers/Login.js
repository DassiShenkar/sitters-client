"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Picker } from 'react-native'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import FaceBookLogin from '../components/FaceBookLogin'
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';



class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Logo
                    companyName="Sitters" />
                 <Text>A Booking Platform for Parents and Sitters</Text>
                <Picker
                    selectedValue={ this.props.user.userType }
                    onValueChange={ (userType) => this.props.actionCreators.changeUserType(userType) } >
                    <Picker.Item label="I'm A Parent" value="I'm a Parent" />
                    <Picker.Item label="I'm A Sitter" value="I'm a Sitter" />
                </Picker>
                <FaceBookLogin
                    { ...this.props } />
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

/*
 * bind app to action creators
 * */

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);