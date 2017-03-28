import React from 'react';
import {Link} from 'react-router';

class Review extends React.Component {
    render() {
        return (
            <div className="review-item">
                <Link to={`/reviews/${this.props.review.id}`}/>
                {this.props.review.content}
            </div>
        )

    }
}

export default Review;