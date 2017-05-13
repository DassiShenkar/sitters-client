"use strict";

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class Review extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View>
                <View style={styles.container}>
                    <Image
                        source={ this.props.parentImage ? { uri: this.props.parentImage } : null }
                        style={styles.image} />
                    <Text>{ this.props.date ? this.props.date.split('T')[0] : new Date().toDateString() }</Text>
                </View>
                <Text>{ this.props.description ? this.props.description : 'Empty review' }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        padding: 5,
        justifyContent: 'space-between'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100
    }
});