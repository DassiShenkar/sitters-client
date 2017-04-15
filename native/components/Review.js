"use strict";

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export default class Review extends React.Component {

    constructor (props) {
        super(props);
        this.renderStars = this.renderStars.bind(this);
    }

    render () {
        return (
            <View>
                <Image
                    source={ this.props.image }
                    style={ {width: 30, height: 30} } />
                <Text>{ this.props.name }</Text>
                <Text>{ this.props.date }</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    { this.renderStars() }
                </View>
                <Text>{ this.props.review }</Text>
            </View>
        );
    }

    renderStars () {
        var starArray = [];
        for(var i = 0; i < this.props.stars; i++) {
            starArray.push({key: i, data: <Image
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                style={ {width: 15, height: 15} }
            />});
        }
        return starArray.map(function(star){
            return star.data;
        })
    }
}
