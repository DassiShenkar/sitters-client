"use strict";

import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';

export default class ImageButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Text style={ this.props.styles ? this.props.styles : {} }>{ this.props.text }</Text>
            </TouchableWithoutFeedback>
        );
    }
}