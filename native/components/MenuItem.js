"use strict";

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


class MenuItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        let image = function() {
            switch (self.props.index) {
                case 1:
                    return <Icon name="user-circle-o" size={20} backgroundColor="#fff" color="#757575"/>;
                case 2:
                    return <Icon name="gear" size={20} backgroundColor="#fff" color="#757575"/>;
                case 3:
                    return <Icon name="unlock-alt" size={20} backgroundColor="#fff" color="#757575"/>;
                case 4:
                    return <Icon name="close" size={20} backgroundColor="#fff" color="#757575"/>;
                default:
                    return null;
            }
        };
        return (
            <TouchableOpacity rowId={self.props.index} onPress={ this.props.menuCallback }>
                <View style={ styles.container }>
                    { image() }
                    <Text>{ this.props.name }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 20,
        height: 20
    }
});

export default MenuItem;
