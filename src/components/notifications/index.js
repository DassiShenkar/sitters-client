import React from 'react';

import List from "../List";
import {Modal} from "react-bootstrap";


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
                        <List items={items}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Notifications;