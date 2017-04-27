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
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : null;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        console.log(sitterId);
        return (
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: coverPhoto }} style={{width: null, height: null, resizeMode:'stretch'}}>
                    <Text
                        style={{color: '#fff', fontSize: 40, fontWeight: 'bold', marginTop: 20 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found' }
                    </Text>
                    <View style={{width: '100%',marginTop:30 }}>
                        <ImageButton
                            onPress={ (e) => this.navToProfile(e, sitterId) }
                            styles={{width: 200, height: 200, borderRadius:100}}
                            src={this.props.sitters.length > 0 ? { uri: this.props.sitters[sitterIndex].profilePicture } : {} } />
                    </View>
                    <Text
                        style={{color: '#fff', fontSize: 22, marginTop: 20 }}>
                        { this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : '' }
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', width: 200, justifyContent: 'space-between', marginTop: 100 }}>
                        <ImageButton
                            onPress={ (e) => this.navToInvite(e, sitterId) }
                            styles={{ width: 50, height: 50, borderRadius:100}}
                            src={require('../style/icons/v.png')} />
                        <ImageButton
                            onPress={ (e) => this.navToRate(e, sitterId) }
                            styles={{width: 50, height: 50, borderRadius:100}}
                            src={require('../style/icons/star.png')} />
                        <ImageButton
                            onPress={ (e) => this.removeSitter(e) }
                            styles={{width: 50, height: 50, borderRadius:100}}
                            src={require('../style/icons/next.png')} />
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