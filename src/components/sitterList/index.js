import React from 'react';
import {Link} from 'react-router';

import {Image} from 'react-bootstrap/lib';


import SitterListBase from '../../base/SitterListBase';

//style
import './style.css';

class SitterList extends SitterListBase {


    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        return (
            <Link className="match" style={style}
                  to={this.props.sitters.length > 0 ? '/sitter/' + this.props.sitters[sitterIndex]._id : '#'}>
                <div className="sitter-info">
                    <h1 className="matchScore">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].matchScore + '% Match!' : 'no matches found'}</h1>
                    <Image className="profilePic" src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}
                           alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''} circle/>
                    <h3 className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}</h3>
                </div>
            </Link>
        )
    }
}
export default SitterList;
