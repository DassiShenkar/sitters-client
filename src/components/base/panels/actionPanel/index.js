// external sources
import React from "react";

export default class ActionBarBase extends React.Component {
    constructor(props) {
        super(props);
        this.inviteSitter = this.inviteSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
        this.sitterProfile = this.sitterProfile.bind(this);
        this.shouldReview = this.shouldReview.bind(this);
    }

    inviteSitter(e) {
        e.preventDefault();
        const sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        this.props.actions.feedActions.showInvitePopup(true);
    }

    reviewSitter(e) {
        e.preventDefault();
        this.props.actions.feedActions.showReviewPopup(true);
    }

    sitterProfile(e) {
        e.preventDefault();
        this.props.router.push('/sitter/' + this.props.feed.filteredMatches[this.props.feed.sitterIndex]._id);
    }

    shouldReview() {
        const self = this;
        return self.props.user.invites.find(invite => {
            return invite.sitterID === self.props.feed.matches[self.props.feed.sitterIndex]._id;
        });
    }
}