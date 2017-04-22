import React from 'react';
import ReviewItem from './reviewItem/index';

class ReviewList extends React.Component {
    render() {
        return (
            <div className="review-list">
                <h3>Reviews</h3>
                {this.props.sitterProfile.sitter.reviews.map((review, index) => <ReviewItem {...this.props} key={index} index={index} review={review}/>)}
            </div>
        )
    }
}

export default ReviewList;