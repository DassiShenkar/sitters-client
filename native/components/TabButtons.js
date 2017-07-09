"use strict";

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabButtons extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let active = this.props.active;
        return (
            <View style={styles.container}>
                <View style={active === 1 ? styles.active : styles.notActive}>
                    <Icon.Button name="clock-o" textAlign="center" size={24} color={active === 1 ? '#fff' : "#8c8c8c"} backgroundColor={active === 1 ? '#f7a1a1' : '#fff'} onPress={this.byTime} />
                </View>
                <View style={active === 2 ? styles.active : styles.notActive}>
                    <Icon.Button name="map-marker" textAlign="center" size={24} color={active === 2 ? '#fff' : "#8c8c8c"} backgroundColor={active === 2 ? '#f7a1a1' : '#fff'} onPress={this.byLocation} />
                </View>
                <View style={active === 3 ? styles.active : styles.notActive}>
                    <Icon.Button name="dollar" textAlign="center" size={24} color={active === 3 ? '#fff' : "#8c8c8c"} backgroundColor={active === 3 ? '#f7a1a1' : '#fff'} onPress={this.byPrice} />
                </View>
            </View>
        );
    }

    byLocation() {
        Actions.SearchByLocation({type: 'reset', active: 2});
    }

    byTime() {
        Actions.SearchByTime({active: 1});
    }

    byPrice() {
        Actions.SearchByPrice({active: 3});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff'
    },
    active:{
        alignItems: 'center',
        width: '33%',
        padding: 10,
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