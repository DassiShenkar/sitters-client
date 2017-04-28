import React from 'react';

//style
import './style.css';
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import DatePicker from "../controllers/DatePicker";
import TimeInput from "../controllers/TimeInput";
import GoogleMaps from "../GoogleMaps";
import axios from 'axios';


class Notifictions extends React.Component {

    constructor(props) {
        super(props);
    }

    closePopup(){
        this.props.actions.feedActions.showNotificationsPopup(false)
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.feed.showNotifications}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Notiicaations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Image className="sitter-image" src={this.props.sitterProfile.sitter.profilePicture} alt={this.props.sitterProfile.sitter.name} circle={true}/>
                            <h4 className="sitter-name">{this.props.sitterProfile.sitter.name}</h4>
                            <form id="invite">
                                <ControlLabel>Date</ControlLabel>
                                <DatePicker className="date-picker" defaultValue={this.props.invite.isoValue} {...this.props} action={this.props.actions.inviteActions.changeInviteDate} />
                                <ControlLabel>Start Watch</ControlLabel>
                                <TimeInput defaultValue={this.props.invite.fromTime} {...this.props} action={this.props.actions.inviteActions.changeInviteFromTime} />
                                <ControlLabel>End Watch</ControlLabel>
                                <TimeInput defaultValue={this.props.invite.toTime} {...this.props} action={this.props.actions.inviteActions.changeInviteToTime}/>
                                <ControlLabel>Watch Place:</ControlLabel>
                                {"   " +this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city}
                                <div style={{width: '100%', height: '400px'}}>
                                    <GoogleMaps sitter={this.props.user} {...this.props} oneMarker={true}/>
                                </div>
                                <ControlLabel>Notes</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="textarea" onChange={this.handleChange.bind(this)} />
                                <Button className="submit-invite" title="Send Invite" bsStyle="primary" onClick={this.sendInvite}>Send Invite</Button>
                            </form>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Notifictions;