import React from 'react';

import { Image } from 'react-bootstrap';

import './style.css';
import Rating from "react-rating";
class ReviewItem extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { review, index } = this.props;
        const date = new Date(review.date);
        const rates = Object.keys(review.rates).map(function(key) {
            return (
                <div>
                    <h4>{key}</h4>
                    <Rating
                        empty="glyphicon glyphicon-heart-empty"
                        full="glyphicon glyphicon-heart"
                        className="pink"
                        initialRate={review.rates[key]}
                        readonly={true}/>
                </div>
            )
        });
        return (
            <div className="review-item">
                <Image className="profilePic"
                       src={review.parentImage}
                       alt={review.parentName} circle/>
                <strong>{review.parentName}</strong>
                <h4>Rates</h4>
                {rates}
                <p>{date.toLocaleDateString()}</p>
            </div>
        )
    }
}

export default ReviewItem;