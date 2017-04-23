"use strict";
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImageButton from '../components/ImageButton';

export default class Feed extends React.Component {

    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToRate = this.navToRate.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
    }

    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : 'https://facebook.github.io/react/img/logo_og.png';
        return (
            <View style={{ flex:1 }}>
                <Image source={{ uri: coverPhoto }} style={{flex:1, width: null, height: null, resizeMode:'stretch'}}>
                    <Text
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 40 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found' }
                    </Text>
                    <ImageButton
                        onPress={Actions.SitterProfileView}
                        styles={{width: 200, height: 200, justifyContent: 'center', borderRadius:100}}
                        src={this.props.sitters.length > 0 ? { uri: this.props.sitters[sitterIndex].profilePicture } : { uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                    <Text
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 16 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : '' }
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'center' }}>
                        <ImageButton
                            onPress={this.navToProfile}
                            styles={{ width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                        <ImageButton
                            onPress={this.navToRate}
                            styles={{width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                        <ImageButton
                            onPress={this.removeSitter}
                            styles={{width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                    </View>
                </Image>
            </View>
        );
    }

    navToProfile() {
        const sitterId = this.props.sitters[sitterIndex]._id;
        Actions.SitterSendInvite({sitterId: sitterId});
    }

    navToRate() {
        Actions.RateSitter({sitterId: this.props.sitters[sitterIndex]._id});
    }

    removeSitter() {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex +1;
        this.props.feedActions.setSitterIndex(index);
        Actions.refresh();
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});