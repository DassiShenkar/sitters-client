import React from 'react';

import Like from '../styles/icons/Like';
import Star from '../styles/icons/Star';
import NextArrow from '../styles/icons/NextArrow';

class SitterActionBar extends React.Component {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.likeSitter = this.likeSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        // this.setState({index: this.state.index === (this.state.sitters.length - 1) ? 0 : (this.state.index + 1)});
    }

    likeSitter(e) {
        e.preventDefault();
    }

    reviewSitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="sitterActionBar">
                <button onClick={this.likeSitter}><Like/></button>
                <button onClick={this.reviewSitter}><Star/></button>
                <button onClick={this.nextSitter}><NextArrow/></button>
            </div>
        )
    }
}

export default SitterActionBar;