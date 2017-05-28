import React from 'react';
import {ControlLabel, Image} from "react-bootstrap";
import GoogleMaps from "../../controllers/maps/GoogleMaps";

export default class SingleNotification extends React.Component{
    render() {
        const notificationID = location.href.split('notification/')[1];
        const notification = this.props.user.notifications.filter((notification) => notification._id === notificationID)[0];
        return (
        <div>
            <Image className="sitter-image" src={notification.sitterImage} alt={notification.sitterName} circle={true}/>
            <h4 className="sitter-name">{notification.sitterName}</h4>
            <form id="invite">
                <ControlLabel>Date</ControlLabel>
                <p>{notification.date}</p>
                <ControlLabel>Start Watch</ControlLabel>
                <p>{notification.startTime}</p>
                <ControlLabel>End Watch</ControlLabel>
                <p>{notification.endTime}</p>
                <ControlLabel>Watch Place:</ControlLabel>
                {this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}
                <div style={{width: '100%', height: '400px'}}>
                    <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                sitter={this.props.user}
                                oneMarker={true}/>
                </div>
                <ControlLabel>Notes</ControlLabel>
                <p>{notification.notes}</p>
            </form>
        </div>
        )
    }
}
