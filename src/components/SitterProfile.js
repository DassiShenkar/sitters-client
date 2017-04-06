import React from 'react';
import SitterProfileBase from '../base/SitterProfileBase'
import ReviewList from './ReviewList';
import * as ReviewActions from '../actions/ReviewActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

    render() {
        const reviews = this.props.reviews || [];
        return (
            <div>
                {/*<img src={this.props.profilePicture}/>*/}
                {/*<p>{this.props.name + "," + this.props.age}</p>*/}
                {/*<p>{this.props.matchScore + "% Match!"}</p>*/}
                {/*<section>*/}
                    {/*<p>{this.props.location}<span>Proximity</span></p>*/}
                    {/*<p>{this.props.hourFee}$<span>Hour fee</span></p>*/}
                    {/*<p>{this.props.experience}years<span>Experience</span></p>*/}
                {/*</section>*/}
                <ReviewList reviews={reviews} {...this.props}/>
                <form ref="reviewForm" className="reviewForm" onSubmit={this.handleSubmit}>
                    <input type="text" ref="author" placeholder="author"/>
                    <input type="text" ref="review" placeholder="review"/>
                    <input type="submit" hidden/>
                </form>
            </div>
        )
    }
}

export default SitterProfile;
