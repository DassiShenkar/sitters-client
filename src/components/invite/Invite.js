import React from 'react';
import uuid from 'uuid';
import dateFormat from 'dateformat';
//style
import './style.css';
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import DatePicker from "../controllers/datePicker/index";
import TimeInput from "../controllers/TimeInput";
import GoogleMaps from "../controllers/maps/GoogleMaps";
import axios from 'axios';
import strings from "../../static/strings";
import clone from 'clone';


class Invite extends React.Component {

    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);
    }

    handleChange(e){
        this.props.actions.inviteActions.setNotes(e.target.value);
    }

    sendInvite(e) {
        e.preventDefault();
        let invite = {
            _id: uuid.v1(),
            address:    {
                city: this.props.user.address.city,
                street: this.props.user.address.street,
                houseNumber: this.props.user.address.houseNumber
            },
            startTime:  this.props.invite.fromTime.format('HH:mm'),
            endTime:    this.props.invite.toTime.format('HH:mm'),
            date:       this.props.invite.inviteDate,
            status:     "waiting",
            wasRead: false,
            sitterID:   this.props.sitterProfile.sitter._id,
            parentID:   this.props.user._id,
            notes: this.props.invite.notes? this.props.invite.notes: "",
            sitterName: this.props.sitterProfile.sitter.name,
            sitterImage: this.props.sitterProfile.sitter.profilePicture,
            parentName: this.props.user.name,
            parentImage: this.props.user.profilePicture

        };
        let invites = [];
        if(this.props.invite.recurringDate !== ""){
            let inviteDate = new Date(this.props.invite.inviteDate);
            let recurringDate = new Date(this.props.invite.recurringDate);
            do {
                invites.push(invite);
                inviteDate.setDate(inviteDate.getDate()+7);
                invite = clone(invite);
                invite.date = (inviteDate.getMonth() + 1) + "/" + inviteDate.getDate() + "/" + inviteDate.getFullYear();
            }
            while (inviteDate <= recurringDate);
        }
        this.props.actions.inviteActions.changeRecurringDate(dateFormat(new Date(), "mm/dd/yyyy"), dateFormat(new Date(), "dddd"), new Date().toISOString());
        let self = this;
        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'invite/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: invites
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // invite created
                self.props.actions.feedActions.showInvitePopup(false);
                self.props.router.push('/');
            }
            else { // invite not created
                //TODO: think about error when user not created
            }
        })
            .catch(function (error) {
                console.log(error);
                //TODO: think about error when user not created
            });
    };

    closePopup(){
        this.props.actions.feedActions.showInvitePopup(false)
    }
    render() {
        return (
            <div>
                <Modal
                    show={this.props.feed.show}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Send Invite</Modal.Title>
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
                                {this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}
                                <div style={{width: '100%', height: '400px'}}>
                                    <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                                sitter={this.props.user}
                                                oneMarker={true}/>
                                </div>
                                <ControlLabel>Weekly Recurring until:</ControlLabel>
                                <DatePicker className="date-picker" defaultValue={this.props.invite.recurringIsoValue}  {...this.props} action={this.props.actions.inviteActions.changeRecurringDate} />
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

export default Invite;