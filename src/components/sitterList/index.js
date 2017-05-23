import React from 'react';
import {Link} from 'react-router';

//components
import {Image, PageHeader} from 'react-bootstrap';
import RainbowChart from "../RainbowChart";

import SitterActionBar from '../panels/actionPanel';
import PersonalityQuestions from "../forms/personality/PersonalityQuestions";

//style
import './style.css';

// statics

class SitterList extends React.Component {

    render() {

        let sitterIndex = this.props.feed.sitterIndex;
        const consider = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name.split(' ')[0] + ' also considers ' + (this.props.sitters[sitterIndex].gender === 'male' ? 'himself:' : 'herself:') : '';
        const coverPhoto = this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].coverPhoto : null;
        let style;
        if (coverPhoto) {
            style = {
                backgroundImage: 'url(' + coverPhoto + ')'
            };
        }
        return (
            <div className="feed-match">
                <div className="match" style={style}>
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
                <PersonalityQuestions
                    questions={this.props.sitters.length > 0 ? this.props.sitters[this.props.feed.sitterIndex].personalityTest.questions : ''}
                    addSameQuestionsClass={true}
                    secondQuestions={this.props.user.personalityTest.questions}
                    disabled={true}
                    title={consider}
                    sitterName={this.props.sitters.length > 0 ? this.props.sitters[this.props.feed.sitterIndex].name : ''}
                    {...this.props}/>
            </div>
    )
    }
    }
    export default SitterList;