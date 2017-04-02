import React from 'react';

class SingleReview extends React.Component{
    render() {
        const reviewId = this.props.params.reviewId;
        const review = this.props.reviews.filter((review) => review.id == reviewId)[0];
        return (
            <div className="single-review">
                {review.content}
            </div>
        )
    }
}

export default SingleReview;
