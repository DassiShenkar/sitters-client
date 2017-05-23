import React from 'react';
import {Modal} from "react-bootstrap";
import NotificationItem from "./notificationItem/index";


export default class Notifications extends React.Component {

    closePopup(){
        this.props.actions.feedActions.showNotificationsPopup(false)
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.feed.showNotificationsPopup}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Notifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="notification-list">
                            {this.props.user.notifications.map((notification, index) => <NotificationItem {...this.props}  key={index} notification={notification}/>)}
                        </ul>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}