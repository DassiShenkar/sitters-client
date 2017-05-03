import Geocoder from 'react-native-geocoding';

class GeoCoder {
    static getLatLng(location) {
        Geocoder.setApiKey('AIzaSyBkehiU2z9ie_W9tqcEW_i-YBKxxv9kwyE');
        Geocoder.getFromLocation(location).then(
            json => {
                var location = json.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lng: location.lng
                }
            },
            error => {
                console.log(error);
                return null;
            }
        );
    }
}

export default GeoCoder;
