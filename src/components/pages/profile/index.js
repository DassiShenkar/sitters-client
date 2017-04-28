// external sources
import React from "react";
import geodist from "geodist";
import axios from "axios";

import {Button, Image, Table, Panel, Accordion, ControlLabel, FormControl} from "react-bootstrap";


// components
import SitterProfileBase from "../../../base/SitterProfileBase";
import ReviewList from "../../reviewList/index";
import Invite from "../../invite/Invite";
import Mail from "../../../styles/icons/Mail";

// style
import './style.css';
import StringsAccordion from "../../StringsAccordion";

class SitterProfile extends SitterProfileBase {

    median(values) {

        values.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }

    componentDidMount() {
        let parent = this.props.user;
        const id = this.props.params.sitterId;
        parent.matchBI.matchScores.push(this.props.feed.matches.find(function (sitter) {
            return sitter._id === id;
        }).matchScore);
        parent.matchBI.median = this.median(parent.matchBI.matchScores);
        axios({
            method: 'post',
            url: 'http://localhost:4444/parent/update',
            // url: 'https://sitters-server.herokuapp.com/parent/update',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: parent
        }).then(function (res) {
            if (res.data) {  // user created
            }
            else {
                console.log("parentBI not updated");
                //TODO: think about error
            }
        })
            .catch(function (error) {
                alert(error);
                //TODO: think about error
            });
    }

    componentWillMount() {
        let self = this;
        let sitterID = location.href.split('sitter/')[1];

        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/sitter/get',
            url: 'http://localhost:4444/sitter/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: sitterID}
        })
            .then(function (sitter) {
                if(sitter.data){
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
                let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
                let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
                self.props.actions.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'}));
                }
            })
            .catch(function (error) {
                console.log(error);//TODO: in case of sitter wasn't found
            });
    }

    handleChangeReview(e) {
        this.props.actions.sitterProfileActions.setReviewDescription(e.target.value);
    }

    inviteSitter(e) {
        e.preventDefault();
        let sitter;
        sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        this.props.actions.feedActions.showInvitePopup(true);
    }

    addReview() {
        let sitter = this.props.sitterProfile.sitter;
        let review = {
            parentID: this.props.user._id,
            sitterID: sitter._id,
            description: this.props.sitterProfile.reviewDescription,
            parentImage: this.props.user.profilePicture
        };
        sitter.reviews.push(review);
        let self = this;
        axios({
            method: 'post',
            url: 'http://localhost:4444/sitter/update',
            // url: 'https://sitters-server.herokuapp.com/sitter/update',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
        }).then(function (res) {
            if (res.data) {
                console.log('Added review');
                self.props.actions.sitterProfileActions.setReviewDescription(' ');
                self.props.actions.sitterProfileActions.setExpandReview(false);
            }
            else {
                console.log("user not created");
                //TODO: think about error when user not created
            }
        })
            .catch(function (error) {
                console.log(error);
                //TODO: think about error when user not created
            });
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
        let hobbies = null, education = null, languages = null, expertise = null;
        if (this.props.sitterProfile.sitter.hobbies.length > 0)
            hobbies = <StringsAccordion header="+ Hobbies" data={this.props.sitterProfile.sitter.hobbies}/>;
        if (this.props.sitterProfile.sitter.languages.length > 0)
            languages = <StringsAccordion header="+ Languages" data={this.props.sitterProfile.sitter.languages}/>;
        if (this.props.sitterProfile.sitter.education.length > 0)
            education = <StringsAccordion header="+ Education" data={this.props.sitterProfile.sitter.education}/>;
        if (this.props.sitterProfile.sitter.expertise.length > 0)
            expertise = <StringsAccordion header="+ Expertise" data={this.props.sitterProfile.sitter.expertise}/>;
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        const sitterAddress = this.props.sitterProfile.sitter.address.street + " " +  this.props.sitterProfile.sitter.address.houseNumber + ", " + this.props.sitterProfile.sitter.address.city;
        return (
            <div id="sitter-profile">
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
                    </Panel>
                </Accordion>
                {education}
                {languages}
                {hobbies}
                {expertise}
                <ControlLabel>Address</ControlLabel>
                <p>{sitterAddress}</p>
                <ControlLabel>Last Invited:</ControlLabel>
                <p>{this.props.sitterProfile.sitter.lastInvite}</p>
                <Accordion>
                    <Panel header="+ Reviews" eventKey="reviews">
                        <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                    </Panel>
                </Accordion>
                <Accordion defaultExpanded={this.props.sitterProfile.expandReview? this.props.sitterProfile.expandReview: false}>
                    <Panel header="+ Add Review" eventKey="addReview">
                        <ControlLabel>{'Your story with ' + this.props.sitterProfile.sitter.name}</ControlLabel>
                        <FormControl autoFocus={this.props.sitterProfile.expandReview?this.props.sitterProfile.expandReview:false} componentClass="textarea"
                                     placeholder="textarea" onChange={this.handleChangeReview.bind(this)}/>
                        <Button className="add-review" title="Add Review" bsStyle="primary"
                                onClick={this.addReview.bind(this)}>Add Review</Button>
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
