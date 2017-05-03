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
            let category = key;
            if(key === "punctioal")
                category = 'Punctioal';
            else if(key === "behavior")
                category = 'Behavior with child';
            else if(key === "connection")
                category = "Connection with child";
                else
                category = "General behavior";
            return (
                <div>
                    <h4>{category}</h4>
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
                <p>{date.toLocaleDateString()}</p>
                {rates}

            </div>
        )
    }
}

export default ReviewItem;