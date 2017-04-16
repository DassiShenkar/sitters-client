import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import GoogleMaps from "./GoogleMaps";
import DatePicker from "./controllers/DatePicker";
import TimeInput from "./controllers/TimeInput";
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import axios from 'axios';
class EditInvite extends React.Component {
    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);

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
                self.props.router.push('/');//
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
    return (
        <div>
            <img src="http://i.dailymail.co.uk/i/pix/2016/01/12/15/30169FCF00000578-3395841-image-a-4_1452613242890.jpg" alt="sitterName"/>
            <form id="invite">
                <ControlLabel>Date</ControlLabel>
                <DatePicker defaultValue={this.props.invite.isoValue} {...this.props} action={this.props.actions.inviteActions.changeInviteDate} />
                <ControlLabel>Start Watch</ControlLabel>
                <TimeInput defaultValue={this.props.invite.fromTime} {...this.props} action={this.props.actions.inviteActions.changeInviteFromTime} />
                <ControlLabel>End Watch</ControlLabel>
                <TimeInput defaultValue={this.props.invite.toTime} {...this.props} action={this.props.actions.inviteActions.changeInviteToTime}/>
                <ControlLabel>Watch Place</ControlLabel>
                <p>{this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city}</p>
                <div style={{width: '20%', height: '400px'}}>
                    <GoogleMaps sitter={this.props.user} {...this.props} oneMarker={true}/>
                </div>
                <ControlLabel>Notes</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" onChange={this.handleChange.bind(this)} />
                <Button title="Send Invite" bsStyle="primary" onClick={this.sendInvite}>Send Invite</Button>
            </form>
        </div>
    );
};
}

export default EditInvite;