"use strict";

import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

export default class ImageButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <Text style={ this.props.styles ? this.props.styles : {} }>{ this.props.text }</Text>
            </TouchableHighlight>
        );
    }
}