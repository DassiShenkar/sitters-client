import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'

export default class Logo extends React.Component {
    render () {
        return (
            <Text
                style={ styles.logo }>
                {this.props.companyName}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
        fontSize: 64,
        fontWeight: 'bold',
        color: '#f7a1a1'
    }
});


