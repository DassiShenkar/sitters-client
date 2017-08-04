//external sources
import React from 'react';

//components
import InviteBase from '../../base/pages/invite/index'
import {Button, ControlLabel, Image, PageHeader} from "react-bootstrap";
import GoogleMaps from "../../controllers/googleMaps/index";

//style
import './style.css';

export default class Invite extends InviteBase {
    render() {
        const inviteID = this.props.router.params.inviteId;
        const invite = this.props.user.invites.filter((invite) => invite._id === inviteID)[0]; // get the current invite
        const buttons = !this.props.user.isParent && invite.status === 'waiting' ?
            (<div className="invite-buttons-container">
                <Button title="Accept" id="accept-btn" className="invite-btn"
                        onClick={this.changeInviteStatus.bind(this, invite, "accepted")}>Accept</Button>
                <Button title="Decline" id="decline-btn" className="invite-btn"
                        onClick={this.changeInviteStatus.bind(this, invite, "declined")}>Decline</Button>
            </div>) : "";
        return (
            <div id="single-invite" className="page">
                <PageHeader>Invite</PageHeader>
                <div className="invite-container">
                    <div className="invite-info">
                        <Image className="sitter-image" src={invite.sitterImage} alt={invite.sitterName}
                               circle={true}/>
                        <h2 className="sitter-name">{invite.sitterName}</h2>
                        <form id="invite">
                            <ControlLabel>STATUS</ControlLabel>
                            <p>{invite.status}</p>
                            <ControlLabel>DATE</ControlLabel>
                            <p>{invite.date}</p>
                            <ControlLabel>START TIME</ControlLabel>
                            <p>{invite.startTime}</p>
                            <ControlLabel>END TIME</ControlLabel>
                            <p>{invite.endTime}</p>
                            <ControlLabel>LOCATION</ControlLabel>
                            <p>{this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " + this.props.user.address.city : ''}</p>
                            <ControlLabel>NOTES</ControlLabel>
                            <p>{invite.notes}</p>
                            {buttons}
                        </form>
                    </div>
                    <div style={{width: '100%', height: '100%', marginTop: '48px', flex: '2'}}>
                        <GoogleMaps center={{
                            lat: this.props.user.address ? this.props.user.address.latitude : 0,
                            lng: this.props.user.address ? this.props.user.address.longitude : 0
                        }}
                                    sitters={[this.props.user]}
                                    oneMarker={true}
                                    zoom="14"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
