import React from 'react';
import uuid from 'uuid';
import dateFormat from 'dateformat';
//style
import './style.css';
import {Button, FormControl, Modal} from "react-bootstrap";
import DatePicker from "../controllers/datePicker/index";
import TimeInput from "../controllers/timePicker/index";
import GoogleMaps from "../controllers/googleMaps/index";
import axios from 'axios';
import strings from "../../static/strings";
import clone from 'clone';
import RadioGroup from "../controllers/radio/index";


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
            childName: this.props.user.children.name,
            parentImage: this.props.user.profilePicture
        };
        let invites = [];
        if(this.props.invite.recurring === "Yes"){
            let inviteDate = new Date(this.props.invite.inviteDate);
            let recurringDate = new Date(this.props.invite.recurringDate);
            do {
                invites.push(invite);
                inviteDate.setDate(inviteDate.getDate()+7);
                invite = clone(invite);
                invite._id =  uuid.v1();
                invite.date = (inviteDate.getMonth() + 1) + "/" + inviteDate.getDate() + "/" + inviteDate.getFullYear();
            } while (inviteDate <= recurringDate);
        }
        else {
            invites.push(invite);
            // this.props.actions.actionCreators.setInvites(this.props.user.invites.concat(invite));
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
                self.props.actions.inviteActions.changeRecurring("No");
                // invites.forEach(invite => {
                //     self.props.actions.inviteActions.sendInvite(invite);
                // });
                self.props.actions.actionCreators.setInvites(self.props.user.invites.concat(invites));
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
            <div id="invite-modal">
                <Modal
                    show={this.props.feed.show}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Invite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {/*<Image className="sitter-image" src={this.props.sitterProfile.sitter.profilePicture} alt={this.props.sitterProfile.sitter.name} circle={true}/>*/}
                            <h4 className="sitter-name">{this.props.sitterProfile.sitter.name}</h4>
                            <form id="invite">
                                <div style={{width: '100%', height: '400px'}}>
                                    <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                                sitters={[this.props.sitterProfile.sitter]}
                                                oneMarker={false}
                                                user={this.props.user}
                                                zoom="14"
                                    />
                                </div>
                                {/*<label>{this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}</label>*/}
                                <label>Date</label>
                                <DatePicker className="date-picker" defaultValue={this.props.invite.isoValue} {...this.props} action={this.props.actions.inviteActions.changeInviteDate} />
                                <div className="invite-time">
                                    <div><label>From</label><TimeInput defaultValue={this.props.invite.fromTime} {...this.props} action={this.props.actions.inviteActions.changeInviteFromTime}/></div>
                                    <div><label>To</label><TimeInput defaultValue={this.props.invite.toTime} {...this.props} action={this.props.actions.inviteActions.changeInviteToTime}/></div>
                                </div>
                                <label>Recurring</label>
                                <RadioGroup options={strings.YESNO}
                                            defaultValue={this.props.invite.recurring}
                                            action={this.props.actions.inviteActions.changeRecurring}
                                            radioType={'recurring'}
                                            value={this.props.invite.recurring}/>
                                {this.props.invite.recurring === "Yes"?
                                    <div><label>Weekly Recurring until:</label>
                                        <DatePicker className="date-picker" defaultValue={this.props.invite.recurringIsoValue}  {...this.props} action={this.props.actions.inviteActions.changeRecurringDate} />
                                    </div>:""}
                                <label>Notes</label>
                                <FormControl componentClass="textarea" placeholder="notes" onChange={this.handleChange.bind(this)} />
                                <Button className="submit-invite" title="Send Invite"  onClick={this.sendInvite}>Send Invite</Button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Invite;