"use strict";
import React, { Component } from 'react';
import { View, Modal, Navigator, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AndroidDatePicker from '../components/AndroidDatePicker'
import AndroidTimePicker from '../components/AndroidTimePicker'
import TextButton from '../components/TextButton'

export default class SitterSendInvite extends React.Component {

    constructor (props) {
        super(props)
        this.openMap = this.openMap.bind(this);
        this.send = this.send.bind(this);
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
                   onRequestClose={() => {Actions.pop()}}>
                   <Image
                       style={{width: 50, height: 50}}
                       source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   />
                   <Text>Date</Text>
                   <AndroidDatePicker />
                   <Text>Date</Text>
                   <AndroidTimePicker />
                   <Text>Location</Text>
                   <TextButton
                       onPress={this.openMap}
                       text='Open Map' />
                   <Text>Notes</Text>
                   <TextInput
                       onChangeText={(text) => this.setState({text})}
                       value='Notes' />
                   <TextButton
                       onPress={Actions.pop}
                       text='Cancel' />
                   <TextButton
                       onPress={this.send}
                       text='Send' />
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