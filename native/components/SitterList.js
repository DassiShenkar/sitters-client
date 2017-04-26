"use strict";
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImageButton from '../components/ImageButton';

export default class Feed extends React.Component {

    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.navToRate = this.navToRate.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
    }


    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : 'https://facebook.github.io/react/img/logo_og.png';
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        alert(sitterId);
        return (
            <View style={{ flex:1 }}>
                <Image source={{ uri: coverPhoto }} style={{flex:1, width: null, height: null, resizeMode:'stretch'}}>
                    <Text
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 40, fontWeight: 'bold', marginRight: 85, marginTop: 20 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found' }
                    </Text>
                    <View style={{width: '100%',marginLeft: 80 }}>
                        <ImageButton
                            onPress={ (e) => this.navToProfile(e, sitterId) }
                            styles={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center', borderRadius:100}}
                            src={this.props.sitters.length > 0 ? { uri: this.props.sitters[sitterIndex].profilePicture } : {} } />
                    </View>
                    <Text
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 16, marginRight: 130 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : '' }
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'center' }}>
                        <ImageButton
                            onPress={ (e) => this.navToInvite(e, sitterId) }
                            styles={{ width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                        <ImageButton
                            onPress={ (e) => this.navToRate(e, sitterId) }
                            styles={{width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                        <ImageButton
                            onPress={ (e) => this.removeSitter(e) }
                            styles={{width: 50, height: 50, margin: 15}}
                            src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                    </View>
                </Image>
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite(e, sitterId) {
        Actions.SitterSendInvite({ sitterId: sitterId });
    }

    navToRate(e, sitterId) {
        Actions.RateSitter({ sitterId: sitterId });
    }

    removeSitter(e) {
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