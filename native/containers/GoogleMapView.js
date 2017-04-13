import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class GoogleMapView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={StyleSheet.absoluteFill}
                    contentContainerStyle={styles.scrollview}
                >
                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        initialRegion={this.state.region}
                    >
                        <MapView.Marker
                            title="This is a title"
                            description="This is a description"
                            coordinate={this.state.region}
                        />
                    </MapView>
                </ScrollView>
            </View>
        );
    }
}

GoogleMapView.propTypes = {
    provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    scrollview: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    map: {
        width: 250,
        height: 250,
    },
});
