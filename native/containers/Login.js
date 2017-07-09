"use strict";
import React, {Component} from 'react'
import { View, Image, Text, Picker, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import strings from '../../src/static/strings';

import FaceBookLogin from '../components/FaceBookLogin'
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const radio_props = [
            {label: strings.USER_TYPE[0], value: 0 },
            {label: strings.USER_TYPE[1], value: 1 }
        ];
        console.log(this.props.user.userType);
        return (
            <View style={ styles.container }>
                <Logo
                    companyName="Sitters" />
                <Text style={ styles.text }>A Booking Platform for Parents and Sitters</Text>
                <View style={styles.innerContainer}>
                </View>
                <View style={styles.picker}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={this.props.user.userType ? this.props.user.userType === strings.USER_TYPE[0] ? 0 : 1 : 0}
                        onPress={(value) => {this.props.actionCreators.changeUserType(radio_props[value].label)}}
                        formHorizontal={false}
                        labelHorizontal={true}
                        animation={true}
                        buttonSize={12}
                        buttonOuterSize={20}
                        buttonColor={'#f86966'}
                        labelColor={'#f86966'}
                        labelStyle={{fontSize: 16, fontFamily: 'OpenSans-Regular'}} />
                </View>
                <FaceBookLogin
                    { ...this.props } />
            </View>
        );
    }
}


// <Picker
//     style={styles.picker}
//     selectedValue={ this.props.user.userType ?  this.props.user.userType : strings.USER_TYPE[0] }
//     onValueChange={(userType) => { this.props.actionCreators.changeUserType(userType) }}>
//     <Picker.Item label={ strings.USER_TYPE[0] } value={ strings.USER_TYPE[0] } />
//     <Picker.Item label={ strings.USER_TYPE[1] } value={ strings.USER_TYPE[1] } />
// </Picker>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        flexDirection: 'column'
    },
    innerContainer: {
        marginBottom: 15,
        borderBottomColor: '#fff',
        borderTopColor: '#f86966',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1
    },
    text: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: '#f86966',
        marginBottom: 15
    },
    picker: {
        width: '42%',
        marginBottom: 20
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