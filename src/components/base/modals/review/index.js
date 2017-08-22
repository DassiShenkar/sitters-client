//external sources
import React from 'react';
import uuid from 'uuid';

//utils
import {request} from '../../../../utils/requestHandler';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";

export default class ReviewBase extends React.Component {
    constructor(props) {
        super(props);
        this.sendReview = this.sendReview.bind(this);
    }

    handleChange(e){
        this.props.actions.feedActions.changeReviewText(e.target.value);
    }

    sendReview(e) {
        e.preventDefault();
        let sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        let review = {
            _id: uuid.v1(),
            sitterID: sitter._id,
            parentID: this.props.user._id,
            parentImage: this.props.user.profilePicture,
            parentName: this.props.user.name,
            description: this.props.feed.review.text,
            rates: this.props.feed.review.rates
        };
        sitter.reviews.push(review);
        let self = this;
        request('put', sittersApi.UPDATE_USER, sitter, function(result){
            if (result.data)
                self.props.actions.feedActions.showReviewPopup(false); // close review modal
        });
    };

    closePopup(){
        this.props.actions.feedActions.showReviewPopup(false)
    }
    onChangeRate(category,rate){
        this.props.actions.feedActions.changeReviewRate(category,rate)
    }
}