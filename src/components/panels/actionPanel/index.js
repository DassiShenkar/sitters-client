import React from 'react';

import CircledMail from '../../../styles/icons/CircledMail';
import Like from '../../../styles/icons/Like';
import NextArrow from '../../../styles/icons/NextArrow';
import axios from 'axios';

//style
import './style.css';
import Invite from "../../invite/Invite";

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
        let parent = this.props.user;
        parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id);
        this.props.actions.actionCreators.setUserData(parent);
        //Todo: call blacklistSitter(parentID, sitterID) for this parent
        //axios.post('https://sitters-server.herokuapp.com/parent/get', {
        axios({
            method: 'post',
            // url: 'http://localhost:4444/parent/update',
            url: 'https://sitters-server.herokuapp.com/parent/update',
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
        this.props.actions.sitterProfileActions.setExpandReview(true);
        this.props.router.push('/sitter/' + this.props.feed.matches[this.props.feed.sitterIndex]._id);
    }

    render() {
        return (
            <div id="sitterActionBar">
                    <button id="mail" onClick={this.inviteSitter}><CircledMail id="mail-icon"/></button>
                    <button onClick={this.reviewSitter}><Like id="like-icon"/></button>
                    <button onClick={this.nextSitter}><NextArrow id="next-icon"/></button>
                <Invite {...this.props}/>
            </div>
        )
    }
}

export default SitterActionBar;