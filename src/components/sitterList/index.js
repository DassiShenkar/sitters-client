import React from 'react';
import {Link} from 'react-router';

//components
import {Image, Table} from 'react-bootstrap';
import RainbowChart from "../RainbowChart";

import SitterActionBar from '../panels/actionPanel';
import PersonalityQuestions from "../forms/personality/PersonalityQuestions";

//style
import './style.css';

// statics

class SitterList extends React.Component {

    render() {

        let sitterIndex = this.props.feed.sitterIndex;
        // const consider = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name.split(' ')[0] + ' also considers ' + (this.props.sitters[sitterIndex].gender === 'male' ? 'himself:' : 'herself:') : '';
        const coverPhoto = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].coverPhoto : null;
        const mutualFriends = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].mutualFriends.length : 0;
        const personality = [
            "Patient",
            "Outdoorsy",
            "Funny",
            "Adventurous",
            "Sensitive",
            "Youthful"
        ];
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
                    <SitterActionBar {...this.props}/>
                </div>
                <div id="sitter-profile">
                    <Table className="info-table" responsive>
                        <thead>
                        <tr>
                            <th>{'MUTUAL FRIENDS (' + mutualFriends + ')'}</th>
                            <th>MOTTO</th>
                            <th>PERSONALITY</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="mutual friends">
                                <ul>
                                    <li>
                                        <Image
                                            src={mutualFriends > 0 ? this.props.sitters[sitterIndex].mutualFriends[0].picture : ''}
                                            circle/>
                                    </li>
                                    <li>
                                        <Image
                                            src={mutualFriends >= 2 ? this.props.sitters[sitterIndex].mutualFriends[1].picture : ''}
                                            circle/>
                                    </li>
                                    <li>
                                        <Image
                                            src={mutualFriends >= 3 ? this.props.sitters[sitterIndex].mutualFriends[2].picture : ''}
                                            circle/>
                                    </li>
                                </ul>
                            </td>
                            <td className="motto">"Always look on the bright side of life"</td>
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
                {/*</div>*/}
                {/*<PageHeader>*/}

                {/*<Image className="sitter-profile-pic"*/}
                {/*src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}*/}
                {/*alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''} circle/>*/}
                {/*{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}*/}
                {/*</Link>*/}

                {/*</PageHeader>*/}
                //
                {/*<div className="match-info">*/}
                {/*//*/}
                {/*<div className="score">*/}
                {/*// <h1*/}
                {/*className="match-score">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].match.matchScore + '%' : ''}</h1>*/}
                {/*// <h1>{this.props.sitters.length > 0 ? 'Match' : ''}</h1>*/}
                {/*//*/}
                {/*</div>*/}
                {/*// <RainbowChart sitter={this.props.sitters[sitterIndex]}/>*/}
                {/*//*/}
                {/*</div>*/}
                {/*<h3>{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name.split(' ')[0] + ' considers '+ (this.props.sitters[sitterIndex].gender === 'male'? 'himself:': 'herself:') : ''}</h3>*/}
                {/*<PersonalityQuestions*/}
                {/*questions={this.props.sitters.length > 0 ? this.props.sitters[this.props.feed.sitterIndex].personalityTest.questions : ''}*/}
                {/*addSameQuestionsClass={true}*/}
                {/*secondQuestions={this.props.user.personalityTest.questions}*/}
                {/*disabled={true}*/}
                {/*title={consider}*/}
                {/*sitterName={this.props.sitters.length > 0 ? this.props.sitters[this.props.feed.sitterIndex].name : ''}*/}
                {/*{...this.props}/>*/}
            </div>
        )
    }
}
export default SitterList;