// external sources
import React from "react";

//component
import Invite from "../../modals/invite/Invite";
import ActionBarBase from "../../base/panels/actionPanel";
import Icon from "../../icon";

// style
import "./style.css";

export default class ActionBar extends ActionBarBase {
    render() {
        return (
            <div id="sitterActionBar">
                <button id="send-invite-btn" className="action-btn" onClick={this.inviteSitter}><Icon name="icon-envelope action-icon"/></button>
                <button id="sitter-profile-btn" className={this.props.router.getCurrentLocation().pathname.includes('sitter') ? 'action-btn selected' : 'action-btn sitter-profile-btn unselected'} onClick={this.sitterProfile}><Icon name='icon-user'/></button>
                <button id="add-review-btn" className={'action-btn  enabled'} onClick={this.reviewSitter}><Icon name='icon-heart'/></button>
                <Invite {...this.props}/>
            </div>
        )
    }
}