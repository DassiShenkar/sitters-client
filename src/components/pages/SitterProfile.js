import React from 'react';
import SitterProfileBase from '../../base/SitterProfileBase'
import ReviewList from '../ReviewList';
import Nav from "../nav/index";
// import * as ReviewActions from '../actions/ReviewActions';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import geodist from 'geodist';
import axios from 'axios';
import {Link} from "react-router";
import {Button} from "react-bootstrap";
class SitterProfile extends SitterProfileBase {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        let sitterID = location.href.split('sitter/')[1];
        let self = this;
        axios.post('https://sitters-server.herokuapp.com/sitter/get', {
            _id: sitterID
        })
            .then(function (sitter) {
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
            })
            .catch(function (error) {
                console.log(error);//TODO: in case of sitter wasn't found
            });
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
        // let parentCoord = {lat: this.props.user.address.latitude, lon: this.props.user.address.longitude};
        // let sitterCoord =  {lat: this.props.sitterProfile.sitter.address.latitude, lon: this.props.sitterProfile.sitter.address.longitude};;
        // if(typeof sitterCoord.lat !== "undefined") // TODO: working but giving a lot of warnings in console
        //     this.props.actions.sitterProfileActions.setDistance( geodist( parentCoord,sitterCoord, { unit: 'meters'}));
        return (
            <div>
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     action={this.props.actions.feedActions.setNavView}
                     {...this.props}/>
                <section>
                    <img src={this.props.sitterProfile.sitter.profilePicture}
                         alt={this.props.sitterProfile.sitter.name}/>
                    <p>{this.props.sitterProfile.sitter.name + ", " + this.props.sitterProfile.sitter.age}</p>
                </section>
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
                <h4>Hobbies</h4>
                {hobbies}
                <h4>Education</h4>
                {education}
                <h4>Languages</h4>
                {languages}
                <ReviewList reviews={this.props.sitterProfile.sitter.reviews} {...this.props}/>
                <Link to="/editInvite">
                    <Button title="Send Invite" bsStyle="primary" >Send Invite</Button>
                </Link>
            </div>
        )
    }
}

export default SitterProfile;
