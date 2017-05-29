import React, {PropTypes} from "react"

import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

// import iconMarker from ""
// import iconMarkerHover from "./assets/iconMarkerHover.svg"

import styles from "./style.css"

const MY_API_KEY = "AIzaSyDHmEuwmAbej_-gf6v_-ujdAS8B5fOOlX0" // fake

class Map extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const googleMaps = window.google.maps;
        return(
            <div style={{width: '100%', height: '400px'}}>
                <GoogleMap
                    googleMaps={googleMaps}
                    // You can add and remove coordinates on the fly.
                    // The map will rerender new markers and remove the old ones.
                    coordinates={[
                        {
                            title: "Toulouse",
                            icon: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/14292407_1397261903636641_407769105302345463_n.jpg?oh=befa725cdc13802a9e70a9240ab787f9&oe=59BA019E",
                            position: {
                                lat: 32.066775,
                                lng: 34.768368,
                            },
                            onLoaded: (googleMaps, map, marker) => {
                                // Set Marker animation
                                marker.setAnimation(googleMaps.Animation.BOUNCE)

                                // Define Marker InfoWindow
                                const infoWindow = new googleMaps.InfoWindow({
                                    content: `
                <div>
                  <h3>Meital Halpert<h3>
                  <p>distance</p>
                  <p>Motto</p>
                  <Link to="">Link to profile page</Link>
                </div>
              `,
                                })

                                // Open InfoWindow when Marker will be clicked
                                googleMaps.event.addListener(marker, "click", () => {
                                    infoWindow.open(map, marker)
                                })

                                // Change icon when Marker will be hovered
                                // googleMaps.event.addListener(marker, "mouseover", () => {
                                //     marker.setIcon(iconMarkerHover)
                                // })
                                //
                                // googleMaps.event.addListener(marker, "mouseout", () => {
                                //     marker.setIcon(iconMarker)
                                // })

                                // Open InfoWindow directly
                                //infoWindow.open(map, marker)
                            },
                        }
                    ]}
                    // center={{lat: 32.066775, lng:34.768368}}
                    // zoom={8}
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

// const Map = ({googleMaps}) => (
//     // GoogleMap component has a 100% height style.
//     // You have to set the DOM parent height.
//     // So you can perfectly handle responsive with differents heights.
//
// )

Map.propTypes = {
    googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
    libraries: ["places"],
    key: MY_API_KEY,
})