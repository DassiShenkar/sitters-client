"use strict";
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar'
import Logo from '../components/Logo'
import TextButton from '../components/TextButton'
import * as actionCreators from '../../src/actions/actionCreators';

class About extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <AppBar
                    { ...this.props }/>
                <Logo
                    companyName="Sitters"/>
                <Text>Version</Text>
                <Text>All rights reserved</Text>
                <TextButton
                    onPress={Actions.pop}
                    styles={styles.button}
                    text='Cancel' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    button: {
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);

