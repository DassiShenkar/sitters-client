"use strict";

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ListItem extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        const userType = this.props.userType;
        let text = function() {
            switch(self.props.status) {
                case 'waiting': return <Text>Waiting Invitation</Text>;
                case 'accepted': return userType === "I'm a Parent" ? <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>Accepted your invite</Text> : <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>Invite accepted</Text>;
                case 'declined': return userType === "I'm a Parent" ? <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>Declied your invite</Text> : <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>Invite declied</Text>;
                default: return null;
            }
        };
        let badge = function() {
            switch(self.props.status) {
                case 'waiting': return <Text style={{padding: 4, height: 3, width: 3, borderRadius:50, backgroundColor: '#ffca00', color: '#ffca00'}}>*</Text>;
                case 'accepted': return <Text style={{padding: 4, height: 3, width: 3, borderRadius:50, backgroundColor: '#64dd17', color: '#4dd0e1'}}>*</Text>;
                case 'declined': return <Text style={{padding: 4, height: 3, width: 3, borderRadius:50, backgroundColor: '#f86966', color: '#f86966'}}>*</Text>;
                default: return null;
            }
        };
        return (
            <TouchableOpacity onPress={ () => Actions.Invite({inviteId: self.props._id}) }>
                <View style={styles.container}>
                    <Image
                        source={{ uri: userType === "I'm a Parent" ? this.props.sitterImage : this.props.parentImage }}
                        style={styles.image} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{marginTop: 20}}>
                            {badge()}
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>{ userType === "I'm a Parent" ? this.props.sitterName : this.props.parentName }</Text>
                            <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>{ text() }</Text>
                        </View>
                    </View>
                    <Text style={{fontFamily: 'OpenSans-Regular', color: '#757575'}}>{ this.props.date.slice(0, 10) }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
});