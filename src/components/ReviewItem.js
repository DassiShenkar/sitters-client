import React from 'react';
import { Link } from 'react-router';

class ReviewItem extends React.Component {
    render() {
        const { review, index } = this.props;
        return (
            <div className="review-item">
                <Link to={`/review/${index}`}>
                    <img src={review.authorImage} alt={review.author}/>
                    <strong>{review.author}</strong>
                    <p>{review.content}</p>
                </Link>
            </div>
        )

    }
}

export default ReviewItem;