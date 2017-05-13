"use strict";

import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class MenuItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        let image = function() {
            switch (self.props.index) {
                case 1:
                    return <Image source={ require('../style/icons/profile.png') } style={ styles.image }/>;
                case 2:
                    return <Image source={ require('../style/icons/settings.png') } style={ styles.image }/>;
                case 3:
                    return <Image source={ require('../style/icons/logout.png') } style={ styles.image }/>;
                case 4:
                    return <Image source={ require('../style/icons/close.png') } style={ styles.image }/>;
                default:
                    return null;
            }
        };
        return (
            <TouchableHighlight rowId={self.props.index} onPress={ this.props.menuCallback }>
                <View style={ styles.container }>
                    { image() }
                    <Text>{ this.props.name }</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    image: {
        width: 20,
        height: 20
    }
});

export default MenuItem;
