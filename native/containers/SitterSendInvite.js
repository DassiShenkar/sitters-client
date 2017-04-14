"use strict";
import React, { Component } from 'react';
import { View, Modal, Navigator, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'

export default class SitterSendInvite extends React.Component {

    constructor (props) {
        super(props)
    }

    state = {
        modalVisible: true
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render () {
        return (
            <View style={{marginTop: 22}}>
               <Modal
                   animationType={"slide"}
                   transparent={false}
                   visible={true}
                   onRequestClose={() => {alert("Modal has been closed.")}}>
                   <Image
                       style={{width: 50, height: 50}}
                       source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   />
                   <Text>Date</Text>
                   <AndroidDatePicker />
                   <Text>Date</Text>
                   <AndroidTimePicker />
                   <Text>Location</Text>
                   <TouchableOpacity
                       onPress={this.openMap.bind(this)}>
                       <Text>Open Map</Text>
                   </TouchableOpacity>
                   <Text>Notes</Text>
                   <TextInput
                       onChangeText={(text) => this.setState({text})}
                       value='Notes' />
                   <TouchableOpacity
                       onPress={Actions.pop}>
                       <Text>Cancel</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       onPress={this.send.bind(this)}>
                       <Text>Send</Text>
                   </TouchableOpacity>
               </Modal>
            </View>
        );
    }

    send () {
        // TODO: send invaite to sitter
        Actions.pop()
    }

    openMap () {
        Actions.GoogleMapView();
        // TODO: handle location change
    }

}