"use strict";

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class NotificationItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        let text = function() {
            switch(self.props.message) {
                case 'New Sitter Available': return <Text>New Sitter Available</Text>;
                default: return null;
            }
        };
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.sitterImage }}
                    style={styles.image} />
                <View>
                    <Text>{ this.props.sitterName }</Text>
                    <Text>{ text() }</Text>
                </View>
                <Text>{ this.props.date.slice(0, 10) }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
});