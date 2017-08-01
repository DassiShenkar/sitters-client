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
        const shouldUpdate = !!((user.isParent && user.invites[inviteIndex].status !== "waiting" && !user.invites[inviteIndex].wasRead)
            || (!user.isParent && user.invites[inviteIndex].status === "waiting" && !user.invites[inviteIndex].wasRead));

        if (shouldUpdate) {
            user.invites[inviteIndex].wasRead = true;
            this.updateInvite(user, user.invites[inviteIndex], 'wasRead');
        }
    }

    updateInvite(user, invite, action) {
        const self = this;
        updateInvite(user, invite, action, function(result){
            if(result.data)
                self.props.actions.inviteActions.setInvites(user.invites);
            else
                console.log("invite not updated");
        });
    }

    changeInviteStatus(invite, status) {
        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function (o) {
            return o._id === invite._id;
        });
        user.invites[inviteIndex].status = status;
        this.updateInvite(user, invite, 'status');
        this.props.router.push('/');
    }
}
