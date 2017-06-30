import React from 'react';
import {Link} from 'react-router';

//components
import {Image, Table} from 'react-bootstrap';
import SitterActionBar from '../panels/actionPanel';

//style
import './style.css';

// statics
import strings from '../../static/strings';
import * as axios from "axios";

class SitterList extends React.Component {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.prevSitter = this.prevSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? this.props.feed.filteredMatches.length - 1 : this.props.feed.sitterIndex + 1;
        if (strings.ACTIVATE_BLACKLIST) {
            let parent = this.props.user;
            parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id);
            this.props.actions.actionCreators.setUserData(parent);
            //Todo: call blacklistSitter(parentID, sitterID) for this parent
            axios({
                method: 'post',
                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'parent/update',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: parent
            }).then(function (res) {
                if (res.data) {  // user created
                    console.log('updated blacklist');
                }
                else { // user not created
                    console.log("user not created");
                    //TODO: think about error when user not created
                }
            })
                .catch(function (error) {
                    alert(error);
                    //TODO: think about error when user not created
                });

        }
        this.props.actions.feedActions.setSitterIndex(index);
    }

    prevSitter(e) {
        e.preventDefault();
        const index = this.props.feed.sitterIndex === 0 ? 0 : this.props.feed.sitterIndex - 1;
        if (strings.ACTIVATE_BLACKLIST) {
            let parent = this.props.user;
            parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id);
            this.props.actions.actionCreators.setUserData(parent);
            //Todo: call blacklistSitter(parentID, sitterID) for this parent
            axios({
                method: 'post',
                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'parent/update',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: parent
            }).then(function (res) {
                if (res.data) {  // user created
                    console.log('updated blacklist');
                }
                else { // user not created
                    console.log("user not created");
                    //TODO: think about error when user not created
                }
            })
                .catch(function (error) {
                    alert(error);
                    //TODO: think about error when user not created
                });

        }
        this.props.actions.feedActions.setSitterIndex(index);
    }


    render() {

        const sitterIndex = this.props.feed.sitterIndex === undefined ? 0 : this.props.feed.sitterIndex;
        // const consider = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name.split(' ')[0] + ' also considers ' + (this.props.sitters[sitterIndex].gender === 'male' ? 'himself:' : 'herself:') : '';
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
                            <span onClick={this.prevSitter} className={sitterIndex === this.props.sitters.length - 1 ? 'glyphicon glyphicon-menu-left faa-float animated': 'glyphicon glyphicon-menu-left'}/> : ''}
                        {sitterIndex >= 0 && sitterIndex < this.props.sitters.length - 1 ?
                            <span onClick={this.nextSitter} className={sitterIndex === 0 ? 'glyphicon glyphicon-menu-right faa-float animated': 'glyphicon glyphicon-menu-right'}/> : ''}
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
                                                if(index < 3) {
                                                return (<li key={index} className={'mutual-friend ' + index}>
                                                    <Image
                                                        src={friend.picture}
                                                        title={friend.name}
                                                        circle/>
                                                </li>);
                                                }
                                            }) : ''}
                                        <div className="clear"/>
                                    </ul>
                                </div>
                            </td>
                            <td className="motto">{'\"' + motto + '\"'}</td>
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