"use strict";
import React, { Component } from 'react';
import { View, Modal, Navigator, Image, Text, TextInput, TouchableOpacity } from 'react-native';
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
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator} />
        );
    }

    renderScene () {
        return (
            <View style={{marginTop: 22}}>
               <Modal
                   animationType={"slide"}
                   transparent={false}
                   visible={this.state.modalVisible}
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
                       onPress={this.cancel.bind(this)}>
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
        this.props.navigator.pop();
    }

    cancel () {
        this.props.navigator.pop();
    }

    openMap () {
        var id = 'GoogleMapView';
        // TODO: add user to DB
        var navObj = {
            id: id,
            passProps: {
                userType: 'Parent'
            },
            type: 'NORMAL'
        };
        this.props.navigator.push(navObj);
    }

}