import React, {PropTypes} from "react"
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import geodist from "geodist";
import './style.css'

const MY_API_KEY = "AIzaSyDHmEuwmAbej_-gf6v_-ujdAS8B5fOOlX0";

class Map extends React.Component {
    constructor(props){
        super(props);
    }

    onClick(e){
        e.preventDefault();
        console.log('clicked');
    }
    render(){
        const self = this;
        let coords;
        if(this.props.oneMarker){
            // const parents = [this.props.parent];
            coords = this.props.sitters.map((parent, index) => (
                {
                    title: parent.name,
                    // icon: `<Image src={sitter.profilePicture} circle/>,
                    position: {
                        lat: parent.address.latitude,
                        lng: parent.address.longitude,
                    },
                    onLoaded: (googleMaps, map, marker) => {
                        // Set Marker animation
                         marker.setAnimation(googleMaps.Animation.BOUNCE);
                        // const sitterProfileURL = "/sitter/" + sitter._id;
                        // const distance = geodist({lat: self.props.center.lat, lon: self.props.center.lng}, {lat: sitter.address.latitude, lon: sitter.address.longitude},{ unit: 'km'});

                        // const infoWindow = new googleMaps.InfoWindow({
                        //     content: `<div><h3>` + parent.name + `</h3><Image className="info-window-img" src="` + parent.profilePicture + `"/><p>Child Name: ` + parent.children.name + `</p></div>`
                        // });
                        const address = parent.address.street + " " + parent.address.houseNumber + ", " + parent.address.city;
                        const infoWindow = new googleMaps.InfoWindow({
                            content: ` <div>
                        <h3>` + parent.name + `</h3>
                            <Image className="info-window-img" src='` + parent.profilePicture + `' circle/>
                            <p>` + address + `</p>
                    </div>`
                        });

                        // Open InfoWindow when Marker will be clicked
                        // googleMaps.event.addListener(marker, "click", () => {
                        //     self.props.router.push(sitterProfileURL);
                        // });

                        // Change icon when Marker will be hovered
                        // googleMaps.event.addListener(marker, "mouseover", () => {
                        //     // marker.setIcon(iconMarkerHover)
                        //     infoWindow.open(map, marker);
                        // });
                        // //
                        // googleMaps.event.addListener(marker, "mouseout", () => {
                        //     infoWindow.close(map, marker);
                        // });
                       infoWindow.open(map, marker);
                    }
                })
            );

        }
        else{
            coords = this.props.sitters.map((sitter, index) => (
                {
                    title: sitter.name,
                    // icon: `<Image src={sitter.profilePicture} circle/>,
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
                            <Image className="info-window-img" src='` + sitter.profilePicture + `' circle/>
                            <p>Motto: ` + sitter.motto + `</p>
                            <p>Last Invite: ` + sitter.lastInvite + `</p>
                            <p>Distance: `+ distance + ` KM</p>
                            <p>Hour Fee: ` + sitter.hourFee + `$</p>
                    </div>`
                        });

                        // Open InfoWindow when Marker will be clicked
                        googleMaps.event.addListener(marker, "click", () => {
                            self.props.router.push(sitterProfileURL);
                        });

                        // Change icon when Marker will be hovered
                        googleMaps.event.addListener(marker, "mouseover", () => {
                            // marker.setIcon(iconMarkerHover)
                            infoWindow.open(map, marker);
                        });
                        //
                        googleMaps.event.addListener(marker, "mouseout", () => {
                            infoWindow.close(map, marker);
                        });
                    },
                }
            ));
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