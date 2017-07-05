"use strict";

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux'
import dateFormat from 'dateformat'
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as _ from "lodash";

import ImageButton from '../components/ImageButton'
import AndroidDatePicker from '../components/AndroidDatePicker'
import MyMultiSelect from './MyMultiSelect'
import strings from '../../src/static/strings';


export default class TimeSearch extends React.Component {


    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.nextSitter = this.nextSitter.bind(this);
        this.dateCallback = this.dateCallback.bind(this);
        this.filter = this.filter.bind(this);
        this.changeAvailability = this.changeAvailability.bind(this);
        this.hoursChecked = this.hoursChecked.bind(this);
        this.removeHours = this.removeHours.bind(this);
    }

    render () {
        const sitterIndex = this.props.feed.sitterIndex ? this.props.feed.sitterIndex : 0;
        const sitterId = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex]._id : 0 : 0 : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].profilePicture : null : null : null;
        const name = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].name : null : null : null;
        const age = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].age : null : null: null;
        const availableNow = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].availableNow : null : null : null;
        const hourFee = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].hourFee : null : null : null;
        const coverPhoto = this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] ? this.props.sitters[sitterIndex].coverPhoto : null : null : null;
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={this.navToInvite}
                    onSwipeRight={this.nextSitter}
                    config={config}>
                    <Picker
                        style={styles.picker}
                        selectedValue={ this.props.searchBy.availability ?  this.props.searchBy.availability: strings.AVAILABILITY[0] }
                        onValueChange={(availability) => { this.changeAvailability(availability) }}>
                        <Picker.Item label={ strings.AVAILABILITY[1] } value={ strings.AVAILABILITY[1] }/>
                        <Picker.Item label={ strings.AVAILABILITY[0] } value={ strings.AVAILABILITY[0] }/>
                    </Picker>
                    {
                        this.props.searchBy.availability ?  this.props.searchBy.availability === strings.AVAILABILITY[1] ?
                        <View style={styles.searchByContainer}>
                            <View style={styles.pickerWrapper}>
                                <Text style={styles.pickerText}>Pick the Date</Text>
                                <AndroidDatePicker
                                    pickerCallback={ this.dateCallback }/>
                            </View>
                            <View style={styles.pickerWrapperColumn}>
                            <Text style={styles.pickerText}>Pick the Time</Text>
                                <MyMultiSelect
                                    style={{ marginBottom: 10 }}
                                    items={strings.HOURS}
                                    selected={this.props.searchBy.workingHours ? this.props.searchBy.workingHours : []}
                                    update={this.hoursChecked}
                                    remove={this.removeHours} />
                            </View>
                        </View> : <View style={styles.dummy} /> : <View style={styles.dummy} />
                    }
                    {
                        this.props.sitters.length > 0 ?
                            <View>
                                <Image source={{uri: coverPhoto}}>
                                    <View style={styles.backgroundImage}>
                                        <View style={styles.feedContainer}>
                                            <View style={styles.backgroundCircle}>
                                                <ImageButton
                                                    onPress={ (e) => {this.navToProfile(e, sitterId)} }
                                                    styles={styles.sitterImage}
                                                    src={this.props.sitters.length > 0 ? { uri: profilePicture } : {} } />
                                            </View>
                                            <View style={styles.feedTextView}>
                                                <Text style={styles.sitterText}>{name + ', ' + age}</Text>
                                                { availableNow ? <Text style={styles.sitterText}>Available now!</Text> : null}
                                                <Text style={styles.sitterText}>{ hourFee + '$' }</Text>
                                            </View>
                                        </View>
                                        <View style={styles.feedButtons}>
                                            <Icon.Button name="envelope" size={48} backgroundColor="rgba(0, 0, 0, 0)" color="#ffca00" onPress={this.navToInvite} />
                                            <Icon.Button name="remove" size={48} backgroundColor="rgba(0, 0, 0, 0)" color="#4dd0e1" onPress={this.nextSitter} />
                                        </View>
                                    </View>
                                </Image>
                            </View>
                            : <Text style={styles.notFoundText}>No matches found!</Text>
                    }
                </GestureRecognizer>
            </View>
        );
    }

    hoursChecked(selected) {
        let expertise = this.props.searchBy.workingHours ? this.props.searchBy.workingHours : [];
        let select = [];
        selected.map(function(item){
            select.push(item.name);
        });
        let array = [...select, ...expertise];
        this.props.searchByActions.changeWorkingHours(array);
        this.filter();
    }

    removeHours(removed) {
        let expertise = this.props.searchBy.workingHours ? this.props.searchBy.workingHours : [];
        let array =  expertise.filter(function(el) {
            return el !== removed;
        });
        this.props.searchByActions.changeWorkingHours(array);
        this.filter();
    }

    changeAvailability(availability) {
        this.props.searchByActions.changeAvailability(availability);
        if(availability === strings.AVAILABILITY[0]) {
            Actions.SearchByTime({newSearch: true});
        }
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite() {
        let sitterIndex = this.props.feed.sitterIndex ? this.props.feed.sitterIndex : 0;
        let sitter =  this.props.sitters.length ? this.props.sitters.length > 0 ? this.props.sitters[sitterIndex] : 0 : 0;
        Actions.SitterSendInvite({ sitter: sitter });
    }

    nextSitter() {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.SearchByTime({active: 2});
    }

    dateCallback(value) {
        this.props.searchByActions.changeInviteDate(dateFormat(value, "mm/dd/yyyy"),dateFormat(value, "dddd"),value.toISOString());
    }

    filter(){
        let day = this.props.searchBy.inviteDay ? this.props.searchBy.inviteDay.toLowerCase() : null;
        let newValue = this.props.searchBy.workingHours ? this.props.searchBy.workingHours : [];
        if(this.props.sitters){
            let sitters = [];
            for(let sitter of this.props.feed.matches){
                let sameHours = _.intersection(newValue, sitter.workingHours[day.toLowerCase()]);
                if(sameHours.length > 0)
                    sitters.push(sitter);
            }
            this.props.feedActions.setFilteredMatches(sitters);
        }
        this.props.feedActions.setSitterIndex(0);
        Actions.SearchByTime({newSearch: false, active: 2});
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
        marginBottom: 55
    },
    dummy:{
        height: 160
    },
    pickerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    pickerWrapperColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5
    },
    pickerText: {
        color: '#f86966',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight: 'bold'
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
        borderRadius:100,
        alignSelf: 'center'
    },
    backgroundCircle: {
        width: 110,
        height: 110,
        borderRadius:100,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    sitterText: {
        fontSize: 18,
        margin: 5,
        color: '#fff',
        fontFamily: 'Raleway-Regular'
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
    picker: {
        width: 150,
        marginLeft: 5,
        alignSelf : 'flex-start'
    },
    notFoundText: {
        width: '100%',
        fontSize: 22,
        paddingLeft: 80,
        paddingTop: 50,
        fontFamily: 'OpenSans-Regular',
        color: '#f86966'
    },
    backgroundImage: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});