import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import SimpleMap from "./GoogleMaps";
import DatePicker from "./controllers/DatePicker";
import TimeInput from "./controllers/TimeInput";
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class EditInvite extends React.Component {
    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);

        // this.state = {
        //     sitterProfilePicture: 'sitterPic',
        //     sitterName: 'sitterName',
        //     date: 'inviteDate',
        //     time: 'inviteTime',
        //     location: 'inviteLocation',
        //     notes: 'notes'
        // }
    };


    sendInvite(e) {
        console.log('send!');
    };


    render() {
        return (
            <div>
                <img src="http://i.dailymail.co.uk/i/pix/2016/01/12/15/30169FCF00000578-3395841-image-a-4_1452613242890.jpg" alt="sitterName"/>
                <form id="invite">
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker action={this.props.actions.inviteActions.updateDate}/>
                    <ControlLabel>Time</ControlLabel>
                    <TimeInput/>
                    <ControlLabel>Location</ControlLabel>
                    <div style={{width: '20%', height: '400px'}}>
                        <SimpleMap/>
                    </div>
                    <ControlLabel>Notes</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="textarea" />
                    <Button title="Send Invite" bsStyle="primary" onClick={this.sendInvite}>Send Invite</Button>
                </form>
            </div>
        );
    };
}

export default EditInvite;