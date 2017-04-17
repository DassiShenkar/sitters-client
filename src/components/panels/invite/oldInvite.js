import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import GoogleMaps from "../../GoogleMaps";
import DatePicker from "../../controllers/DatePicker";
import TimeInput from "../../controllers/TimeInput";
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import axios from 'axios';
import {Image, Modal} from "react-bootstrap";

import './style.css'
class EditInvite extends React.Component {
    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);
        this.state = {
            show: false
        }
    };


    sendInvite(e) {   //TODO: send to server with axios and move to feed
        e.preventDefault();
        let invite = {
            _id:        "abcd",
            address:    {
                city: this.props.user.address.city,//"Tel Aviv",
                street: this.props.user.address.street,//"Arlozorov",
                houseNumber: this.props.user.address.houseNumber
            },
            startTime:  this.props.invite.fromTime.format('HH:mm'),//"10:30",
            endTime:    this.props.invite.toTime.format('HH:mm'),//"12:45",
            date:       this.props.invite.inviteDate,//"10/05/2017",
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
            url: 'https://sitters-server.herokuapp.com/invite/create',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: invite
        }).then(function (res) {
            console.log(res);
            if (res.data) {  // invite created
                self.props.actions.feedActions.showInvitePopup(false);
                //self.props.router.push('/');//
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

    handleChange(event){
        this.props.actions.inviteActions.setNotes(event.target.value);
    }


    render() {
        let close = () => this.setState({ show: false});

        return (
            <div>
            <Button
                bsStyle="primary"
                bsSize="large"
                onClick={() => this.setState({ show: true})}
            />
            <div className="modal-container" style={{height: 200}}>
                {/*<Button*/}
                    {/*bsStyle="primary"*/}
                    {/*bsSize="large"*/}
                    {/*onClick={() => this.setState({ show: true})}*/}
                {/*>*/}
                    {/*Launch contained modal*/}
                {/*</Button>*/}

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Send Invite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Image className="sitter-image" src={this.props.sitterProfile.sitter.profilePicture} alt={this.props.sitterProfile.sitter.name} circle={true}/>
                            <h4>{this.props.sitterProfile.sitter.name}</h4>
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


</div>
        );
    };
}

export default EditInvite;