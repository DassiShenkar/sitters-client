import React from 'react';
import SitterListBase from '../base/SitterListBase'
import Like from '../styles/icons/Like'
import NextArrow from '../styles/icons/NextArrow'
import Star from '../styles/icons/Star'
class SitterList extends SitterListBase {
    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.likeSitter = this.likeSitter.bind(this);
        this.reviewSitter = this.reviewSitter.bind(this);
        console.log(props);
        this.state = {
            index: 0,
            sitters : props.sitters
        }
    }

    nextSitter(e) {// go to next sitter, if its the last sitter, go to the first one
        e.preventDefault();
        this.setState({index: this.state.index == (this.state.sitters.length -1) ? 0: (this.state.index +1)});
    }

    likeSitter(e) {
        e.preventDefault();
    }

    reviewSitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <p className="matchScore">{this.props.sitters[this.state.index].matchScore}% Match!</p>
                <img src={this.props.sitters[this.state.index].image}/>
                <p className="sitterName">{this.props.sitters[this.state.index].name}</p>
                <button onClick={this.likeSitter}><Like/></button>
                <button onClick={this.reviewSitter}><Star/></button>
                <button onClick={this.nextSitter}><NextArrow/></button>
            </div>
        )
    }
}
export default SitterList;
