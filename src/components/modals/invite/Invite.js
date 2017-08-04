//external sources
import React from 'react';

//components
import RadioGroup from "../../controllers/radio/index";
import InviteBase from "../../base/modals/invite/index";
import {Button, FormControl, Modal} from "react-bootstrap";
import DatePicker from "../../controllers/datePicker/index";
import TimeInput from "../../controllers/timePicker/index";
import GoogleMaps from "../../controllers/googleMaps/index";

//statics
import strings from "../../../static/strings";

//style
import './style.css';

export default class Invite extends InviteBase {
    render() {
        return (
            <div id="invite-modal">
                <Modal
                    show={this.props.feed.show}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Invite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h4 className="sitter-name">{this.props.sitterProfile.sitter.name}</h4>
                            <form id="invite">
                                <div style={{width: '100%', height: '400px'}}>
                                    <GoogleMaps center={{
                                        lat: this.props.user.address ? this.props.user.address.latitude : 0,
                                        lng: this.props.user.address ? this.props.user.address.longitude : 0
                                    }}
                                                sitters={[this.props.sitterProfile.sitter]}
                                                oneMarker={false}
                                                user={this.props.user}
                                                zoom="14"/>
                                </div>
                                <label>Date</label>
                                <DatePicker className="date-picker"
                                            defaultValue={this.props.invite.isoValue} {...this.props}
                                            action={this.props.actions.inviteActions.changeInviteDate}/>
                                <div className="invite-time">
                                    <div><label>From</label><TimeInput
                                        defaultValue={this.props.invite.fromTime} {...this.props}
                                        action={this.props.actions.inviteActions.changeInviteFromTime}/></div>
                                    <div><label>To</label><TimeInput
                                        defaultValue={this.props.invite.toTime} {...this.props}
                                        action={this.props.actions.inviteActions.changeInviteToTime}/></div>
                                </div>
                                <label>Recurring</label>
                                <RadioGroup options={strings.YESNO}
                                            defaultValue={this.props.invite.recurring}
                                            action={this.props.actions.inviteActions.changeRecurring}
                                            radioType={'recurring'}
                                            value={this.props.invite.recurring}/>
                                {this.props.invite.recurring === "Yes" ?
                                    <div><label>Weekly Recurring until:</label>
                                        <DatePicker className="date-picker"
                                                    defaultValue={this.props.invite.recurringIsoValue}  {...this.props}
                                                    action={this.props.actions.inviteActions.changeRecurringDate}/>
                                    </div> : ""}
                                <label>Notes</label>
                                <FormControl componentClass="textarea" placeholder="notes"
                                             onChange={this.handleChange.bind(this)}/>
                                <Button className="submit-invite" title="Send Invite" onClick={this.sendInvite}>Send
                                    Invite</Button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}