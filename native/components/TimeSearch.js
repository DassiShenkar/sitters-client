"use strict";

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'

import ImageButton from '../components/ImageButton'
import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'

export default class TimeSearch extends React.Component {


    constructor (props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
    }

    render () {
        console.log(this.props.sitters);
        let sitterIndex = this.props.feed.sitterIndex;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters[sitterIndex].profilePicture : null;
        const name = this.props.sitters.length ? this.props.sitters[sitterIndex].name : null;
        const age = this.props.sitters.length ? this.props.sitters[sitterIndex].age : null;
        const availableNow = this.props.sitters.length ? this.props.sitters[sitterIndex].availableNow : null;
        const hourFee = this.props.sitters.length ? this.props.sitters[sitterIndex].hourFee : null;
        return (
            <View style={{ margin: 15, alignItems: 'center', width: '100%' }}>
                <View style={{ justifyContent: 'flex-start', marginBottom: 100 }}>
                    <View style={{ width: '80%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                        <AndroidDatePicker
                            callback={ this.dateCallback }/>
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Start Watch</Text>
                        <AndroidTimePicker
                            callback={ this.startCallback }/>
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>End Watch</Text>
                        <AndroidTimePicker
                            callback={ this.endCallback }/>
                    </View>
                </View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '70%', marginBottom: 100}}>
                    <ImageButton
                        onPress={ (e) => this.navToProfile(e, sitterId) }
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
                        onPress={ (e) => this.navToInvite(e, sitterId) }
                        styles={{ width: 50, height: 50, borderRadius:100}}
                        src={require('../style/icons/v.png')} />
                    <ImageButton
                        onPress={ (e) => this.removeSitter(e) }
                        styles={{width: 50, height: 50, borderRadius:100}}
                        src={require('../style/icons/next.png')} />
                </View>
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

    removeSitter(e) {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.refresh();
    }

    dateCallback(value) {
        this.props.searchByActions.changeInviteDate(value);
        this.filter();
    }

    startCallback(value) {
        this.props.searchByActions.changeInviteFromTime(value);
        this.filter();
    }

    endCallback(value) {
        this.props.searchByActions.changeInviteToTime(value);
        this.filter();
    }

    filter(value) {
        console.log(Math.abs(value));
        let sitters = this.props.feed.matches;
        this.props.feedActions.setFilteredMatches(sitters.filter(sitter => sitter.hourFee >= 1 && sitter.hourFee <= Math.abs(value)));
        Actions.refresh();
    }
}