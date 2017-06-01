import React from 'react';
import {Button, ControlLabel, Image, PageHeader} from "react-bootstrap";
import GoogleMaps from "../../controllers/maps/GoogleMaps";
import axios from 'axios';
import strings from "../../../static/strings";
import * as _ from "lodash";
import './style.css';

export default class SingleInvite extends React.Component {
    constructor() {
        super();
        this.updateInvite = this.updateInvite.bind(this);
    }

    componentWillMount() {
        const inviteID = this.props.router.params.inviteId;
        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function (o) {
            return o._id === inviteID;
        });

        const shouldUpdate = !!((user.isParent && user.invites[inviteIndex].status !== "waiting" && !user.invites[inviteIndex].wasRead)
        || (!user.isParent && user.invites[inviteIndex].status === "waiting" && !user.invites[inviteIndex].wasRead));

        if (shouldUpdate) {
            user.invites[inviteIndex].wasRead = true;
            this.updateInvite(user)
        }
    }

    updateInvite(user, invite) {
        const self = this;
        this.props.actions.inviteActions.setInvites(user.invites);
        const path = this.props.user.isParent ? 'parent/update' : 'sitter/update';
        axios({
            method: 'post',
            url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
        }).then(function (res) {
            if (res.data) {  // user created

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
        if (!user.isParent && invite) {
            axios({
                method: 'post',
                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: invite.parentID}
            })
                .then(function (response) {
                    if (response.data) {  // user exists
                        let parent = response.data;
                        const inviteIndex = _.findIndex(parent.invites, function (o) {
                            return o._id === invite._id;
                        });
                        parent.invites[inviteIndex] = invite;
                        parent.invites[inviteIndex].wasRead = false;
                        axios({
                            method: 'post',
                            url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'parent/update',
                            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            data: parent
                        }).then(function (res) {
                            if (res.data) {  // user created
                                self.props.router.push('/');
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
                    else { // user not exist

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    changeInviteStatus(invite, status) {

        let user = this.props.user;
        const inviteIndex = _.findIndex(user.invites, function (o) {
            return o._id === invite._id;
        });
        user.invites[inviteIndex].status = status;
        this.updateInvite(user, invite);
        this.props.router.push('/');
    }

    render() {
        const inviteID = this.props.router.params.inviteId;
        const invite = this.props.user.invites.filter((invite) => invite._id === inviteID)[0];
        const buttons = !this.props.user.isParent && invite.status === 'waiting' ?
            (<div>
                <Button title="Accept" onClick={this.changeInviteStatus.bind(this, invite, "accepted")}>Accept</Button>
                <Button title="Decline"
                        onClick={this.changeInviteStatus.bind(this, invite, "declined")}>Declined</Button>
            </div>) : "";
        return (
            <div id="single-invite" className="page">
                <PageHeader>Invite</PageHeader>
                <div className="invite-container">
                    <div className="invite-info">
                        <Image className="sitter-image" src={invite.sitterImage} alt={invite.sitterName}
                               circle={true}/>
                        <h2 className="sitter-name">{invite.sitterName}</h2>
                        <form id="invite">
                            <ControlLabel>DATE</ControlLabel>
                            <p>{invite.date}</p>
                            <ControlLabel>START TIME</ControlLabel>
                            <p>{invite.startTime}</p>
                            <ControlLabel>END TIME</ControlLabel>
                            <p>{invite.endTime}</p>
                            <ControlLabel>LOCATION</ControlLabel>
                            <p>{this.props.user.address ? "   " + this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " + this.props.user.address.city : ''}</p>
                            <ControlLabel>NOTES</ControlLabel>
                            <p>{invite.notes}</p>
                            {buttons}
                        </form>
                    </div>
                    <div style={{width: '100%', height: '100%', marginTop: '48px', flex: '2'}}>
                        <GoogleMaps center={{
                            lat: this.props.user.address ? this.props.user.address.latitude : 0,
                            lng: this.props.user.address ? this.props.user.address.longitude : 0
                        }}
                                    sitters={[this.props.user]}
                                    oneMarker={true}
                                    zoom="14"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
