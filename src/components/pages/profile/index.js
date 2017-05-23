// external sources
import React from "react";
import geodist from "geodist";
import axios from "axios";

import { Image, Table, Panel, Accordion, ControlLabel} from "react-bootstrap";


// components
import ReviewList from "../../reviewList/index";
import Invite from "../../invite/Invite";
import Mail from "../../icons/Mail";

// style
import './style.css';
import AccordionPanel from "../../controllers/accordion/index";
import strings from "../../../static/strings";
import Review from "../../review/index";
import Like from "../../icons/Like";

class SitterProfile extends React.Component {

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
        if(strings.ACTIVATE_MEDIAN){
            let parent = this.props.user;
            const id = this.props.params.sitterId;
            parent.matchBI.matchScores.push(this.props.feed.matches.find(function (sitter) {
                return sitter._id === id;
            }).matchScore);
            parent.matchBI.median = this.median(parent.matchBI.matchScores);
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/update',
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
    }

    componentWillMount() {
        let self = this;
        let sitterID = location.href.split('sitter/')[1];

        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/get',
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
        let sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        this.props.actions.feedActions.showInvitePopup(true);
    }

    addReview() {
        this.props.actions.feedActions.showReviewPopup(true);
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
            hobbies = <AccordionPanel header="+ Hobbies" list={this.props.sitterProfile.sitter.hobbies}/>;
        if (this.props.sitterProfile.sitter.languages.length > 0)
            languages = <AccordionPanel header="+ Languages" list={this.props.sitterProfile.sitter.languages}/>;
        if (this.props.sitterProfile.sitter.education.length > 0)
            education = <AccordionPanel header="+ Education" list={this.props.sitterProfile.sitter.education}/>;
        if (this.props.sitterProfile.sitter.expertise.length > 0)
            expertise = <AccordionPanel header="+ Expertise" list={this.props.sitterProfile.sitter.expertise}/>;
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : '';
        const lastInvite = this.props.sitterProfile.sitter?
            <div className="last-invited">
                <ControlLabel>Last Invited:</ControlLabel>
                <p>{this.props.sitterProfile.sitter.lastInvite}</p>
            </div>:'';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
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
                <Table className="info-table" responsive>
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
                <div className="sitter-details">
                    {lastInvite}
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
                    {/*<ControlLabel>Address</ControlLabel>*/}
                    {/*<p>{sitterAddress}</p>*/}

                    {this.props.sitterProfile.sitter.reviews.length > 0?
                        <Accordion>
                            <Panel header="+ Reviews" eventKey="reviews">
                                <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                            </Panel>
                        </Accordion>:''}
                    <div className="profile-buttons">
                        <button id="review-button" onClick={this.addReview.bind(this)}>
                            <Like id="like-icon"/>
                            <span>Write Review</span>
                        </button>
                        <button id="invite-button" onClick={this.inviteSitter.bind(this)}>
                            <Mail id="mail-icon"/>
                            <span>Send Invite</span>
                        </button>
                    </div>
                    <Invite {...this.props}/>
                    <Review {...this.props} />
                </div>
            </div>
        )
    }
}

export default SitterProfile;
