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
        this.openInfo = this.openInfo.bind(this);
        this.addFriends = this.addFriends.bind(this);
    }


    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : null;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        let profilePicture = this.props.sitters.length > 0 ? { uri: this.props.sitters[sitterIndex].profilePicture } : {};
        let sitterName = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : '';
        let motto = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].motto : '';
        let personality = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].personality ?
            this.props.sitters[sitterIndex].personality.map(function(word) {
                return <Text key={Math.random()} style={styles.personality}>{word} </Text>;
            })
            : null : null;
        let friends = this.props.user.mutualFriends ? this.props.user.mutualFriends : null;
        let friendCount = this.props.user.mutualFriends ? friends.length : 0;
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={(e) => this.navToInvite(e, sitterId)}
                    onSwipeRight={(e) => this.nextSitter(e)}
                    // onSwipeUp={(e) => this.openInfo(e)}
                    onSwipeDown={(e) => this.navToProfile(e, sitterId)}
                    config={config}>
                    <Image source={{uri: coverPhoto}} style={styles.backgroundImage}>
                        <View style={styles.sitterContainer}>
                            <ImageButton
                                onPress={ (e) => this.navToProfile(e, sitterId) }
                                styles={styles.profilePicture}
                                src={ profilePicture } />
                            <Text style={styles.text}>{ sitterName }</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>You and {sitterName.split(' ')[0]} have {friendCount} mutual friends:</Text>
                            {friendCount ? friendCount > 0 ? this.addFriends() : null : null}
                            {personality ? <Text style={styles.infoText}>{sitterName.split(' ')[0]} Tells that she is:</Text> : null}
                            <View style={styles.personalityContainer}>
                                {personality}
                            </View>
                            {motto ? <Text style={styles.infoText}>{sitterName.split(' ')[0]} motto is: "{motto}"</Text> : null}
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

    addFriends() {
        return this.props.user.mutualFriends.map(function(friend){
            return <ImageButton
                key={Math.random()}
                onPress={ (e) => {}/*this.navToProfile(e, sitterId)*/ }
                styles={styles.friendPicture}
                src={{uri: friend.picture}} />
        })
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

    openInfo(e) {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.SitterInfo({ sitter: sitter });
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sitterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    infoContainer: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    backgroundImage: {
        width: null,
        height: null,
        resizeMode:'stretch'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius:100
    },
    friendPicture: {
        width: 70,
        height: 70,
        borderRadius:100
    },
    text: {
        color: '#f7a1a1',
        fontSize: 22,
        marginTop: 10
    },
    infoText: {
        color: '#f7a1a1',
        fontSize: 16,
        marginTop: 10
    },
    personalityContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    personality: {
        color: '#f7a1a1',
        fontSize: 18
    },
    navPanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        width: '100%',
        paddingRight: 35,
        paddingLeft: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    button: {
        width: 50,
        height: 50,
        borderRadius:100
    }
});