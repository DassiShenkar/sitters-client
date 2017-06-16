"use strict";
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        this.shouldReview = this.shouldReview.bind(this);
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
                return <Text key={Math.random()} style={styles.personality}>{word}</Text>;
            })
            : null : null;
        let friends = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].friends : null;
        let friendCount = this.props.sitters.length ? friends.length : 0;
        console.log(friends);
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
                    <Image source={{uri: coverPhoto}} style={styles.backgroundImage}>
                        <View style={styles.sitterContainer}>
                            <View style={styles.backgroundCircle}>
                                <ImageButton
                                    onPress={ (e) => this.navToProfile(e, sitterId) }
                                    styles={styles.profilePicture}
                                    src={ profilePicture } />
                            </View>
                            <Text style={styles.sitterName}>{ sitterName }</Text>
                        </View>
                    </Image>
                    <View style={styles.infoContainer}>
                        {
                            friendCount ? friendCount > 0 ?
                            <View>
                                <Text style={styles.infoText}>MUTUAL FRIENDS ({friendCount})</Text>
                                <View style={{ flexDirection: 'row' }}>{this.addFriends()}</View>
                            </View> : null  : null
                        }
                        {
                            motto ?
                                <View>
                                    <Text style={styles.infoText}>MOTTO</Text>
                                    <Text style={styles.mottoText}>"{motto}"</Text>
                                </View> : null
                        }
                        {
                            personality ?
                                <View style={styles.personalityContainer}>
                                    <Text style={styles.infoText}>PERSONALITY</Text>
                                    <View style={styles.personalityRow}>
                                        <View style={styles.personalityColumn}>
                                            {personality[0]}
                                            {personality[1]}
                                            {personality[2]}
                                        </View>
                                        <View style={styles.personalityColumn}>
                                            {personality[3]}
                                            {personality[4]}
                                            {personality[5]}
                                        </View>
                                    </View>
                                </View> : null
                        }
                    </View>
                    <View style={styles.navPanel}>
                        <Icon.Button name="envelope" size={48} backgroundColor="#fff" color="#8c8c8c" onPress={(e) => this.navToInvite(e, sitterId)} />
                        {
                            this.props.sitters.length ? this.shouldReview() ?
                                <Icon.Button name="heart" size={48} backgroundColor="#fff" color="#8c8c8c" onPress={(e) => this.navToRate(e, sitterId)} /> : null : null
                        }
                        <Icon.Button name="remove" size={48} backgroundColor="#fff" color="#8c8c8c" onPress={(e) => this.nextSitter(e, sitterId)} />
                    </View>
                </GestureRecognizer>
            </View>
        );
    }

    addFriends() {
        let sitterIndex = this.props.feed.sitterIndex;
        let i = 0;
        return this.props.sitters[sitterIndex].friends.map(function(friend){
            if(i > 3){
                return null
            } else {
                i++;
                return (
                    <View key={Math.random()} style={styles.friend}>
                        <Image
                        key={Math.random()}
                        style={styles.friendPicture}
                        source={{uri: friend.picture}}/>
                        <Text key={Math.random()} style={styles.friendText}>{friend.name.length <= 11 ? friend.name : friend.name.slice(0, 8) + '...'}</Text>
                    </View>
                );
            }
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

    shouldReview() {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        return this.props.user.invites.find(invite => {
            return invite.sitterID === sitter._id;
        })
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
        padding: 20
    },
    infoContainer: {
        width: '100%',
        padding: 15
    },
    backgroundCircle: {
        width: 110,
        height: 110,
        borderRadius:100,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius:100,
        alignSelf: 'center'
    },
    friendPicture: {
        width: 40,
        height: 40,
        borderRadius:100
    },
    text: {
        color: '#f7a1a1',
        fontSize: 22,
        marginTop: 10
    },
    friendText: {
        color: '#f7a1a1',
        fontSize: 14,
        marginTop: 3
    },
    friend: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 5
    },
    sitterName: {
        color: '#fff',
        fontSize: 24,
        textShadowColor: '#000',
        textShadowOffset: {width: 2, height: 2}
    },
    infoText: {
        alignSelf: 'center',
        color: '#f7a1a1',
        fontSize: 16,
        marginTop: 5
    },
    mottoText: {
        fontFamily: 'PoiretOne',
        alignSelf: 'center',
        color: '#f7a1a1',
        fontSize: 22,
        marginTop: 3
    },
    personalityContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between'
    },
    personalityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    personalityColumn: {
        padding: 10
    },
    personality: {
        alignSelf: 'center',
        color: '#fff',
        padding: 3,
        margin: 3,
        backgroundColor: '#f7a1a1',
        fontSize: 18,
        width: 130,
        borderRadius: 10
    },
    navPanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        paddingRight: 35,
        paddingLeft: 35
    },
    button: {
        fontFamily: 'icons',
        width: 50,
        height: 50,
        borderRadius:100
    }
});