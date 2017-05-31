//external sources
import React from 'react';
import * as _ from "lodash";

//components
import {Image} from 'react-bootstrap';
import ReactBarChart from '../../ReactBarChart';

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
                    <ul>
                        <li className="label label-dark">{matchingWords[0]}</li>
                        <li className="label label-dark">{matchingWords[1]}</li>
                    </ul>
                    <ul>
                        <li className="label label-regular">{matchingWords[2]}</li>
                        <li className="label label-regular">{matchingWords[3]}</li>
                    </ul>
                    <ul>
                        <li className="label label-light">{matchingWords[4]}</li>
                        <li className="label label-light">{matchingWords[5]}</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default MatchBanner;
