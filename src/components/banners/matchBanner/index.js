//external sources
import React from 'react';
import * as _ from "lodash";

//components
import {Image} from 'react-bootstrap';
import ReactBarChart from '../../charts/barChart/index';
import TagsList from '../../lists/tagsList';

// style
import './style.css';

class MatchBanner extends React.Component {
    render() {
        const matchingWords = _.union(this.props.sitter.personality, this.props.parent.personality);
        return (
            <div className="match-info">
                <div className="match-criteria">
                    <h4>MATCH CRITERIA</h4>
                    <ReactBarChart data={this.props.matchScore.data}/>
                </div>
                <div className="match-images">
                    <h1>{this.props.matchScore.matchScore + '% Match'}</h1>
                    <div className="match-images">
                        <Image src={this.props.parent.profilePicture} circle/>
                        <Image src={this.props.sitter.profilePicture} circle/>
                    </div>
                </div>
                <div className="personality">
                    <h4>PERSONALITY MATCH</h4>
                    <TagsList items={matchingWords}/>
                </div>
            </div>
        )
    }
}
export default MatchBanner;
