//external sources
import React from 'react';
import uuid from 'uuid';
import dateFormat from 'dateformat';
import clone from 'clone';

//utils
import {request} from '../../../../utils/requestHandler';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";

export default class InviteBase extends React.Component {

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
        if(this.props.invite.recurring === "Yes"){ // create multiple invites
            let inviteDate = new Date(this.props.invite.inviteDate);
            let recurringDate = new Date(this.props.invite.recurringDate);
            do {
                invites.push(invite);
                inviteDate.setDate(inviteDate.getDate()+7);
                invite = clone(invite);
                invite._id =  uuid.v1();
                invite.date = (inviteDate.getMonth() + 1) + "/" + inviteDate.getDate() + "/" + inviteDate.getFullYear();
            } while (inviteDate <= recurringDate); // create invites until recurring date
        }
        else
            invites.push(invite);

        this.props.actions.inviteActions.changeRecurringDate(dateFormat(new Date(), "mm/dd/yyyy"), dateFormat(new Date(), "dddd"), new Date().toISOString());
        const self = this;

        request('post', sittersApi.CREATE_INVITE, invites, function(result){
            if (result.data) {  // invite created
                self.props.actions.feedActions.showInvitePopup(false);
                self.props.actions.inviteActions.changeRecurring("No");
                self.props.actions.actionCreators.setInvites(self.props.user.invites.concat(invites)); // add invite to state
                self.props.router.push('/'); // move back to homepage
            }
            else  // invite not created
                console.log("invite wasn't created")
        });
    };

    closePopup(){
        this.props.actions.feedActions.showInvitePopup(false)
    }
}