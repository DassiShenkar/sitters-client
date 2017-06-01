"use strict";
import React, { Component } from 'react';
import { View, Modal, Image, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as _ from "lodash";
import MapView from 'react-native-maps';

import TextButton from '../components/TextButton'
import * as SitterProfileActions from '../../src/actions/SitterProfileActions';
import * as InviteActions from '../../src/actions/InviteActions';
import * as actionCreators from '../../src/actions/actionCreators';
import * as RouterActions from '../actions/RouterActions';

class Invite extends React.Component {

    constructor (props) {
        super(props);
        this.updateInvite = this.updateInvite.bind(this);
    }

    // <Button title="Accept" onClick={this.changeInviteStatus.bind(this, invite, "accepted")} >Accept</Button>
    // <Button title="Decline" onClick={this.changeInviteStatus.bind(this, invite, "declined")} >Declined</Button>

    // componentWillMount(){
    //     const inviteID = this.props.router.params.inviteId;
    //     let user = this.props.user;
    //     const  inviteIndex = _.findIndex(user.invites, function(o) { return o._id === inviteID; });
    //
    //     const shouldUpdate = !!((user.isParent && user.invites[inviteIndex].status !== "waiting" && !user.invites[inviteIndex].wasRead)
    //     || (!user.isParent && user.invites[inviteIndex].status === "waiting" && !user.invites[inviteIndex].wasRead));
    //
    //     if(shouldUpdate){
    //         user.invites[inviteIndex].wasRead = true;
    //         this.updateInvite(user)
    //     }
    // }

    updateInvite(user, invite){
        const self = this;
        this.props.inviteActions.setInvites(user.invites);
        const path = this.props.user.isParent ? 'parent/update': 'sitter/update';
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/'+ path,
            url: 'https://sittersdev.herokuapp.com/'+ path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
        }).then(function (res) {
            if (res.data) {  // user created

            }
            else {
                console.log("settings not updated");
                //TODO: think about error
            }
        })
            .catch(function (error) {
                alert(error);
                //TODO: think about error
            });
        if(!user.isParent && invite){
            axios({
                method: 'post',
                // url: 'https://sitters-server.herokuapp.com/user/getUser',
                url: 'https://sittersdev.herokuapp.com/user/getUser',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: invite.parentID}
            })
                .then(function (response) {
                    if (response.data) {  // user exists
                        let parent = response.data;
                        const  inviteIndex = _.findIndex(parent.invites, function(o) { return o._id === invite._id; });
                        parent.invites[inviteIndex] = invite;
                        parent.invites[inviteIndex].wasRead = false;
                        axios({
                            method: 'post',
                            // url: 'https://sitters-server.herokuapp.com/parent/update',
                            url: 'https://sittersdev.herokuapp.com/parent/update',
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: parent
                        }).then(function (res) {
                            if (res.data) {  // user created
                                // self.props.router.push('/');
                            }
                            else {
                                console.log("settings not updated");
                                //TODO: think about error
                            }
                        })
                            .catch(function (error) {
                                alert(error);
                                //TODO: think about error
                            });
                    }
                    else { // user not exist

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    changeInviteStatus(invite, status){

        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function(o) { return o._id === invite._id; });
        user.invites[inviteIndex].status = status;
        this.updateInvite(user, invite);
        // this.props.router.push('/');
    }

    render () {
        const user = this.props.user;
        const initialRegion = {
            latitude: user.address.latitude != 0 ? user.address.latitude : 32.0853,
            longitude: user.address.longitude != 0 ? user.address.longitude : 34.7818,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
        const inviteID = this.props.inviteId;
        console.log(inviteID);
        const invite = this.props.user.invites.filter((invite) => invite._id === inviteID)[0];
        console.log(invite);
        const profilePicture = invite ? invite.parentImage : null;
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
                            <Text style={styles.pickerText}>{invite.date ? invite.date.slice(0, 10) : null}</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>Start Watch</Text>
                            <Text style={styles.pickerText}>{invite.startTime ? invite.startTime : null}</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>End Watch</Text>
                            <Text style={styles.pickerText}>{invite.endTime ? invite.endTime : null}</Text>
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
                        <Text style={styles.notesText}>{invite.notes}</Text>
                        {
                            !this.props.user.isParent && invite.status === 'waiting' ?
                            <View style={styles.actionBar}>
                                <TextButton
                                    onPress={this.changeInviteStatus.bind(this, invite, "declined")}
                                    styles={styles.button}
                                    text='Decline'/>
                                <TextButton
                                    onPress={this.changeInviteStatus.bind(this, invite, "accepted")}
                                    styles={styles.button}
                                    text='Accept'/>
                            </View> :
                            <View style={styles.actionBar}>
                                <TextButton
                                    onPress={Actions.pop}
                                    styles={styles.button}
                                    text='Cancel'/>
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        );
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
        flexDirection: 'row',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
