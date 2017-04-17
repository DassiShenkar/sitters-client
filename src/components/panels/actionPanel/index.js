import React from 'react';

import Like from '../../../styles/icons/Like';
import Star from '../../../styles/icons/Star';
import NextArrow from '../../../styles/icons/NextArrow';

//style
import './style.css';
import EditInvite from "../invite/oldInvite";
import Invite from "../invite/Invite";

class SitterActionBar extends EditInvite {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.inviteSitter = this.inviteSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex +1;
        this.props.actions.feedActions.setSitterIndex(index);
    }
    handleChange(event){
        this.props.actions.inviteActions.setNotes(event.target.value);
    }

    inviteSitter(e) {
        e.preventDefault();
        let sitter;
        sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        this.props.actions.feedActions.showInvitePopup(true);
    }

    reviewSitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="sitterActionBar">
                    <button onClick={this.inviteSitter}><Like id="like"/></button>
                    <button onClick={this.reviewSitter}><Star id="star"/></button>
                    <button onClick={this.nextSitter}><NextArrow id="next"/></button>
                </div>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterActionBar;