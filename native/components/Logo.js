import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'

var Logo = React.createClass({
    render: function () {
        return (
            <Text
                style={ styles.logo }>
                {this.props.companyName}
            </Text>
        );
    }
});

const styles = StyleSheet.create({
    logo: {
        fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
        fontSize: 64,
        fontWeight: 'bold',
        color: '#f7a1a1'
    }
});

export default Logo;

