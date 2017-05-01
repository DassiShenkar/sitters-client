"use strict";

import React, { Component } from 'react';
import { View, Modal, Text, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Rating from 'react-native-easy-rating';
import TextButton from '../components/TextButton'

export default class RateSitter extends React.Component {

    constructor (props) {
        super(props);
        this.send = this.send.bind(this);
    }

    render () {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={true}
                    onRequestClose={() => {Actions.pop()}}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Text>Review</Text>
                    <TextInput ref="review" type="TextInput" name="review"  placeholder="Write a review"/>
                    <TextButton
                        onPress={this.send}
                        text="Send" />
                </Modal>
            </View>
        );
    }
    
    send () {
        // TODO: send rating
        Actions.pop();
    }
}