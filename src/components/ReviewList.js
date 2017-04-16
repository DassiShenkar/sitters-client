import React from 'react';
import ReviewItem from './ReviewItem';

class ReviewList extends React.Component {
    render() {
        return (
            <div className="review-list">
                {this.props.sitterProfile.sitter.reviews.map((review, index) => <ReviewItem {...this.props} key={index} index={index} review={review}/>)}
            </div>
        )
    }
}

export default ReviewList;