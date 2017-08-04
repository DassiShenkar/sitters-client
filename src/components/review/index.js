//external sources
import React from 'react';

//components
import ReviewBase from "../base/review/index";
import {Button, ControlLabel, FormControl, Image, Modal} from "react-bootstrap";
import Rating from "react-rating";


//style
import './style.css';

export default class Review extends ReviewBase {
    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.feed.filteredMatches[sitterIndex];
        return (
            <div id="edit-review">
                <Modal
                     show={this.props.feed.showReviewPopup}
                    onHide={this.closePopup.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="review-modal">
                            <div className="sitter-info">
                                <Image className="sitter-image" src={sitter? sitter.profilePicture: ''}  circle={true}/>
                                <h4 className="sitter-name">{sitter? sitter.name: ''}</h4>
                            </div>
                            <form>
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
                                <FormControl componentClass="textarea" placeholder="Notes" onChange={this.handleChange.bind(this)} />
                            </form>
                        </div>
                        <Button className="submit-review" title="Send Review" bsStyle="primary" onClick={this.sendReview}>Send Review</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}