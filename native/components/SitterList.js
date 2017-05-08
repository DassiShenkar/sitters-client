"use strict";
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer from 'react-native-swipe-gestures';

import ImageButton from '../components/ImageButton';

export default class Feed extends React.Component {

    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.navToRate = this.navToRate.bind(this);
        this.nextSitter = this.nextSitter.bind(this);
    }


    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : null;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        let matchScore = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found';
        let profilePicture = this.props.sitters.length > 0 ? { uri: this.props.sitters[sitterIndex].profilePicture } : {};
        let sitterName = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : '';
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
                    <Image source={{ uri: coverPhoto }} style={styles.backgroundImage}>
                        <View style={styles.sitterContainer}>
                            <Text style={styles.matchScoreText}>{ matchScore }</Text>
                            <ImageButton
                                onPress={ (e) => this.navToProfile(e, sitterId) }
                                styles={styles.profilePicture}
                                src={ profilePicture } />
                            <Text style={styles.sitterName}>{ sitterName }</Text>
                        </View>
                        <View style={styles.navPanel}>
                            <ImageButton
                                onPress={ (e) => this.navToInvite(e, sitterId) }
                                styles={styles.button}
                                src={require('../style/icons/v.png')} />
                            <ImageButton
                                onPress={ (e) => this.navToRate(e, sitterId) }
                                styles={styles.button}
                                src={require('../style/icons/star.png')} />
                            <ImageButton
                                onPress={ (e) => this.nextSitter(e) }
                                styles={styles.button}
                                src={require('../style/icons/next.png')} />
                        </View>
                    </Image>
                </GestureRecognizer>
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite(e) {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.SitterSendInvite({ sitter: sitter });
    }

    navToRate(e) {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.RateSitter({ sitter: sitter });
    }

    nextSitter(e) {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.refresh();
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sitterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    backgroundImage: {
        width: null,
        height: null,
        resizeMode:'stretch'
    },
    matchScoreText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: '#f7a1a1',
        borderRadius: 50,
        padding: 10
    },
    profilePicture: {
        width: 200,
        height: 200,
        borderRadius:100
    },
    sitterName: {
        color: '#fff',
        fontSize: 22,
        marginTop: 30,
        backgroundColor: '#f7a1a1',
        borderRadius: 50,
        padding: 10
    },
    navPanel: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 70,
        width: '100%',
        paddingRight: 70,
        paddingLeft: 70
    },
    button: {
        width: 50,
        height: 50,
        borderRadius:100
    }
});