import React from 'react';

import {Image} from 'react-bootstrap';

import './style.css';
import Rating from "react-rating";

class ReviewItem extends React.Component {
    render() {
        const {review} = this.props;
        const date = new Date(review.date);
        let rates;
        if (review.rates) {
            rates = Object.keys(review.rates).map(function (key, index) {
                let category = key;
                if (key === "punctioal")
                    category = 'Punctioal';
                else if (key === "behavior")
                    category = 'Behavior with child';
                else if (key === "connection")
                    category = "Connection with child";
                else
                    category = "General behavior";
                return (
                    <li key={index}>
                        <p>{category}</p>
                        <Rating
                            empty="glyphicon glyphicon-heart-empty"
                            full="glyphicon glyphicon-heart"
                            className="pink"
                            initialRate={review.rates[key]}
                            readonly={true}/>
                    </li>
                )
            });
        }
        return (
            <div className="review-item">
                <div className="review-content">
                    <div className="review-info">
                        <Image className="profilePic"
                               src={review.parentImage}
                               alt={review.parentName} circle/>
                        <div>
                            <p><strong>{review.parentName}</strong></p>
                            <p className="review-date">{date.toLocaleDateString()}</p>
                        </div>
                    </div>
                    <ul>{rates}</ul>
                </div>
                <p>{review.description}</p>
            </div>
        )
    }
}

export default ReviewItem;