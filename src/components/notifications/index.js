import React from 'react';

import List from "../List";
import {Modal} from "react-bootstrap";
import InviteItem from "../inviteList/inviteItem/index";
import NotificationItem from "./notificationItem/index";


class Notifications extends React.Component {


    closePopup(){
        this.props.actions.feedActions.showNotificationsPopup(false)
    }

    render() {
        let items =   [{name: 'name1', image: 'image1', text: 'text1', time: 'time1'}, {name: 'name2', image: 'image2', text: 'text2', time: 'time2'}, {name: 'name3', image: 'image3', text: 'text3', time: 'time3'}];
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

export default Notifications;