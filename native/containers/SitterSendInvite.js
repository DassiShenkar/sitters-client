"use strict";
import React, { Component } from 'react';
import { View, Modal, Navigator, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid';
import MapView from 'react-native-maps';

import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'
import TextButton from '../components/TextButton'
import * as SitterProfileActions from '../../src/actions/SitterProfileActions';
import * as InviteActions from '../../src/actions/InviteActions';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RouterActions from '../actions/RouterActions';

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
            // url: 'https://sitters-server.herokuapp.com/invite/create',
            url: 'https://sittersdev.herokuapp.com/invite/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: invite
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // invite created
                self.props.routerActions.changeValidFlag(true);
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
        const user = this.props.user;
        const initialRegion = {
            latitude: user.address.latitude != 0 ? user.address.latitude : 32.0853,
            longitude: user.address.longitude != 0 ? user.address.longitude : 34.7818,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
        return (
           <Modal
               animationType={"fade"}
               transparent={true}
               visible={true}
               onRequestClose={() => {Actions.pop()}}>
               <View style={styles.container}>
                   <View style={styles.innerContainer}>
                       <Image
                           style={styles.profilePicture}
                           source={{uri: profilePicture}}
                       />
                       <View style={styles.pickerContainer}>
                           <Text style={styles.pickerText}>Date</Text>
                           <AndroidDatePicker
                                callback={ this.dateCallback }/>
                       </View>
                       <View style={styles.pickerContainer}>
                           <Text style={styles.pickerText}>Start Watch</Text>
                           <AndroidTimePicker
                               callback={ this.startCallback }/>
                       </View>
                       <View style={styles.pickerContainer}>
                           <Text style={styles.pickerText}>End Watch</Text>
                           <AndroidTimePicker
                               callback={ this.endCallback }/>
                       </View>
                       <View style={styles.locationContainer}>
                           <Text style={styles.locationText}>Watch Place: </Text>
                           <View style={styles.mapContainer}>
                               <View style={styles.innerMapContainer}>
                                   <MapView
                                       style={styles.map}
                                       provider={"google"}
                                       initialRegion={initialRegion}
                                       loadingEnabled={true}
                                       loadingIndicatorColor={'#f7a1a1'}>
                                       <MapView.Marker
                                           key={Math.random()}
                                           style={styles.marker}
                                           coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} >
                                           <Image key={Math.random()} source={{ uri: user.profilePicture }} style={styles.mapImage} />
                                       </MapView.Marker>
                                   </MapView>
                               </View>
                           </View>
                       </View>
                       <Text style={styles.notesText}>Notes</Text>
                       <TextInput
                           style={styles.textInput}
                           onChangeText={(text) => this.props.inviteActions.setNotes(text)}
                           placeHolder='Notes' />
                       <View style={styles.actionBar}>
                           <TextButton
                               onPress={Actions.pop}
                               styles={styles.button}
                               text='Cancel' />
                           <TextButton
                               onPress={this.sendInvite}
                               styles={styles.button}
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
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    innerContainer:{
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '85%',
        margin: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20
    },
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginBottom: 15
    },
    pickerContainer: {
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    pickerText: {
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    locationContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 30,
        height: 150
    },
    locationText: {
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    mapContainer: {
        alignItems: 'center',
        width: '100%'
    },
    innerMapContainer: {
        width: '100%',
        height: 150,
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    marker: {
        width: 40,
        height: 40
    },
    mapImage: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    notesText: {
        width: '100%',
        justifyContent: 'flex-start',
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInput: {
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 15
    },
    actionBar: {
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    button: {
        fontSize: 20,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10
    }
});

function mapStateToProps(state) {
    return {
        sitterProfile: state.sitterProfile,
        invite: state.invite,
        user: state.user,
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
        inviteActions: bindActionCreators(InviteActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterSendInvite);

// <TextButton
//     onPress={this.openMap}
//     text='Open Map' />