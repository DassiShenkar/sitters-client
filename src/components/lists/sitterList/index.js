//external sources
import React from 'react';
import {Link} from 'react-router';

//components
import {Image, Table} from 'react-bootstrap';
import SitterActionBar from '../../panels/actionPanel/index';
import SitterListBase from "../../base/lists/sitterList/index";
import Icon from "../../icon";

//style
import './style.css';
import '../../../style/animations.min.css';

class SitterList extends SitterListBase {
    render() {

        const sitterIndex = this.props.feed.sitterIndex === undefined ? 0 : this.props.feed.sitterIndex;
        const coverPhoto = this.props.sitters.length > 0 ? this.props.feed.filteredMatches[sitterIndex].coverPhoto : null;
        const mutualFriends = this.props.sitters.length > 0 ? this.props.feed.matches[sitterIndex].match.mutualFriends : null;
        const personality = this.props.sitters.length > 0 ? this.props.feed.matches[sitterIndex].personality : [];
        const motto = this.props.sitters.length > 0 ? this.props.feed.matches[sitterIndex].motto : '';
        let style;
        if (coverPhoto) {
            style = {
                backgroundImage: 'url(' + coverPhoto + ')'
            };
        }
        return (
            <div className="feed-match">
                <div className="match" style={style}>
                    <div className="cover-overlay"/>
                    <div className="sitter-info">
                        <Link className="sitter-link"
                              to={this.props.sitters.length > 0 ? '/sitter/' + this.props.sitters[sitterIndex]._id : '#'}>
                            <Image className="profilePic"
                                   src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}
                                   alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}
                                   circle/>
                        </Link>
                        <h1 className="sitterName">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}</h1>
                    </div>
                    <div className="arrows">
                        {sitterIndex > 0 ?
                            <Icon onClick={this.prevSitter}
                                  name={sitterIndex === this.props.sitters.length - 1 ? 'glyphicon glyphicon-menu-left faa-float animated' : 'glyphicon glyphicon-menu-left'}/> : ''}
                        {sitterIndex >= 0 && sitterIndex < this.props.sitters.length - 1 ?
                            <Icon action={this.nextSitter}
                                  name='glyphicon glyphicon-menu-right faa-float animated'/> : ''}
                    </div>
                    <SitterActionBar {...this.props}/>
                </div>
                <div id="sitter-profile">
                    <Table className="info-table">
                        <thead>
                        <tr>
                            <th>{'MUTUAL FRIENDS (' + (mutualFriends ? mutualFriends.length : 0) + ')'}</th>
                            <th>MOTTO</th>
                            <th>PERSONALITY</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="mutual-friends">
                                    <ul>
                                        {mutualFriends ? mutualFriends.map((friend, index) => {
                                            return (<li key={index} className={'mutual-friend ' + index}>
                                                <Image
                                                    src={friend.picture}
                                                    title={friend.name}
                                                    circle/>
                                            </li>);
                                        }) : ''}
                                        <div className="clear"/>
                                    </ul>
                                </div>
                            </td>
                            <td className="motto">{motto ? '"' + motto + '"' : ''}</td>
                            <td className="personality">
                                <ul>
                                    <li className="label label-dark">{personality[0]}</li>
                                    <li className="label label-dark">{personality[1]}</li>
                                </ul>
                                <ul>
                                    <li className="label label-regular">{personality[2]}</li>
                                    <li className="label label-regular">{personality[3]}</li>
                                </ul>
                                <ul>
                                    <li className="label label-light">{personality[4]}</li>
                                    <li className="label label-light">{personality[5]}</li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default SitterList;