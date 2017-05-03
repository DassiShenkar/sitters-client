"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Picker, StyleSheet } from 'react-native'
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
            <View style={ styles.container }>
                <Logo
                    companyName="Sitters" />
                <Text style={ styles.text }>A Booking Platform for Parents and Sitters</Text>
                <View style={{ marginBottom: 15 }}>
                    <Picker
                        style={{ width: 200 }}
                        selectedValue={ this.props.user.userType }
                        onValueChange={ (userType) => this.props.actionCreators.changeUserType(userType) } >
                        <Picker.Item label="I'm A Parent" value="I'm a parent" />
                        <Picker.Item label="I'm A Sitter" value="I'm a sitter" />
                    </Picker>
                </View>
                <FaceBookLogin
                    { ...this.props } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        flexDirection: 'column'
    },
    text: {
        fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
        fontSize: 16,
        color: '#f7a1a1',
        marginBottom: 15
    }
});

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