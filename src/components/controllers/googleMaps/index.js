import React, {PropTypes} from "react"
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import geodist from "geodist";
import './style.css'

const MY_API_KEY = "AIzaSyDHmEuwmAbej_-gf6v_-ujdAS8B5fOOlX0";

class Map extends React.Component {
    render(){
        const self = this;
        let coords;
        if(this.props.oneMarker){
            coords = this.props.sitters.map((parent, index) => ({
                    title: parent.name,
                    position: {
                        lat: parent.address.latitude,
                        lng: parent.address.longitude,
                    },
                    onLoaded: (googleMaps, map, marker) => {
                        // Set Marker animation
                        marker.setAnimation(googleMaps.Animation.BOUNCE);
                        const address = parent.address.street + " " + parent.address.houseNumber + ", " + parent.address.city;
                        const infoWindow = new googleMaps.InfoWindow({
                            content: ` <div>
                        <h3>` + parent.name + `</h3>
                            <Image class="info-window-img" src='` + parent.profilePicture + `' circle/>
                            <p>` + address + `</p>
                    </div>`
                        });
                        infoWindow.open(map, marker); // open info window by default
                    }
                })
            );

        }
        else{
            coords = this.props.sitters.map((sitter, index) => ({
                    title: sitter.name,
                    position: {
                        lat: sitter.address.latitude,
                        lng: sitter.address.longitude,
                    },
                    onLoaded: (googleMaps, map, marker) => {
                        // Set Marker animation
                        marker.setAnimation(googleMaps.Animation.BOUNCE);
                        const sitterProfileURL = "/sitter/" + sitter._id;
                        const distance = geodist({lat: self.props.center.lat, lon: self.props.center.lng}, {lat: sitter.address.latitude, lon: sitter.address.longitude},{ unit: 'km'});

                        const infoWindow = new googleMaps.InfoWindow({
                            content: ` <div>
                        <h3>` + sitter.name + `</h3>
                            <Image class="info-window-img" src='` + sitter.profilePicture + `' circle/>
                            <p>Motto: ` + sitter.motto + `</p>
                            <p>Last Invite: ` + sitter.lastInvite + `</p>
                            <p>Distance: `+ distance + ` KM</p>
                            <p>Hour Fee: ` + sitter.hourFee + `$</p>
                    </div>`
                        });
                        infoWindow.open(map, marker);
                        // Open InfoWindow when Marker will be clicked
                        googleMaps.event.addListener(marker, "click", () => {
                            self.props.router.push(sitterProfileURL);
                        });

                        // Change icon when Marker will be hovered
                        googleMaps.event.addListener(marker, "mouseover", () => {
                            infoWindow.open(map, marker);
                        });
                        //
                        googleMaps.event.addListener(marker, "mouseout", () => {
                            infoWindow.close(map, marker);
                        });
                    },
                }
            ));
            coords.push({
                title: this.props.user.name,
                position: {lat: this.props.user.address.latitude, lng: this.props.user.address.longitude,},
                onLoaded: (googleMaps, map, marker) => {
                    // Set Marker animation
                    marker.setAnimation(googleMaps.Animation.BOUNCE);
                    const infoWindow = new googleMaps.InfoWindow({
                        content: ` <div>
                        <h3>` + this.props.user.name + `</h3>
                        <Image class="info-window-img" src='` + this.props.user.profilePicture + `' circle/>
                    </div>`
                    });
                    infoWindow.open(map, marker);

                    // Change icon when Marker will be hovered
                    googleMaps.event.addListener(marker, "mouseover", () => {
                        infoWindow.open(map, marker);
                    });
                    //
                    googleMaps.event.addListener(marker, "mouseout", () => {
                        infoWindow.close(map, marker);
                    });
                },
            })
        }

        const googleMaps = window.google.maps;
        return(
            <div style={{width: '100%', height: '400px'}}>
                <GoogleMap
                    googleMaps={googleMaps}
                    coordinates={
                        coords
                    }
                    center={this.props.center}
                    zoom={Number(this.props.zoom)}
                    onLoaded={(googleMaps, map) => {
                        map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
                    }}
                />
            </div>
        )
    }
}

Map.propTypes = {
    googleMaps: PropTypes.object.isRequired,
};

export default GoogleMapLoader(Map, {
    libraries: ["places"],
    key: MY_API_KEY,
})