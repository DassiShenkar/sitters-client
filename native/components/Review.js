"use strict";

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';

const rateItems = [
    {name: 'Punctual', value: 'punctioal'},
    {name: 'Behavior with child', value: 'behavior'},
    {name: 'Connection with child', value: 'connection'},
    {name: 'General behavior', value: 'general'}
];

export default class Review extends React.Component {

    constructor (props) {
        super(props);
        this.ratings = this.ratings.bind(this);
    }

    render () {
        return (
            <View>
                <View style={styles.container}>
                    <Image
                        source={ this.props.parentImage ? { uri: this.props.parentImage } : null }
                        style={styles.image} />
                    <Text style={{color: '#757575', fontFamily: 'OpenSans-Regular'}}>{ this.props.date ? this.props.date.split('T')[0] : new Date().toDateString() }</Text>
                </View>
                { this.props.description ? <Text>{this.props.description}</Text> : null }
                { this.ratings() }
            </View>
        );
    }

    ratings() {
        const self = this;
        return rateItems.map(function(item) {
            return (
                <View key={ Math.random() } style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text key={ Math.random() } style={{ color: '#757575', fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans-Regular' }}>{ item.name }</Text>
                    <StarRating
                        disabled={false}
                        emptyStar={'heart-o'}
                        fullStar={'heart'}
                        iconSet={'FontAwesome'}
                        maxStars={5}
                        rating={self.props.rates ? self.props.rates[item.value] : 0}
                        selectedStar={(rating) => {self.onChangeRate(item,rating)}}
                        starColor={'#f86966'}
                        emptyStarColor={'#f86966'}
                        starSize={20}
                    />
                </View>
            );
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100
    }
});