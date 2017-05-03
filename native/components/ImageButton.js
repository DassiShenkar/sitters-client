"use strict";

import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';

export default class ImageButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableWithoutFeedback
                style={this.props.styles ? this.props.styles : {}}
                onPress={this.props.onPress}>
                <Image
                    style={this.props.styles ? this.props.styles : {}}
                    source={this.props.src}
                />
            </TouchableWithoutFeedback>
        );
    }
}