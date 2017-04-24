// external sources
import React from "react";
import geodist from "geodist";
import axios from "axios";

import {Button, Image, Table, Panel, Accordion} from "react-bootstrap";

// components
import SitterProfileBase from "../../../base/SitterProfileBase";
import ReviewList from "../../reviewList/index";
import Nav from "../../panels/nav/index";
import Invite from "../../invite/Invite";
import Mail from "../../../styles/icons/Mail";

// style
import './style.css';

class SitterProfile extends SitterProfileBase {

    componentWillMount() {
        let sitterID = location.href.split('sitter/')[1];
        let self = this;
        axios.post('https://sitters-server.herokuapp.com/sitter/get', {
            _id: sitterID
        })
            .then(function (sitter) {
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
                let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
                let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
                self.props.actions.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'}));
            })
            .catch(function (error) {
                console.log(error);//TODO: in case of sitter wasn't found
            });
    }

    inviteSitter(e) {
        e.preventDefault();
        let sitter;
        sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        this.props.actions.feedActions.showInvitePopup(true);
    }

    render() {
        let self = this;
        const id = this.props.params.sitterId;
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function (key, index) {
            return (
                <tr key={index}>
                    <td>{key[0].toUpperCase() + key.slice(1)}</td>
                    <td>{self.props.sitterProfile.sitter.workingHours[key].start + '-' + self.props.sitterProfile.sitter.workingHours[key].finish}</td>
                </tr>
            )
        });
        const hobbies = this.props.sitterProfile.sitter.hobbies.map((hobbie) => {
            return (hobbie + ", ")
        });
        const education = this.props.sitterProfile.sitter.education.map((edu) => {
            return (edu + ", ")
        });
        const languages = this.props.sitterProfile.sitter.languages.map((languages) => {
            return (languages + ", ")
        });
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        return (
            <div id="sitter-profile">
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     action={this.props.actions.feedActions.setNavView}
                     {...this.props}/>
                <div className="match" style={style}>
                    <div className="sitter-info">
                        <h1 className="matchScore">{this.props.sitterProfile.sitter ? this.props.feed.matches.find(function (sitter) {
                                return sitter._id === id;
                            }).matchScore + '% Match!' : 'no matches found'}</h1>
                        <Image className="profilePic"
                               src={this.props.sitterProfile.sitter.profilePicture ? this.props.sitterProfile.sitter.profilePicture : ''}
                               alt={this.props.sitterProfile.sitter.name ? this.props.sitterProfile.sitter.name : ''}
                               circle/>
                        <h3 className="sitterName">{this.props.sitterProfile.sitter.name + ", " + this.props.sitterProfile.sitter.age}</h3>
                    </div>
                </div>
                <Table id="info-table" responsive>
                    <thead>
                    <tr>
                        <th>{this.props.sitterProfile.distance > 999 ? this.props.sitterProfile.distance / 1000 + ' KM' : +this.props.sitterProfile.distance + " Meters"}</th>
                        <th>{this.props.sitterProfile.sitter.hourFee + "$"}</th>
                        <th>{this.props.sitterProfile.sitter.experience + " Years"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Proximity</td>
                        <td>Hour Fee</td>
                        <td>Experience</td>
                    </tr>
                    </tbody>
                </Table>
                <Accordion>
                    <Panel header="+ Availability" eventKey="availability">
                        <Table id="availability-table" responsive>
                            <thead>
                            <tr>
                                <th>Day</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {workingHours}
                            </tbody>
                        </Table>
                        {hobbies.length > 0 ? <h4>Hobbies</h4> : ""}
                        {hobbies}
                        {education.length > 0 ? <h4>Education</h4> : ""}
                        {education}
                        {languages.length > 0 ? <h4>Languages</h4> : ""}
                        {languages}
                    </Panel>
                </Accordion>
                <Accordion>
                    <Panel header="+ Reviews" eventKey="reviews">
                        <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                    </Panel>
                </Accordion>
                <button id="invite-button" onClick={this.inviteSitter.bind(this)}>
                    <Mail id="mail-icon"/>
                    <span>Send Invite</span>
                </button>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterProfile;