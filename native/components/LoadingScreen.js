import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ActivityIndicator
                style={[styles.centering, {transform: [{scale: 1.5}]}]}
                size="large"
                color="#f86966" />
        );
    }
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: '80%'
    }
});

export default LoadingScreen;
