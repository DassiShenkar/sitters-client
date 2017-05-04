"use strict";

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImageButton from './ImageButton';

export default class TabButtons extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <View>
                    <ImageButton
                        onPress={ Actions.SearchByPrice }
                        styles={styles.image}
                        src={require('../style/icons/dollar.png')} />
                </View>
                <View>
                    <ImageButton
                        onPress={ Actions.SearchByTime }
                        styles={styles.image}
                        src={require('../style/icons/clock.png')} />
                </View>
                <View>
                    <ImageButton
                        onPress={ this.location }
                        styles={styles.image}
                        src={require('../style/icons/location.png')} />
                </View>
            </View>
        );
    }

    location() {
        Actions.SearchByLocation({type: 'reset'});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center', height: 50,
        backgroundColor: '#f7a1a1',
        paddingRight: 25,
        paddingLeft: 25,
        borderBottomColor: '#000',
        borderTopColor: '#f7a1a1',
        borderLeftColor: '#f7a1a1',
        borderRightColor: '#f7a1a1',
        borderStyle: 'solid',
        borderWidth: 1
    },
    image: {
        width: 30,
        height: 30,
        borderRadius:100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});