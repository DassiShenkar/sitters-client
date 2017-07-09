"use strict";

import React, { Component } from 'react';
import { View, Text, Image, Slider, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux'
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        const sitterIndex = this.props.feed.sitterIndex ? this.props.feed.sitterIndex : 0;
        const sitterId = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex]._id : 0 : 0 : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].profilePicture : null : null : null;
        const name = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].name : null : null : null;
        const age = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].age : null : null: null;
        const availableNow = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].availableNow : null : null : null;
        const hourFee = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].hourFee : null : null : null;
        const coverPhoto = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].coverPhoto : null : null : null;
        const value = typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : this.props.searchBy.priceMaxRange;
        const priceRange = typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : Math.floor(this.props.searchBy.priceMaxRange);
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={this.navToInvite}
                    onSwipeRight={this.nextSitter}
                    config={config}>

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
                        <View style={styles.content}>
                            <Image source={{uri: coverPhoto}}>
                                <View style={styles.backgroundImage}>
                                    <View style={styles.feedContainer}>
                                        <View style={styles.backgroundCircle}>
                                            <ImageButton
                                                onPress={ (e) => {this.navToProfile(e, sitterId)} }
                                                styles={styles.sitterImage}
                                               src={this.props.sitters.length > 0 ? { uri: profilePicture } : {} } />
                                        </View>
                                        <View style={styles.feedTextView}>
                                            <Text style={styles.sitterText}>{name + ', ' + age}</Text>
                                            { availableNow ? <Text style={styles.sitterText}>Available now!</Text> : null}
                                            <Text style={styles.sitterText}>{ hourFee + '$' }</Text>
                                        </View>
                                    </View>
                                    <View style={styles.feedButtons}>
                                        <Icon.Button name="envelope" size={48} backgroundColor="rgba(0, 0, 0, 0)" color="#ffca00" onPress={this.navToInvite} />
                                        <Icon.Button name="remove" size={48} backgroundColor="rgba(0, 0, 0, 0)" color="#4dd0e1" onPress={this.nextSitter} />
                                    </View>
                                </View>
                            </Image>
                        </View>
                    : <Text style={styles.notFoundText}>No matches found!</Text>
                    }
                </GestureRecognizer>
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite() {
        let sitterIndex = this.props.feed.sitterIndex ? this.props.feed.sitterIndex : 0;
        let sitter =  this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] : 0 : 0;
        Actions.SitterSendInvite({ sitter: sitter });
    }

    nextSitter() {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.SearchByPrice({active: 3});
    }

    filter(value) {
        let sitters = this.props.feed.matches ? this.props.feed.matches : [];
        this.props.rangeActions.changeRange(1, Math.floor(value));
        this.props.feedActions.setFilteredMatches(sitters.filter(sitter => sitter.hourFee >= 1 && sitter.hourFee <= Math.floor(value)));
        this.props.feedActions.setSitterIndex(0);
        Actions.SearchByPrice({active: 3});
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    searchByContainer: {
        margin: 15,
        justifyContent: 'flex-start',
        marginBottom: 75,
        marginTop: 45
    },
    headerText: {
        fontSize: 16,
        color: '#f86966',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'OpenSans-Regular'
    },
    content: {
        justifyContent: 'flex-end'
    },
    sliderNumberWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    sliderNumbers: {
        fontSize: 12,
        color: '#f86966',
        fontFamily: 'OpenSans-Regular'
    },
    backgroundImage: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    feedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
        borderRadius:100,
        alignSelf: 'center'
    },
    backgroundCircle: {
        width: 110,
        height: 110,
        borderRadius:100,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    sitterText: {
        fontSize: 18,
        margin: 5,
        color: '#fff',
        fontFamily: 'Raleway-Regular'
    },
    feedButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
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
        color: '#f86966',
        fontFamily: 'OpenSans-Regular'
    }
});