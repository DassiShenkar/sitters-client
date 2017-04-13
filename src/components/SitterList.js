import React from 'react';

import SitterListBase from '../base/SitterListBase';
import SitterActionBar from './SitterActionBar';



class SitterList extends SitterListBase {
    

    render() {
        return (
            <div className="match">
                <p className="matchScore">{this.props.sitters.length > 0 ? this.props.sitters[0].matchScore + '% Match!' : 'no matches found'}</p>
                <img src={this.props.sitters.length > 0 ? this.props.sitters[0].profilePicture : ''}
                     alt={this.props.sitters.length > 0 ? this.props.sitters[0].name : ''}/>
                <p className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[0].name : ''}</p>
                {this.props.sitters.length > 0 ? <SitterActionBar/> : ''}
            </div>
        )
    }
}
export default SitterList;
