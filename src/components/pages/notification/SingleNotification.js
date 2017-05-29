import React from 'react';
import {ControlLabel, Image} from "react-bootstrap";
import GoogleMaps from "../../controllers/maps/GoogleMaps";
import strings from "../../../static/strings";
import axios from 'axios';

export default class SingleNotification extends React.Component{

    componentWillMount(){
        const notificationId = this.props.router.params.notificationId;
        let user = this.props.user;
        let shouldUpdate = true;
        user.notifications.forEach(function(notification){
            if(notification._id === notificationId){
                if(notification.wasRead){
                    shouldUpdate = false;
                }
                notification.wasRead = true;
            }
        });
        if(shouldUpdate){
            const path = this.props.user.isParent? 'parent/update': 'sitter/update';
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + path,
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
        return (
            <div>
                <Image className="sitter-image" src={notification.sitterPicture} alt={notification.sitterName} circle={true}/>
                <h4 className="sitter-name">{notification.sitterName}</h4>
                <form id="invite">
                    <ControlLabel>Date</ControlLabel>
                    <p>{notification.date}</p>
                    <ControlLabel>Start Watch</ControlLabel>
                    <p>{notification.startTime}</p>
                    <ControlLabel>End Watch</ControlLabel>
                    <p>{notification.endTime}</p>
                    <ControlLabel>Watch Place:</ControlLabel>
                    {this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}
                    <div style={{width: '100%', height: '400px'}}>
                        <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                    sitter={this.props.user}
                                    oneMarker={true}/>
                    </div>
                    <ControlLabel>Notes</ControlLabel>
                    <p>{notification.notes}</p>
                </form>
            </div>
        )
    }
}
