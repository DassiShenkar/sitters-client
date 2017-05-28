// external sources
import React from "react";

// style
import "./style.css";
import Invite from "../../invite/Invite";
import * as _ from "lodash";

class SitterActionBar extends React.Component {

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
        return this.props.user.invites.find(invite => {
            return invite.sitterID === this.props.feed.matches[this.props.feed.sitterIndex]._id;
        })
    }

    render() {
        return (
            <div id="sitterActionBar">
                <button onClick={this.inviteSitter}><span className="icon-envelope action-icon"/></button>
                <button className={this.props.router.getCurrentLocation().pathname.includes('sitter') ? 'selected' : 'unselected'} onClick={this.sitterProfile}><span className='icon-user'/></button>
                <button className={this.shouldReview() ? 'enabled': 'disabled'} onClick={this.shouldReview() ? this.reviewSitter : _.noop()}><span className='icon-heart'/></button>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterActionBar;