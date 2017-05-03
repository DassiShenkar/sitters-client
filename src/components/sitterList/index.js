import React from 'react';
import {Link} from 'react-router';

//components
import {Image, PageHeader} from 'react-bootstrap';
import RainbowChart from "../RainbowChart";

import SitterActionBar from '../panels/actionPanel';
import PersonalityQuestions from "../PersonalityQuestions";

//style
import './style.css';

// statics

class SitterList extends React.Component {

    render() {
        let sitterIndex = this.props.feed.sitterIndex;
        return (
            <div className="match">
                <PageHeader>
                    <Link className="sitter-link"
                          to={this.props.sitters.length > 0 ? '/sitter/' + this.props.sitters[sitterIndex]._id : '#'}>
                        <Image className="sitter-profile-pic"
                               src={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].profilePicture : ''}
                               alt={this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''} circle/>
                        {this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name : ''}
                    </Link>
                    <SitterActionBar {...this.props}/>
                </PageHeader>
                <div className="match-info">
                    <div className="score">
                        <h1 className="match-score">{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].match.matchScore + '%' : ''}</h1>
                        <h1>{this.props.sitters.length > 0 ? 'Match' : ''}</h1>
                    </div>
                    <RainbowChart sitter={this.props.sitters[sitterIndex]}/>
                </div>
                <h3>{this.props.sitters.length > 0 ? this.props.sitters[sitterIndex].name.split(' ')[0] + ' considers '+ (this.props.sitters[sitterIndex].gender === 'male'? 'himself': 'herself') : ''}</h3>
                <PersonalityQuestions questions={this.props.sitters.length > 0 ?this.props.sitters[this.props.feed.sitterIndex].personalityTest.questions: ''}
                                      addSameQuestionsClass={false}
                                      secondQuestions={this.props.user.personalityTest.questions}
                                      disabled={true}
                                      {...this.props}/>
            </div>
        )
    }
}
export default SitterList;