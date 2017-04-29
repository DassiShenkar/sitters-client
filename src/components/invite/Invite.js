import React from 'react';
import uuid from 'uuid';

//style
import './style.css';
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import DatePicker from "../controllers/DatePicker";
import TimeInput from "../controllers/TimeInput";
import GoogleMaps from "../GoogleMaps";
import axios from 'axios';


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
            sitterImage: this.props.sitterProfile.sitter.profilePicture

        };
        let self = this;
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/invite/create',
            url: 'http://localhost:4444/invite/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: invite
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

export default Invite;