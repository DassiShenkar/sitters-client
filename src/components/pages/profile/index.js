import React from "react";
import SitterProfileBase from "../../../base/SitterProfileBase";
import ReviewList from "../../reviewList/index";
import Nav from "../../panels/nav/index";
import geodist from "geodist";
import axios from "axios";
import {Button, Image} from "react-bootstrap";
import Invite from "../../invite/Invite";

import './style.css';

class SitterProfile extends SitterProfileBase {

    componentWillMount(){
        let sitterID = location.href.split('sitter/')[1];
        let self = this;
        axios.post('https://sitters-server.herokuapp.com/sitter/get', {
            _id: sitterID
        })
            .then(function (sitter) {
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
                let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
                let sitterCoord =  {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};;
                self.props.actions.sitterProfileActions.setDistance( geodist( parentCoord,sitterCoord, { unit: 'meters'}));
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
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function(key, index) {
            return (
                <tr key={index}>
                    <td>{key[0].toUpperCase() + key.slice(1)}</td>
                    <td>{self.props.sitterProfile.sitter.workingHours[key].start}</td>
                    <td>{self.props.sitterProfile.sitter.workingHours[key].finish}</td>
                </tr>
            )
        });
        const hobbies = this.props.sitterProfile.sitter.hobbies.map((hobbie) =>{return(hobbie + ", ")});
        const education = this.props.sitterProfile.sitter.education.map((edu) =>{return(edu + ", ")});
        const languages = this.props.sitterProfile.sitter.languages.map((languages) =>{return(languages + ", ")});
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        return (
            <div>
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     action={this.props.actions.feedActions.setNavView}
                     {...this.props}/>
                <div className="match" style={style}>
                        <div className="sitter-info">
                            <Image className="profilePic"
                                   src={this.props.sitterProfile.sitter.profilePicture ? this.props.sitterProfile.sitter.profilePicture : ''}
                                   alt={this.props.sitterProfile.sitter.name ? this.props.sitterProfile.sitter.name : ''} circle/>
                            <h3 className="sitterName">{this.props.sitterProfile.sitter.name + ", " + this.props.sitterProfile.sitter.age}</h3>
                        </div>
                </div>

                {/*<section>*/}
                    {/*<Image className="profilePic" src={this.props.sitterProfile.sitter.profilePicture}*/}
                         {/*alt={this.props.sitterProfile.sitter.name} circle/>*/}
                    {/*<p>{this.props.sitterProfile.sitter.name + ", " + this.props.sitterProfile.sitter.age}</p>*/}
                {/*</section>*/}
                <table>
                    <tbody>
                    <tr>
                        <td>{this.props.sitterProfile.distance + " Meters"}</td>
                        <td>{this.props.sitterProfile.sitter.hourFee + "$"}</td>
                        <td>{this.props.sitterProfile.sitter.experience + " Years"}</td>
                    </tr>
                    <tr>
                        <td>Proximity</td>
                        <td>Hour Fee</td>
                        <td>Experience</td>
                    </tr>
                    </tbody>
                </table>
                <h4>Availability</h4>
                <table>
                    <tbody>
                    <tr>
                        <td>Day</td>
                        <td>From</td>
                        <td>To</td>
                    </tr>
                    {workingHours}
                    </tbody>
                </table>
                {hobbies.length>0? <h4>Hobbies</h4>: ""}
                {hobbies}
                {education.length> 0? <h4>Education</h4>: ""}
                {education}
                {languages.length> 0? <h4>Languages</h4>: ""}
                {languages}
                <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                <Button onClick={this.inviteSitter.bind(this)} title="Send Invite" bsStyle="primary" >Send Invite</Button>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterProfile;
