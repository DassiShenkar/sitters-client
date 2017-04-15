import React from 'react';
import {Link} from 'react-router';

import SitterListBase from '../base/SitterListBase';
import SitterActionBar from './SitterActionBar';

class SitterList extends SitterListBase {
    

    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        return (
            <div className="match">
                <p className="matchScore">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found'}</p>
                <Link to={this.props.sitters.length > 0 ? '/sitter/' +  this.props.sitters[sitterIndex]._id : '#'}>
                    <img src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}
                         alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}/>
                </Link>
                <p className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}</p>
                {this.props.sitters.length > 0 ? <SitterActionBar {...this.props}/> : ''}
            </div>
        )
    }
}
export default SitterList;
