"use strict";

import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text } from 'react-native';

export default class ListItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableHighlight onPress={ this.props.onPress ? this.props.onPress : ()=>{} } style={{flex: 1, flexDirection: 'row'}}>
                <View>
                    <Image
                        source={ this.props.src }
                        style={{width: 50, height: 50}} />
                    <View>
                        <Text>{ this.props.name }</Text>
                        <Text>{ this.props.msg }</Text>
                    </View>
                    <Text>{ this.props.date }</Text>
                </View>
            </TouchableHighlight>
        );
    }
}