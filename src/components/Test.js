import React from 'react';
import PersonalityTestRating from './controllers/PersonalityTestRating'
import BaseData from '../data/BaseData'
import {ControlLabel} from "react-bootstrap";
class Test extends React.Component {

    render() {
        let index = -1;
        const questions = BaseData.getQuestions().map((question) => {
            index += 1;
            return (
                <div key={index}>
                    <ControlLabel>{question.question}</ControlLabel>
                    <PersonalityTestRating id={index}
                                           question={question}
                                           {...this.props}/>
                    <ControlLabel>{question.question}</ControlLabel>
                </div>
            )
        });
        return (
            <div>
                <p>The following questionnaire includes statements that describe how you feel and acts during activities, you will have to mark the level of agreement on a scale from 1 (strongly disagree) to 5 (strongly agree).

                    It is important to answer the questionnaire of seriousness and sincere manner.

                    It is important though that you know that this questionnaire can be answered only once and the results of the questionnaire are not published to the parents, and not delivered to anyone else.
                </p>
                <p>
                    It is important though that you know that this questionnaire can be answered only once and the results of the questionnaire are not published to the parents, and not delivered to anyone else.
                </p>
                <h3>Questions</h3>
                {questions}
            </div>
        );
    }
}

export default Test;
