// external sources
import React from 'react';

// components
import InvitesModalBase from "../../base/modals/invites/index";
import InviteList from '../../lists/inviteList/index'
import {Modal} from "react-bootstrap";

//style
import './style.css';

export default class InvitesModal extends InvitesModalBase{
    render() {
        return (
        <div>
            <Modal
                show={this.props.feed.showInvitesPopup}
                onHide={this.closePopup.bind(this)}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Invites</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="invites-list">
                        <InviteList invites={this.props.user.invites}  isParent={this.props.user.isParent}/>
                    </ul>
                </Modal.Body>
            </Modal>
        </div>

        )
    }
}