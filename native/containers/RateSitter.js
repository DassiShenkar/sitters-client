"use strict";

import React, { Component } from 'react';
import { View, Modal, Text, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Rating from 'react-native-easy-rating';
import TextButton from '../components/TextButton'

const rateItems = ['Punctual', 'Behavior with child', 'Connection with child', 'General behavior'];

export default class RateSitter extends React.Component {

    constructor (props) {
        super(props);
        this.ratings = this.ratings.bind(this);
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
                    { this.ratings() }
                    <Text>Review</Text>
                    <TextInput ref="review" type="TextInput" name="review"  placeholder="Write a review"/>
                    <TextButton
                        onPress={this.send}
                        text="Send" />
                </Modal>
            </View>
        );
    }

    ratings () {
        return rateItems.map(function(item) {
            return (
            <View>
                <Text>{ item }</Text>
                <Rating
                    rating={1}
                    max={5}
                    iconWidth={24}
                    iconHeight={24}
                    iconSelected={require('../style/icons/full.png')}
                    iconUnselected={require('../style/icons/empty.png')}
                    onRate={(rating) => {alert(rating);}} />
            </View>
            );
        })
    }

    send () {
        // TODO: send rating
        Actions.pop();
    }
}