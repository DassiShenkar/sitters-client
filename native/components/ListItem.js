"use strict";

import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';

export default class ListItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        let text = function() {
            switch(self.props.status) {
                case 'waiting': return <Text>Waiting Invitation</Text>;
                case 'accepted': return <Text>Accepted your invite</Text>;
                case 'declined': return <Text>Declied your invite</Text>;
                default: return null;
            }
        };
        return (
            <TouchableHighlight onPress={ this.props.onPress ? this.props.onPress : ()=>{} }>
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
            </TouchableHighlight>
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