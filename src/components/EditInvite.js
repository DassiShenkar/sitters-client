import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import GoogleMaps from "./GoogleMaps";
import DatePicker from "./controllers/DatePicker";
import TimeInput from "./controllers/TimeInput";
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class EditInvite extends React.Component {
    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);

    };


    sendInvite(e) {
        console.log('send!');//TODO: send to server with axios and move to feed
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