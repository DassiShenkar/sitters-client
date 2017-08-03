//external sources
import React from 'react';

//components
import NotificationBase from "../../base/pages/notification/index";
import {Image, PageHeader} from "react-bootstrap";
import MatchBanner from "../../banners/matchBanner";

//style
import './style.css';

export default class Notification extends NotificationBase {
    render() {
        const notificationID = this.props.router.params.notificationId;
        const notification = this.props.user.notifications.filter((notification) => notification._id === notificationID)[0];
        const style = {
            backgroundImage: 'url(' + notification.sitter.coverPhoto + ')',
            height: '400px'
        };
        return (
            <div id="single-notification-page" className="page">
                <PageHeader>Meet The New Sitter - {notification.sitter.sitterName}</PageHeader>
                <div className="match" style={style}>
                    <div className="cover-overlay"/>
                    <div className="sitter-info">
                        <Image className="profilePic"
                               src={notification.sitter.profilePicture}
                               alt={notification.sitter.sitterName}
                               circle/>
                        <h1 className="sitterName">{notification.sitter.sitterName}</h1>
                    </div>
                </div>
                <MatchBanner parent={this.props.user} sitter={notification.sitter} matchScore={notification.match}/>
            </div>
        )
    }
}
