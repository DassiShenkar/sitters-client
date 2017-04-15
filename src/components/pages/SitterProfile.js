import React from 'react';
import SitterProfileBase from '../../base/SitterProfileBase'
import ReviewList from '../ReviewList';
import Nav from "../Nav";
// import * as ReviewActions from '../actions/ReviewActions';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import geodist from 'geodist';
import axios from 'axios';
class SitterProfile extends SitterProfileBase {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        // const { sitterId } = this.props.params;
        const author = this.refs.author.value;
        const review = this.refs.review.value;
        this.props.actions.reviewActions.addReview(author, review);
        this.refs.reviewForm.reset();
    }
    componentWillMount(){
        let sitterID = location.href.split('sitter/')[1];
        let self = this;
        axios.post('http://localhost:4444/sitter/get', {//TODO: change to server
           _id: sitterID
        })
            .then(function (sitter) {
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
            })
            .catch(function (error) {
                console.log(error);//TODO: in case of sitter wasn't found
            });

        // let parentCoord = {lat: this.props.user.address.latitude, lon: this.props.user.address.longitude};
        // let sitterCoord =  {lat: this.props.sitterProfile.sitter.address.latitude, lon: this.props.sitterProfile.sitter.address.longitude};;
        // this.props.actions.sitterProfileActions.setDistance( geodist( parentCoord,sitterCoord, {exact: true, unit: 'meters'}));
    }
    render() {
        // const reviews = this.props.reviews || [];
        let self = this;
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function(key, index) {
            return (
                <tr>
                    <td>{key[0].toUpperCase() + key.slice(1)}</td>
                    <td>{self.props.sitterProfile.sitter.workingHours[key].start}</td>
                    <td>{self.props.sitterProfile.sitter.workingHours[key].finish}</td>
                </tr>
            )
        });
        const hobbies = this.props.sitterProfile.sitter.hobbies.map((hobbie) =>{return(hobbie + ", ")});
        const education = this.props.sitterProfile.sitter.education.map((edu) =>{return(edu + ", ")});
        const languages = this.props.sitterProfile.sitter.languages.map((languages) =>{return(languages + ", ")});
        let parentCoord = {lat: this.props.user.address.latitude, lon: this.props.user.address.longitude};
        let sitterCoord =  {lat: this.props.sitterProfile.sitter.address.latitude, lon: this.props.sitterProfile.sitter.address.longitude};;
        if(typeof sitterCoord.lat !== "undefined")
            this.props.actions.sitterProfileActions.setDistance( geodist( parentCoord,sitterCoord, { unit: 'meters'}));
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
                </table>
                <h4>Availability</h4>
                <table>
                    <tr>
                        <td>Day</td>
                        <td>From</td>
                        <td>To</td>
                    </tr>
                    {workingHours}
                </table>
                <h4>Hobbies</h4>
                {hobbies}
                <h4>Education</h4>
                {education}
                <h4>Languages</h4>
                {languages}
                {/*<img src={this.props.profilePicture}/>*/}
                {/*<p>{this.props.name + "," + this.props.age}</p>*/}
                {/*<p>{this.props.matchScore + "% Match!"}</p>*/}
                {/*<section>*/}
                    {/*<p>{this.props.location}<span>Proximity</span></p>*/}
                    {/*<p>{this.props.hourFee}$<span>Hour fee</span></p>*/}
                    {/*<p>{this.props.experience}years<span>Experience</span></p>*/}
                {/*</section>*/}
                {/*<ReviewList reviews={reviews} {...this.props}/>*/}
                {/*<form ref="reviewForm" className="reviewForm" onSubmit={this.handleSubmit}>*/}
                    {/*<input type="text" ref="author" placeholder="author"/>*/}
                    {/*<input type="text" ref="review" placeholder="review"/>*/}
                    {/*<input type="submit" hidden/>*/}
                {/*</form>*/}
            </div>
        )
    }
}

export default SitterProfile;
