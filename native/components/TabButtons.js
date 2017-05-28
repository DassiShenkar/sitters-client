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
        let active = this.props.active;
        return (
            <View style={styles.container}>
                <View style={active === 1 ? styles.active : styles.notActive}>
                    <ImageButton
                        onPress={ this.byPrice }
                        styles={styles.image}
                        src={require('../style/icons/dollar.png')} />
                </View>
                <View style={active === 2 ? styles.active : styles.notActive}>
                    <ImageButton
                        onPress={ this.byTime }
                        styles={styles.image}
                        src={require('../style/icons/clock.png')} />
                </View>
                <View style={active === 3 ? styles.active : styles.notActive}>
                    <ImageButton
                        onPress={ this.byLocation }
                        styles={styles.image}
                        src={require('../style/icons/location.png')} />
                </View>
            </View>
        );
    }

    byLocation() {
        Actions.SearchByLocation({type: 'reset', active: 3});
    }

    byTime() {
        Actions.SearchByTime({active: 2});
    }

    byPrice() {
        Actions.SearchByPrice({active: 1});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1
    },
    active:{
        alignItems: 'center',
        width: '33%',
        backgroundColor: '#f7a1a1'
    },
    notActive:{
        alignItems: 'center',
        width: '33%',
        backgroundColor: '#fff'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius:100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});