import React from 'react';
import Review from './Review';

class Reviews extends React.Component {
    render() {
        return (
            <div className="review-list">
                {this.props.reviews.map((review, index) => <Review {...this.props} key={index} index={index} review={review}/>)}
            </div>
        )
    }
}

export default Reviews;