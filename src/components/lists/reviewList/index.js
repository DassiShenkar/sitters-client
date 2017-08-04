//external sources
import React from 'react';

//components
import ReviewItem from './reviewItem/index';

export default class ReviewList extends React.Component {
    render() {
        return (
            <div className="review-list">
                {this.props.sitterProfile.sitter.reviews.map((review, index) => <ReviewItem {...this.props} key={index} index={index} review={review}/>)}
            </div>
        )
    }
}