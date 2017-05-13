"use strict";

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps';

class LocationSearch extends React.Component {


    constructor (props) {
        super(props);
        this.navToProfile = this.navToProfile.bind(this);
    }

    render () {
        const self = this;
        const initialRegion = {
            latitude: 32.0853,
            longitude: 34.7818,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <MapView
                        style={styles.map}
                        provider={"google"}
                        initialRegion={initialRegion}
                        loadingEnabled={true}
                        loadingIndicatorColor={'#f7a1a1'}>
                        {self.props.sitters.map(sitter => (
                            <MapView.Marker
                                key={Math.random()}
                                onPress={ () => {self.navToProfile(sitter)} }
                                style={styles.marker}
                                coordinate={{ latitude: sitter.address.latitude, longitude: sitter.address.longitude }} >
                                <Image key={Math.random()} source={{ uri: sitter.profilePicture }} style={styles.image} />
                            </MapView.Marker>
                        ))}
                    </MapView>
                </View>
            </View>
        );
    }

    navToProfile(sitter) {
        Actions.SitterProfileView({ sitterId: sitter._id });
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },
    innerContainer: {
        width: '100%',
        height: 500,
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    marker: {
        width: 40,
        height: 40
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100
    }
});

export default LocationSearch;