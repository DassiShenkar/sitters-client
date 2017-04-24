import React from 'react';
import {Link} from 'react-router';

import {Image} from 'react-bootstrap';

import SitterListBase from '../../base/SitterListBase';

//style
import './style.css';
import SitterPieMatch from "../pie/SitterPieMatch";
import PieChart from "../pie/PieChart";

class SitterList extends SitterListBase {

    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length ? this.props.sitters[sitterIndex].coverPhoto : '';
        const style = {
            backgroundImage: 'url(' + coverPhoto + ')'
        };
        return (
            <div>
                <Link className="match" style={style}
                      to={this.props.sitters.length > 0 ? '/sitter/' + this.props.sitters[sitterIndex]._id : '#'}>
                    <div className="sitter-info">
                        <h1 className="matchScore">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].match.matchScore + '% Match!' : 'no matches found'}</h1>
                        <Image className="profilePic"
                               src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}
                               alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''} circle/>
                        <h3 className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}</h3>
                    </div>
                </Link>
                    {/*<SitterPieMatch sitter={this.props.sitters[sitterIndex]} {...this.props}/>*/}
                    <PieChart sitter={this.props.sitters[sitterIndex]} />
            </div>
        )
    }
}
export default SitterList;
