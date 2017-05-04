"use strict";

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'
import dateFormat from 'dateformat'
import moment from "moment";

import ImageButton from '../components/ImageButton'
import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'

export default class TimeSearch extends React.Component {


    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
        this.dateCallback = this.dateCallback.bind(this);
        this.startCallback = this.startCallback.bind(this);
        this.endCallback = this.endCallback.bind(this);
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
                            pickerCallback={ this.dateCallback }/>
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Start Watch</Text>
                        <AndroidTimePicker
                            pickerCallback={ this.startCallback }/>
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                        <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>End Watch</Text>
                        <AndroidTimePicker
                            pickerCallback={ this.endCallback }/>
                    </View>
                </View>
                { this.props.sitters.length > 0 ?
                    <View>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '70%', marginBottom: 100}}>
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
                                onPress={ (e) => {this.navToInvite()} }
                                styles={{ width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/v.png')}/>
                            <ImageButton
                                onPress={ (e) => {this.removeSitter()} }
                                styles={{width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/next.png')}/>
                        </View>
                    </View>
                    : <Text>No matches found!</Text>
                }
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
        console.log(value);
        console.log(dateFormat(value, "dddd"));
        console.log(value);
        this.props.searchByActions.changeInviteDate(dateFormat(value, "mm/dd/yyyy"),dateFormat(value, "dddd"),value.toISOString());
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

    startCallback(value) {
        console.log(value);
        this.props.searchByActions.changeInviteFromTime(moment(value,"H:mm"));
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

    endCallback(value) {
        console.log(value);
        this.props.searchByActions.changeInviteToTime(moment(value,"H:mm"));
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