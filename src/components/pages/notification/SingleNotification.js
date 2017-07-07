import React from 'react';
import {Image, PageHeader} from "react-bootstrap";
import MatchBanner from "../../banners/matchBanner";
import strings from "../../../static/strings";
import axios from 'axios';
import './style.css';

export default class SingleNotification extends React.Component {

    componentWillMount() {
        const notificationId = this.props.router.params.notificationId;
        let user = this.props.user;
        let shouldUpdate = true;
        user.notifications.forEach(function (notification) {
            if (notification._id === notificationId) {
                if (notification.wasRead) {
                    shouldUpdate = false;
                }
                notification.wasRead = true;
            }
        });
        if (shouldUpdate) {
            const path = this.props.user.isParent ? 'parent/update' : 'sitter/update';
            axios({
                method: 'post',
                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + path,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: user
            }).then(function (res) {
                if (res.data) {  // user created
                    console.log('updated notification with id:' + notificationId);
                }
                else {
                    console.log("notification not updated");
                    //TODO: think about error
                }
            })
                .catch(function (error) {
                    alert(error);
                    //TODO: think about error
                });
        }

    }

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
