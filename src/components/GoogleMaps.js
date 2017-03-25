import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Location from './Location';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
    static defaultProps = {
        center: {lat: 32.085300, lng: 34.781768},
        zoom: 11
    };

    render() {
        return (
            <GoogleMap
                apiKey='AIzaSyDHmEuwmAbej_-gf6v_-ujdAS8B5fOOlX0'
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <Location lat={32.082675} lng={34.796039} text={'Arlozorov'}/>
                {/*<AnyReactComponent*/}
                    {/*lat={59.955413}*/}
                    {/*lng={30.337844}*/}
                    {/*text={'Kreyser Avrora'}*/}
                {/*/>*/}
            </GoogleMap>
        );
    }
}