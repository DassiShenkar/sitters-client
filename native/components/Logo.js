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
        fontFamily: 'PoiretOne',
        fontSize: 64,
        color: '#f7a1a1'
    }
});


