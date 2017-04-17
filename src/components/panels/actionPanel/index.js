import React from 'react';

import Like from '../../../styles/icons/Like';
import Star from '../../../styles/icons/Star';
import NextArrow from '../../../styles/icons/NextArrow';
import {history} from '../../../store';

//style
import './style.css';
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import DatePicker from "../../controllers/DatePicker";
import TimeInput from "../../controllers/TimeInput";
import GoogleMaps from "../../GoogleMaps";
import EditInvite from "../invite/EditInvite";
import Invite from "../invite/Invite";

class SitterActionBar extends EditInvite {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.inviteSitter = this.inviteSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex +1;
        this.props.actions.feedActions.setSitterIndex(index);
    }
    handleChange(event){
        this.props.actions.inviteActions.setNotes(event.target.value);
    }

    inviteSitter(e) {
        e.preventDefault();
        let sitter;
        sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
       // history.push('/editInvite');
        this.props.actions.feedActions.showInvitePopup(true);




        //let self = this;
        // axios.post('https://sitters-server.herokuapp.com/sitter/get', {
        //     _id: this.props.feed.filteredMatches[this.props.feed.sitterIndex]._id
        // })
        //     .then(function (sitter) {
        //         self.props.actions.sitterProfileActions.setSitter(sitter.data);
        //         history.push('/editInvite');
        //     })
        //     .catch(function (error) {
        //         console.log(error);//TODO: in case of sitter wasn't found
        //     });
    }

    reviewSitter(e) {
        e.preventDefault();
    }
    closePopup(){
        this.props.actions.feedActions.showInvitePopup(false)
    }

    render() {
        return (
            <div>

                <div id="sitterActionBar">
                    {/*<Button*/}
                        {/*bsStyle="primary"*/}
                        {/*bsSize="large"*/}
                        {/*onClick={() => this.setState({ show: true})}*/}
                    {/*/>*/}
                    {/*<button onClick={this.inviteSitter}><Like id="like"/></button>*/}
                    <button onClick={this.inviteSitter}><Like id="like"/></button>
                    <button onClick={this.reviewSitter}><Star id="star"/></button>
                    <button onClick={this.nextSitter}><NextArrow id="next"/></button>
                </div>
                {/*<Modal*/}
                    {/*show={this.props.feed.show}*/}
                    {/*onHide={this.closePopup.bind(this)}*/}
                    {/*container={this}*/}
                    {/*aria-labelledby="contained-modal-title"*/}
                {/*>*/}
                    {/*<Modal.Header closeButton>*/}
                        {/*<Modal.Title id="contained-modal-title">Send Invite</Modal.Title>*/}
                    {/*</Modal.Header>*/}
                    {/*<Modal.Body>*/}
                        {/*<div>*/}
                            {/*<Image className="sitter-image" src={this.props.sitterProfile.sitter.profilePicture} alt={this.props.sitterProfile.sitter.name} circle={true}/>*/}
                            {/*<h4>{this.props.sitterProfile.sitter.name}</h4>*/}
                            {/*<form id="invite">*/}
                                {/*<ControlLabel>Date</ControlLabel>*/}
                                {/*<DatePicker className="date-picker" defaultValue={this.props.invite.isoValue} {...this.props} action={this.props.actions.inviteActions.changeInviteDate} />*/}
                                {/*<ControlLabel>Start Watch</ControlLabel>*/}
                                {/*<TimeInput defaultValue={this.props.invite.fromTime} {...this.props} action={this.props.actions.inviteActions.changeInviteFromTime} />*/}
                                {/*<ControlLabel>End Watch</ControlLabel>*/}
                                {/*<TimeInput defaultValue={this.props.invite.toTime} {...this.props} action={this.props.actions.inviteActions.changeInviteToTime}/>*/}
                                {/*<ControlLabel>Watch Place:</ControlLabel>*/}
                                {/*{"   " +this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city}*/}
                                {/*<div style={{width: '100%', height: '400px'}}>*/}
                                    {/*<GoogleMaps sitter={this.props.user} {...this.props} oneMarker={true}/>*/}
                                {/*</div>*/}
                                {/*<ControlLabel>Notes</ControlLabel>*/}
                                {/*<FormControl componentClass="textarea" placeholder="textarea" onChange={this.handleChange.bind(this)} />*/}
                                {/*<Button className="submit-invite" title="Send Invite" bsStyle="primary" onClick={this.sendInvite}>Send Invite</Button>*/}
                            {/*</form>*/}

                        {/*</div>*/}
                    {/*</Modal.Body>*/}
                {/*</Modal>*/}
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterActionBar;