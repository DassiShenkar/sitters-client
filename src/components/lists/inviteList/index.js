// external sources
import React from 'react';

// components
import InviteItem from "./inviteItem/index";
import InvitesListBase from "../../base/lists/inviteList/index";

//style
import './style.css';

export default class InvitesList extends InvitesListBase{
    render() {
        return (
            <div>
                {this.props.invites.map((invite, index) => <InviteItem isParent={this.props.isParent}  key={index} invite={invite}/>)}
            </div>
        )
    }
}