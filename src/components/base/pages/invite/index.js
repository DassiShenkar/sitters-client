import React from 'react';
import * as _ from "lodash";
import {updateInvite} from "../../../../utils/axios";

export default class InviteBase extends React.Component {
    constructor() {
        super();
        this.updateInvite = this.updateInvite.bind(this);
    }

    componentWillMount() {
        const inviteID = this.props.router.params.inviteId;
        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function (o) {
            return o._id === inviteID;
        });
        const shouldUpdate = !!((user.isParent && user.invites[inviteIndex].status !== "waiting" && !user.invites[inviteIndex].wasRead) // should update parent - if parent got notification and didn't read the invite
            || (!user.isParent && user.invites[inviteIndex].status === "waiting" && !user.invites[inviteIndex].wasRead)); // should update sitter - if sitter got new invite but didn't go into it.

        if (shouldUpdate) {
            user.invites[inviteIndex].wasRead = true;
            this.updateInvite(user, user.invites[inviteIndex], 'wasRead'); // update invite wasRead
        }
    }

    updateInvite(user, invite, action) {
        const self = this;
        updateInvite(user, invite, action, function(result){ // update invite in server
            if(result.data) // if server update successfully
                self.props.actions.inviteActions.setInvites(user.invites); // if server call success, update the invite in the state.
            else
                console.log("invite not updated");
        });
    }

    changeInviteStatus(invite, status) {
        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function (o) { // find the current invite index
            return o._id === invite._id;
        });
        user.invites[inviteIndex].status = status;
        this.updateInvite(user, invite, 'status'); // update invite status on db and state
        this.props.router.push('/'); // route to feed page
    }
}
