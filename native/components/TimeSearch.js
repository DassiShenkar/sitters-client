"use strict";

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import dateFormat from 'dateformat'
import moment from "moment";
import GestureRecognizer from 'react-native-swipe-gestures';

import ImageButton from '../components/ImageButton'
import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'

export default class TimeSearch extends React.Component {


    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.nextSitter = this.nextSitter.bind(this);
        this.dateCallback = this.dateCallback.bind(this);
        this.startCallback = this.startCallback.bind(this);
        this.endCallback = this.endCallback.bind(this);
        this.filter = this.filter.bind(this);
    }

    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters[sitterIndex].profilePicture : null;
        const name = this.props.sitters.length ? this.props.sitters[sitterIndex].name : null;
        const age = this.props.sitters.length ? this.props.sitters[sitterIndex].age : null;
        const availableNow = this.props.sitters.length ? this.props.sitters[sitterIndex].availableNow : null;
        const hourFee = this.props.sitters.length ? this.props.sitters[sitterIndex].hourFee : null;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : null;
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        //TODO: add avialble now & custom radio buttons
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={(e) => this.navToInvite(e, sitterId)}
                    onSwipeRight={(e) => this.nextSitter(e)}
                    config={config}>
                    <View style={styles.searchByContainer}>
                        <View style={styles.pickerWrapper}>
                            <Text style={styles.pickerText}>Pick the Date</Text>
                            <AndroidDatePicker
                                pickerCallback={ this.dateCallback }/>
                        </View>
                        <View style={styles.pickerWrapper}>
                            <Text style={styles.pickerText}>Start Watch</Text>
                            <AndroidTimePicker
                                pickerCallback={ this.startCallback }/>
                        </View>
                        <View style={styles.pickerWrapper}>
                            <Text style={styles.pickerText}>End Watch</Text>
                            <AndroidTimePicker
                                pickerCallback={ this.endCallback }/>
                        </View>
                    </View>
                    {
                        this.props.sitters.length > 0 ?
                            <View>
                                <Image source={{uri: coverPhoto}}>
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

    navToInvite(e) {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.SitterSendInvite({ sitter: sitter });
    }

    nextSitter(e) {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.refresh();
    }

    dateCallback(value) {
        this.props.searchByActions.changeInviteDate(dateFormat(value, "mm/dd/yyyy"),dateFormat(value, "dddd"),value.toISOString());
        this.filter();
    }

    startCallback(value) {
        this.props.searchByActions.changeInviteFromTime(moment(value,"H:mm"));
        this.filter();
    }

    endCallback(value) {
        this.props.searchByActions.changeInviteToTime(moment(value,"H:mm"));
        this.filter();
    }

    filter(){
        let day = this.props.searchBy.inviteDay.toLowerCase();
        let from = this.props.searchBy.fromTime.format('H:mm');
        let to = this.props.searchBy.toTime.format('H:mm');
        let sitters = [];
        for(let sitter of this.props.feed.matches){
            let startMS = moment(sitter.workingHours[day]['start'],"HH:mm").diff(moment(from,"HH:mm"));
            let startDuration = moment.duration(startMS);
            let startDiff = Math.floor(startDuration.asHours()) + moment.utc(startMS).format(":mm");
            if(startDiff[0] === '-' || startDiff[0] === '0:00'){
                let finishMS = moment(to,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
                let finishDuration = moment.duration(finishMS);
                let finishDiff = Math.floor(finishDuration.asHours()) + moment.utc(finishMS).format(":mm");
                if(finishDiff[0] === '-'){
                    sitters.push(sitter);
                }
            }
        }
        this.props.feedActions.setFilteredMatches(sitters);
        Actions.SearchByTime();
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
        marginBottom: 70,
        marginTop: 45
    },
    pickerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    pickerText: {
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backgroundImage: {
        width: null,
        height: null,
        resizeMode:'stretch'
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
        borderRadius:100
    },
    sitterText: {
        fontSize: 18,
        margin: 5,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {width: 2, height: 2}
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
        color: '#f7a1a1'
    }
});