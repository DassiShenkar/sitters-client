"use strict";
import React, { Component } from 'react';
import { View, Modal, Navigator, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid';

import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'
import TextButton from '../components/TextButton'
import * as SitterProfileActions from '../../src/actions/SitterProfileActions';
import * as InviteActions from '../../src/actions/InviteActions';
import * as actionCreators from '../../src/actions/actionCreators';

class SitterSendInvite extends React.Component {

    constructor (props) {
        super(props);
        // this.openMap = this.openMap.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
        this.dateCallback = this.dateCallback.bind(this);
        this.startCallback = this.startCallback.bind(this);
        this.endCallback = this.endCallback.bind(this);
    }

    sendInvite(e) {
        e.preventDefault();
        let invite = {
            _id: uuid.v1(),
            address:    {
                city: this.props.user.address.city,
                street: this.props.user.address.street,
                houseNumber: this.props.user.address.houseNumber
            },
            // startTime:  this.props.invite.fromTime.format('HH:mm'),
            // endTime:    this.props.invite.toTime.format('HH:mm'),
            startTime:  this.props.invite.fromTime,
            endTime:    this.props.invite.toTime,
            date:       this.props.invite.inviteDate,
            status:     "waiting",
            wasRead: false,
            sitterID:   this.props.sitter._id.toString(),
            parentID:   this.props.user._id.toString(),
            notes: this.props.invite.notes? this.props.invite.notes: "",
            sitterName: this.props.sitter.name,
            sitterImage: this.props.sitter.profilePicture
        };
        console.log(invite);
        let self = this;
        axios({
            method: 'post',
            url: 'https://sittersdev.herokuapp.com/invite/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: invite
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // invite created
                Actions.pop();
            }
            else { // invite not created
                console.log(error);
                //TODO: think about error when user not created
            }
        })
            .catch(function (error) {
                console.log(error);
                Actions.pop();
                Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
                //TODO: think about error when user not created
            });
    };

    render () {
        const profilePicture = this.props.sitter ? this.props.sitter.profilePicture : null;
        return (
           <Modal
               animationType={"fade"}
               transparent={true}
               visible={true}
               onRequestClose={() => {Actions.pop()}}>
               <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                   <View style={
                        {
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '80%',
                            height: '70%',
                            margin: 15,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderRadius: 20
                        }}>
                       <Image
                           style={{width: 70, height: 70, borderRadius: 100, marginBottom: 15}}
                           source={{uri: profilePicture}}
                       />
                       <View style={{ width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                           <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                           <AndroidDatePicker
                                callback={ this.dateCallback }/>
                       </View>
                       <View style={{ width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                           <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Start Watch</Text>
                           <AndroidTimePicker
                               callback={ this.startCallback }/>
                       </View>
                       <View style={{ width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                           <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>End Watch</Text>
                           <AndroidTimePicker
                               callback={ this.endCallback }/>
                       </View>
                       <View style={{ width: '100%', justifyContent: 'flex-start', marginBottom: 15 }}>
                           <Text style={{ color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Watch Place: </Text>
                           <Text>{ this.props.user.address ? this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : '' }</Text>
                       </View>
                       <Text style={{ width: '100%', justifyContent: 'flex-start', color: '#f7a1a1', fontSize: 16, fontWeight: 'bold' }}>Notes</Text>
                       <TextInput
                           style={{  width: '100%', justifyContent: 'flex-start', marginBottom: 15 }}
                           onChangeText={(text) => this.props.inviteActions.setNotes(text)}
                           placeHolder='Notes' />
                       <View style={{ width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                           <TextButton
                               onPress={Actions.pop}
                               styles={{ fontSize: 20, marginBottom: 10, backgroundColor: '#f7a1a1', color: '#fff', padding: 5, borderRadius: 10 }}
                               text='Cancel' />
                           <TextButton
                               onPress={this.sendInvite}
                               styles={{ fontSize: 20, backgroundColor: '#f7a1a1', color: '#fff', padding: 5, borderRadius: 10 }}
                               text='Send' />
                       </View>
                   </View>
               </View>
           </Modal>
        );
    }

    dateCallback(data) {
        this.props.inviteActions.changeInviteDate(data);
    }

    startCallback(data) {
        this.props.inviteActions.changeInviteFromTime(data);
    }

    endCallback(data) {
        this.props.inviteActions.changeInviteToTime(data);
    }

    // openMap () {
    //     Actions.GoogleMapView();
    //     // TODO: handle location change
    // }

}

function mapStateToProps(state) {
    return {
        sitterProfile: state.sitterProfile,
        invite: state.invite,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
        inviteActions: bindActionCreators(InviteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterSendInvite);

// <TextButton
//     onPress={this.openMap}
//     text='Open Map' />