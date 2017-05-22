import React from "react";

import CircledMail from "../../icons/CircledMail";
import Like from "../../icons/Like";
import NextArrow from "../../icons/NextArrow";
import axios from "axios";
//style
import "./style.css";
import Invite from "../../invite/Invite";
import strings from "../../../static/strings";

class SitterActionBar extends React.Component {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.inviteSitter = this.inviteSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        if(strings.ACTIVATE_BLACKLIST){
            let parent = this.props.user;
            parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id);
            this.props.actions.actionCreators.setUserData(parent);
            //Todo: call blacklistSitter(parentID, sitterID) for this parent
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/update',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: parent
            }).then(function (res) {
                if (res.data) {  // user created
                    console.log('updated blacklist');
                }
                else { // user not created
                    console.log("user not created");
                    //TODO: think about error when user not created
                }
            })
                .catch(function (error) {
                    alert(error);
                    //TODO: think about error when user not created
                });

        }
        this.props.actions.feedActions.setSitterIndex(index);
    }

    handleChange(event) {
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
        // this.props.actions.sitterProfileActions.setExpandReview(true);
        // this.props.router.push('/sitter/' + this.props.feed.matches[this.props.feed.sitterIndex]._id);
            this.props.actions.feedActions.showReviewPopup(true);
    }

    render() {
        return (
            <div id="sitterActionBar">
                <button onClick={this.inviteSitter}><span className="icon-envelope action-icon"/></button>
                <button onClick={this.reviewSitter}><span className="icon-user"/></button>
                <button onClick={this.nextSitter}><span className="icon-heart"/></button>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterActionBar;