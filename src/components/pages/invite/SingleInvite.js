import React from 'react';
import {ControlLabel, Image} from "react-bootstrap";
import GoogleMaps from "../../controllers/maps/GoogleMaps";
import axios from 'axios';
import strings from "../../../static/strings";
import * as _ from "lodash";

export default class SingleInvite extends React.Component{

    componentWillMount(){
        const inviteID = this.props.router.params.inviteId;
        let user = this.props.user;
        const  inviteIndex = _.findIndex(user.invites, function(o) { return o._id === inviteID; });

        const shouldUpdate = !!((user.isParent && user.invites[inviteIndex].status !== "waiting" && !user.invites[inviteIndex].wasRead)
        || (!user.isParent && user.invites[inviteIndex].status === "waiting" && !user.invites[inviteIndex].wasRead));

        if(shouldUpdate){
            user.invites[inviteIndex].wasRead = true;
            this.props.actions.inviteActions.setInvites(user.invites);
            const path = this.props.user.isParent ? 'parent/update': 'sitter/update';
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + path,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: user
            }).then(function (res) {
                if (res.data) {  // user created
                    console.log('updated invite with id:' + inviteID);
                }
                else {
                    console.log("settings not updated");
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
        const inviteID = this.props.router.params.inviteId;
        const invite = this.props.user.invites.filter((invite) => invite._id === inviteID)[0];
        return (
            <div>
                <Image className="sitter-image" src={invite.sitterImage} alt={invite.sitterName} circle={true}/>
                <h4 className="sitter-name">{invite.sitterName}</h4>
                <form id="invite">
                    <ControlLabel>Date</ControlLabel>
                    <p>{invite.date}</p>
                    <ControlLabel>Start Watch</ControlLabel>
                    <p>{invite.startTime}</p>
                    <ControlLabel>End Watch</ControlLabel>
                    <p>{invite.endTime}</p>
                    <ControlLabel>Watch Place:</ControlLabel>
                    {this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " +this.props.user.address.city : ''}
                    <div style={{width: '100%', height: '400px'}}>
                        <div style={{width: '100%', height: '400px'}}>
                            <GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}
                                        sitters={[this.props.user]}
                                        oneMarker={true}
                                        zoom="14"
                            />
                        </div>
                    </div>
                    <ControlLabel>Notes</ControlLabel>
                    <p>{invite.notes}</p>
                </form>
            </div>
        )
    }
}
