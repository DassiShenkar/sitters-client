"use strict"
import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';

class SitterInfo extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={true}
                onRequestClose={() => {Actions.pop()}}>
                <View style={styles.container}>
                    <GestureRecognizer
                        onSwipeDown={Actions.pop}
                        config={config}>
                        <View style={styles.innerContainer}>
                        </View>
                    </GestureRecognizer>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20
    }
});

export default SitterInfo;
