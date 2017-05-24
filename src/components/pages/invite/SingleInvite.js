import React from 'react';
import {ControlLabel, Image} from "react-bootstrap";
import GoogleMaps from "../../controllers/maps/GoogleMaps";

export default class SingleInvite extends React.Component{
    render() {
        const inviteID = location.href.split('invite/')[1];
        const invite = this.props.user.invites.filter((invite) => invite._id === inviteID)[0];
        return (
        <div>
            <Image className="sitter-image" src={invite.sitterImage} alt={invite.sitterName} circle={true}/>
            <h4 className="sitter-name">{invite.sitterName}</h4>
            <form id="invite">
                <ControlLabel>Date</ControlLabel>
                <p>{invite.date}</p>
                <ControlLabel>Start Watch</ControlLabel>
                <p>{invite.startTime}</p>
                <ControlLabel>End Watch</ControlLabel>
                <p>{invite.endTime}</p>
                <ControlLabel>Watch Place:</ControlLabel>
                {this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}
                <div style={{width: '100%', height: '400px'}}>
                    <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                sitter={this.props.user}
                                oneMarker={true}/>
                </div>
                <ControlLabel>Notes</ControlLabel>
                <p>{invite.notes}</p>
            </form>
        </div>
        )
    }
}
