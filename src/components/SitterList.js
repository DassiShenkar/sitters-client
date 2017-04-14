import React from 'react';
import {Link} from 'react-router';

import SitterListBase from '../base/SitterListBase';
import SitterActionBar from './SitterActionBar';



class SitterList extends SitterListBase {
    

    render() {
        return (
            <div className="match">
                <p className="matchScore">{this.props.sitters.length > 0 ? this.props.sitters[0].matchScore + '% Match!' : 'no matches found'}</p>
                <Link to={this.props.sitters.length > 0 ? '/sitter/' +  this.props.sitters[0]._id : '#'}>
                    <img src={this.props.sitters.length > 0 ? this.props.sitters[0].profilePicture : ''}
                         alt={this.props.sitters.length > 0 ? this.props.sitters[0].name : ''}/>
                </Link>
                <p className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[0].name : ''}</p>
                {this.props.sitters.length > 0 ? <SitterActionBar/> : ''}
            </div>
        )
    }
}
export default SitterList;
