import React from 'react';
import uuid from 'uuid';

//style
import './style.css';
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import DatePicker from "../controllers/DatePicker";
import TimeInput from "../controllers/TimeInput";
import GoogleMaps from "../GoogleMaps";
import axios from 'axios';
import Rating from "react-rating";
import strings from "../../static/strings";


class Review extends React.Component {

    constructor(props) {
        super(props);
        this.sendReview = this.sendReview.bind(this);
    }

    handleChange(e){
        this.props.actions.feedActions.changeReviewText(e.target.value);
    }

    sendReview(e) {
        e.preventDefault();
        let sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
            let review = {
                _id: uuid.v1(),
                sitterID:   sitter._id,
                parentID:   this.props.user._id,
                parentImage:    this.props.user.profilePicture,
                parentName: this.props.user.name,
                description:  this.props.feed.review.text,
                rates: this.props.feed.review.rates
            };
            sitter.reviews.push(review);

            let self = this;
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/update',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: sitter
            }).then(function (res) {
                console.log(res);
                if (res.data) {
                    console.log("review added");
                    this.props.actions.feedActions.showReviewPopup(false);
                }
                else { // invite not created
                    //TODO: think about error when user not created
                }
            })
                .catch(function (error) {
                    console.log(error);
                    //TODO: think about error when user not created
                });
    };

    closePopup(){
        this.props.actions.feedActions.showReviewPopup(false)
    }
    onChangeRate(category,rate){
        this.props.actions.feedActions.changeReviewRate(category,rate)
    }

    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.feed.filteredMatches[sitterIndex];
        return (
            <div>
                <Modal
                     show={this.props.feed.showReviewPopup}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Send Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <Image className="sitter-image" src={sitter? sitter.profilePicture: ''}  circle={true}/>
                                <h4 className="sitter-name">{sitter? sitter.name: ''}</h4>
                                <ControlLabel>Punctioal</ControlLabel>
                                <Rating
                                    empty="glyphicon glyphicon-heart-empty"
                                    full="glyphicon glyphicon-heart"
                                    className="pink"
                                    onChange={this.onChangeRate.bind(this, "punctioal")}
                                    initialRate={this.props.feed.review.rates.punctioal}/>
                                <ControlLabel>Behavior with child</ControlLabel>
                                <Rating
                                    empty="glyphicon glyphicon-heart-empty"
                                    full="glyphicon glyphicon-heart"
                                    className="pink"
                                    onChange={this.onChangeRate.bind(this, "behavior")}
                                    initialRate={this.props.feed.review.rates.behavior}/>
                                <ControlLabel>Connection with child</ControlLabel>
                                <Rating
                                    empty="glyphicon glyphicon-heart-empty"
                                    full="glyphicon glyphicon-heart"
                                    className="pink"
                                    onChange={this.onChangeRate.bind(this, "connection")}
                                    initialRate={this.props.feed.review.rates.connection}/>
                                <ControlLabel>General behavior</ControlLabel>
                                <Rating
                                    empty="glyphicon glyphicon-heart-empty"
                                    full="glyphicon glyphicon-heart"
                                    className="pink"
                                    onChange={this.onChangeRate.bind(this,"general")}
                                    initialRate={this.props.feed.review.rates.general}/>
                                <ControlLabel>Review</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="textarea" onChange={this.handleChange.bind(this)} />
                                <Button className="submit-review" title="Send Review" bsStyle="primary" onClick={this.sendReview}>Send Review</Button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Review;