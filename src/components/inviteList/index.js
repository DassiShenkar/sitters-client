// external sources
import React from 'react';

// components
import InviteItem from './inviteItem/index';

//style
import './style.css';
import {Modal} from "react-bootstrap";

class InvitesList extends React.Component{
    closePopup(){
        this.props.actions.feedActions.showInvitesPopup(false)
    }
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
                        {this.props.user.invites.map((invite, index) => <InviteItem {...this.props}  key={index} invite={invite}/>)}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>

        )
    }
}

export default InvitesList;

