"use strict";

import React, { Component } from 'react';
import { View, Text, Image, Slider } from 'react-native';
import { Actions } from 'react-native-router-flux'

import ImageButton from '../components/ImageButton'

export default class PriceSearch extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    render () {
        return (
            <View style={{ marginTop: 15 }}>
                <Slider
                    {...this.props}
                    onValueChange={(value) => this.setState({value: value})} />
                <View>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <View>
                        <Text>Sitter Name</Text>
                        <Text>Proximity</Text>
                        <Text>Availbility</Text>
                    </View>
                </View>
                <ImageButton
                    onPress={Actions.SitterSendInvite}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                <ImageButton
                    onPress={Actions.refresh}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            </View>
        );
    }
}