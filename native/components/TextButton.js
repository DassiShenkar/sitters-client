"use strict";

import React, { Component } from 'react';
import { Text, TouchableOpacity  } from 'react-native';

export default class ImageButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableOpacity  onPress={this.props.onPress}>
                <Text className={this.props.className ? this.props.className : 'noClass'} style={ this.props.styles ? this.props.styles : {} }>{ this.props.text }</Text>
            </TouchableOpacity >
        );
    }
}