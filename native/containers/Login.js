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
                <View style={{ marginBottom: 15,
                                borderBottomColor: '#fff',
                                borderTopColor: '#f7a1a1',
                                borderLeftColor: '#fff',
                                borderRightColor: '#fff',
                                borderStyle: 'solid',
                                borderWidth: 1 }}>
                    <Text style={ styles.questionText }>What kind of user are you?</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={ this.props.user.userType }
                        onValueChange={ (userType) => this.props.actionCreators.changeUserType(userType) } >
                        <Picker.Item label="I'm a Parent" value="I'm a Parent" />
                        <Picker.Item label="I'm a Sitter" value="I'm a Sitter" />
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
        marginBottom: 15,
    },
    questionText: {
        fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
        fontSize: 16,
        color: '#f7a1a1',
        marginTop: 45
    },
    picker: {
        width: '48%',
        color: '#f7a1a1'
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