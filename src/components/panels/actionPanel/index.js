import React from 'react';

import Like from '../../../styles/icons/Like';
import Star from '../../../styles/icons/Star';
import NextArrow from '../../../styles/icons/NextArrow';
import {history} from '../../../store';

//style
import './style.css';

class SitterActionBar extends React.Component {

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

    inviteSitter(e) {
        e.preventDefault();
       let sitter;
       sitter = this.props.feed.filteredMatches[this.props.feed.sitterIndex];
        this.props.actions.sitterProfileActions.setSitter(sitter);
        history.push('/editInvite');
        //let self = this;
        // axios.post('https://sitters-server.herokuapp.com/sitter/get', {
        //     _id: this.props.feed.filteredMatches[this.props.feed.sitterIndex]._id
        // })
        //     .then(function (sitter) {
        //         self.props.actions.sitterProfileActions.setSitter(sitter.data);
        //         history.push('/editInvite');
        //     })
        //     .catch(function (error) {
        //         console.log(error);//TODO: in case of sitter wasn't found
        //     });
    }

    reviewSitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div id="sitterActionBar">
                <button onClick={this.inviteSitter}><Like id="like"/></button>
                <button onClick={this.reviewSitter}><Star id="star"/></button>
                <button onClick={this.nextSitter}><NextArrow id="next"/></button>
            </div>
        )
    }
}

export default SitterActionBar;