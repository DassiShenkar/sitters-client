"use strict";

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export default class Review extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View>
                <View style={{ flexDirection: 'row-reverse', padding: 5,justifyContent: 'space-between' }}>
                    <Image
                        source={ this.props.parentImage ? { uri: this.props.parentImage } : null }
                        style={ {width: 30, height: 30, borderRadius: 100} } />
                    <Text>{ this.props.date ? this.props.date.split('T')[0] : new Date().toDateString() }</Text>
                </View>
                <Text>{ this.props.description ? this.props.description : 'Empty review' }</Text>
            </View>
        );
    }
}
