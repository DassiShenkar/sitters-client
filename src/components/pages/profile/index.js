// external sources
import React from "react";
import geodist from "geodist";
import axios from "axios";
import * as _ from "lodash";

// components
import {Image, Table, Panel, Accordion} from "react-bootstrap";
import SitterActionBar from "../../panels/actionPanel";
import ReviewList from "../../reviewList/index";
import Invite from "../../invite/Invite";
import AccordionPanel from "../../controllers/accordion/index";
import strings from "../../../static/strings";
import Review from "../../review/index";
import MatchBanner from "../../banners/matchBanner";

// style
import './style.css';

class SitterProfile extends React.Component {

    componentWillMount() {
        let self = this;
        let sitterID = location.href.split('sitter/')[1];

        axios({
            method: 'post',
            url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'sitter/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: sitterID}
        })
            .then(function (sitter) {
                if (sitter.data) {
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

    addReview() {
        this.props.actions.feedActions.showReviewPopup(true);
    }

    displayMatchInfo(shouldDisplay) {
        this.props.actions.sitterProfileActions.displayMatchInfo(shouldDisplay);
    }

    render() {
        let self = this;
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function (day, index) {
            return (
                <tr key={index}>
                    <td>{day[0].toUpperCase() + day.slice(1)}</td>
                    <td>{_.join(self.props.sitterProfile.sitter.workingHours[day], ', ')}</td>
                </tr>
            )
        });
        let hobbies = null, education = null, languages = null, expertise = null, mobility = null;
        if (this.props.sitterProfile.sitter.hobbies.length > 0)
            hobbies = <AccordionPanel header="HOBBIES" list={this.props.sitterProfile.sitter.hobbies}/>;
        if (this.props.sitterProfile.sitter.mobility.length > 0)
            mobility = <AccordionPanel header="MOBILITY" list={this.props.sitterProfile.sitter.mobility}/>;
        if (this.props.sitterProfile.sitter.languages.length > 0)
            languages = <AccordionPanel header="LANGUAGES" list={this.props.sitterProfile.sitter.languages}/>;
        if (this.props.sitterProfile.sitter.education.length > 0)
            education = <AccordionPanel header="EDUCATION" list={this.props.sitterProfile.sitter.education}/>;
        if (this.props.sitterProfile.sitter.expertise.length > 0)
            expertise = <AccordionPanel header="EXPERTISE" list={this.props.sitterProfile.sitter.expertise}/>;
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : '';
        const lastInvite = this.props.sitterProfile.sitter ?
            <div className="last-invited">
                <p>{'Last Invite: ' + this.props.sitterProfile.sitter.lastInvite}</p>
            </div> : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        return (
            <div id="sitter-profile">
                <div className="match" style={style} onMouseEnter={this.displayMatchInfo.bind(this, true)} onMouseLeave={this.displayMatchInfo.bind(this, false)}>
                    <div className="cover-overlay"/>
                    <div className="sitter-info">
                        <Image className="profilePic"
                               src={this.props.sitterProfile.sitter.profilePicture ? this.props.sitterProfile.sitter.profilePicture : ''}
                               alt={this.props.sitterProfile.sitter.name ? this.props.sitterProfile.sitter.name : ''}
                               circle/>
                        <h1 className="sitterName">{this.props.sitterProfile.sitter.name ? this.props.sitterProfile.sitter.name : ''}</h1>
                    </div>
                    {this.props.sitterProfile.shouldDisplayMatchInfo ?
                        <MatchBanner parent={this.props.user} sitter={this.props.sitterProfile.sitter} matchScore={this.props.sitterProfile.matchData}/>
                        : ''
                    }
                    <SitterActionBar {...this.props}/>
                </div>
                <Table className="info-table" responsive>
                    <thead>
                    <tr>
                        <th>PROXIMITY</th>
                        <th>HOUR RATE</th>
                        <th>EXPERIENCE</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.sitterProfile.distance > 999 ? this.props.sitterProfile.distance / 1000 + ' KM' : +this.props.sitterProfile.distance + " Meters"}</td>
                        <td>{this.props.sitterProfile.sitter.hourFee + "$"}</td>
                        <td>{this.props.sitterProfile.sitter.experience + " Years"}</td>
                    </tr>
                    </tbody>
                </Table>
                <div className="sitter-details page">
                    {lastInvite}
                    <Accordion>
                        <Panel header="AVAILABILITY" eventKey="availability">
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
                    {mobility}
                    {education}
                    {languages}
                    {hobbies}
                    {expertise}
                    {this.props.sitterProfile.sitter.reviews.length > 0 ?
                        <Accordion>
                            <Panel header="REVIEWS" eventKey="reviews">
                                <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                            </Panel>
                        </Accordion> : ''}
                    <Invite {...this.props}/>
                    <Review {...this.props} />
                </div>
            </div>
        )
    }
}

export default SitterProfile;
