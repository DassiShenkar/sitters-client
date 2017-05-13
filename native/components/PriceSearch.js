"use strict";

import React, { Component } from 'react';
import { View, Text, Image, Slider, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux'
import GestureRecognizer from 'react-native-swipe-gestures';

import ImageButton from '../components/ImageButton'

export default class PriceSearch extends React.Component {

    constructor (props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.nextSitter = this.nextSitter.bind(this);
    }

    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters[sitterIndex].profilePicture : null;
        const name = this.props.sitters.length ? this.props.sitters[sitterIndex].name : null;
        const age = this.props.sitters.length ? this.props.sitters[sitterIndex].age : null;
        const availableNow = this.props.sitters.length ? this.props.sitters[sitterIndex].availableNow : null;
        const hourFee = this.props.sitters.length ? this.props.sitters[sitterIndex].hourFee : null;
        let value = typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : this.props.searchBy.priceMaxRange;
        // const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : null;
        const coverPhoto = require('../style/img/background.jpg');
        let priceRange = typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : Math.floor(this.props.searchBy.priceMaxRange);
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={(e) => this.navToInvite(e, sitterId)}
                    onSwipeRight={(e) => this.nextSitter(e)}
                    config={config}>
                    <Image source={coverPhoto} style={styles.backgroundImage}>
                        <View style={styles.searchByContainer}>
                            <Text style={styles.headerText}>
                                Max Hour rate: {priceRange}$
                            </Text>
                            <View style={styles.sliderNumberWrapper}>
                                <Text style={styles.sliderNumbers}>1</Text>
                                <Text style={styles.sliderNumbers}>50</Text>
                            </View>
                            <Slider
                                value={ value }
                                {...this.props}
                                maximumTrackTintColor="#f7a1a1"
                                thumbTintColor="#f7a1a1"
                                maximumValue={50}
                                minimummValue={1}
                                onSlidingComplete={(value) => this.filter(value)} />
                        </View>
                        {
                            this.props.sitters.length > 0 ?
                            <View>
                                <View style={styles.feedContainer}>
                                    <ImageButton
                                        onPress={ (e) => {this.navToProfile(e, sitterId)} }
                                        styles={styles.sitterImage}
                                        src={this.props.sitters.length > 0 ? { uri: profilePicture } : {} } />
                                    <View style={styles.feedTextView}>
                                        <Text style={styles.sitterText}>{name + ', ' + age}</Text>
                                        { availableNow ? <Text style={styles.sitterText}>Available now!</Text> : null}
                                        <Text style={styles.sitterText}>{ hourFee + '$' }</Text>
                                    </View>
                                </View>
                                <View style={styles.feedButtons}>
                                    <ImageButton
                                        onPress={ (e) => {this.navToInvite()} }
                                        styles={styles.button}
                                        src={require('../style/icons/v.png')}/>
                                    <ImageButton
                                        onPress={ (e) => {this.nextSitter()} }
                                        styles={styles.button}
                                        src={require('../style/icons/next.png')}/>
                                </View>
                            </View>
                        : <Text style={styles.notFoundText}>No matches found!</Text>
                    }
                    </Image>
                </GestureRecognizer>
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite() {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.SitterSendInvite({ sitter: sitter });
    }

    nextSitter() {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.SearchByPrice();
    }

    filter(value) {
        let sitters = this.props.feed.matches;
        this.props.rangeActions.changeRange(1, Math.floor(value));
        this.props.feedActions.setFilteredMatches(sitters.filter(sitter => sitter.hourFee >= 1 && sitter.hourFee <= Math.floor(value)));
        Actions.SearchByPrice();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },
    searchByContainer: {
        margin: 15,
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    headerText: {
        fontSize: 16,
        color: '#f7a1a1',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10
    },
    sliderNumberWrapper: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    sliderNumbers: {
        fontSize: 12,
        color: '#f7a1a1'
    },
    backgroundImage: {
        width: null,
        height: null,
        resizeMode:'stretch'
    },
    feedContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '66.7%',
        padding: 30
    },
    feedTextView: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sitterImage: {
        width: 100,
        height: 100,
        borderRadius:100
    },
    sitterText: {
        color: '#f7a1a1',
        fontSize: 16,
        margin: 5
    },
    feedButtons: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius:100
    },
    notFoundText: {
        width: '100%',
        fontSize: 22,
        paddingLeft: 80,
        paddingTop: 50,
        color: '#f7a1a1'
    }
});