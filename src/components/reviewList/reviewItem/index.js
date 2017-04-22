import React from 'react';
import { Link } from 'react-router';

import { Image } from 'react-bootstrap';

import './style.css';

class ReviewItem extends React.Component {
    render() {
        const { review, index } = this.props;
        const date = new Date(review.date);
        return (
            <div className="review-item">
                <Link to={`/review/${index}`}>
                    <Image className="profilePic"
                           src={review.authorImage}
                           alt={review.author} circle/>
                    <strong>{review.author}</strong>
                </Link>
                <p>{date.toLocaleDateString()}</p>
                <p>{review.content}</p>
            </div>
        )
    }
}

export default ReviewItem;