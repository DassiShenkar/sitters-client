"use strict";

import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';

export default class ImageButton extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TouchableHighlight
                style={this.props.styles ? this.props.styles : {}}
                onPress={this.props.onPress}>
                <Image
                    style={this.props.styles ? this.props.styles : {}}
                    source={this.props.src}
                />
            </TouchableHighlight>
        );
    }
}