"use strict";

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Slider } from 'react-native';
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps';

import ImageButton from '../components/ImageButton'

export default class LocationSearch extends React.Component {


    constructor (props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
    }

    render () {
        const self = this;
        console.log(this.props.sitters);
        let sitterIndex = this.props.feed.sitterIndex;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters[sitterIndex].profilePicture : null;
        const name = this.props.sitters.length ? this.props.sitters[sitterIndex].name : null;
        const age = this.props.sitters.length ? this.props.sitters[sitterIndex].age : null;
        const availableNow = this.props.sitters.length ? this.props.sitters[sitterIndex].availableNow : null;
        const hourFee = this.props.sitters.length ? this.props.sitters[sitterIndex].hourFee : null;
        let value = typeof this.props.searchBy.priceMaxRange === "undefined" ? 100 : this.props.searchBy.priceMaxRange;
        return (
            <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={{ width: '100%', height: 500, ...StyleSheet.absoluteFillObject }}>
                    <MapView
                        style={{ ...StyleSheet.absoluteFillObject }}
                        initialRegion={{
                            latitude: 32.0853,
                            longitude: 34.7818,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}>
                        {self.props.sitters.map(sitter => (
                            <MapView.Marker key={Math.random()} onPress={ () => {self.navToInvite(sitter)} } style={{ width: 40, height: 40}} coordinate={{ latitude: sitter.address.latitude, longitude: sitter.address.longitude }}>
                                <ImageButton key={Math.random()} src={{ uri: sitter.profilePicture }} styles={{ width: 40, height: 40, borderRadius: 100 }} onPress={ (e) => this.navToInvite } />
                            </MapView.Marker>
                        ))}
                    </MapView>
                </View>
                {/* this.props.sitters.length > 0 ?
                    <View style={{ marginTop: 250 }}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '70%', marginBottom: 50}}>
                            <ImageButton
                                onPress={ (e) => {this.navToProfile(e, sitterId)} }
                                styles={{width: 100, height: 100, borderRadius:100}}
                                src={this.props.sitters.length > 0 ? { uri: profilePicture } : {} } />
                            <View style={{ paddingTop: 10 }}>
                                <Text>{name + ', ' + age}</Text>
                                { availableNow ? <Text>Available now!</Text> : null}
                                <Text>{ hourFee + '$' }</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '50%'}}>
                            <ImageButton
                                onPress={ (e) => this.navToInvite }
                                styles={{ width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/v.png')}/>
                            <ImageButton
                                onPress={ (e) => this.removeSitter }
                                styles={{width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/next.png')}/>
                        </View>
                    </View>
                    : <Text>No matches found!</Text>
                */}
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite(sitter) {
        // let sitterIndex = this.props.feed.sitterIndex;
        // let sitter = this.props.sitters[sitterIndex];
        Actions.SitterSendInvite({ sitter: sitter });
    }

    removeSitter(e) {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.refresh();
    }

    filter(value) {
        console.log(Math.abs(value));
        let sitters = this.props.feed.matches;
        this.props.rangeActions.changeRange(1, Math.abs(value));
        this.props.feedActions.setFilteredMatches(sitters.filter(sitter => sitter.hourFee >= 1 && sitter.hourFee <= Math.abs(value)));
        Actions.refresh();
    }
}