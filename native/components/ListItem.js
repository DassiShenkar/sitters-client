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
                case 'accepted': return  userType === "I'm a Parent" ? <Text>Accepted your invite</Text> : <Text>Invite accepted</Text>;
                case 'declined': return  userType === "I'm a Parent" ? <Text>Declied your invite</Text> : <Text>Invite declied</Text>;
                default: return null;
            }
        };
        return (
            <TouchableOpacity onPress={ () => Actions.Invite({inviteId: self.props._id}) }>
                <View style={styles.container}>
                    <Image
                        source={{ uri: userType === "I'm a Parent" ? this.props.sitterImage : this.props.parentImage }}
                        style={styles.image} />
                    <View>
                        <Text>{ userType === "I'm a Parent" ? this.props.sitterName : this.props.parentName }</Text>
                        <Text>{ text() }</Text>
                    </View>
                    <Text>{ this.props.date.slice(0, 10) }</Text>
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