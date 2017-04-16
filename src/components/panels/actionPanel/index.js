import React from 'react';

import Like from '../../../styles/icons/Like';
import Star from '../../../styles/icons/Star';
import NextArrow from '../../../styles/icons/NextArrow';
import {Link} from "react-router";
import {Button} from "react-bootstrap";

//style
// import './style.css';

class SitterActionBar extends React.Component {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.likeSitter = this.likeSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex +1;
        this.props.actions.feedActions.setSitterIndex(index);
    }

    likeSitter(e) {
        e.preventDefault();
    }

    reviewSitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div id="sitterActionBar">
                <Link to="/editInvite">
                    <Button title="Send Invite" bsStyle="primary" ><Like id="like"/></Button>
                </Link>
                <button onClick={this.reviewSitter}><Star id="star"/></button>
                <button onClick={this.nextSitter}><NextArrow id="next"/></button>
            </div>
        )
    }
}

export default SitterActionBar;