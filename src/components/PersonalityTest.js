import React from 'react';
import PersonalityTestRating from './controllers/PersonalityTestRating'
class PersonalityTest extends React.Component {
    constructor() {
        super();
        this.computeResults = this.computeResults.bind(this);
    }
    computeResults(){
        let questions = [];
        for (let ref in this.refs) {
            if(ref.startsWith("question")) {
                console.log(this.refs[ref]);
                questions[this.refs[ref].state.key] = {
                    choice : this.refs[ref].state.rating,
                    question : this.refs[ref].state.question,
                    category : this.refs[ref].state.category,
                    method : this.refs[ref].state.method
                }
            }
        }
    }

    render() {
        let index = 0;
        const questions = this.props.questions.map((question) => {
            index += 1;
            let questionRef = "question" + index;
            return (
                <div key={index}>
                    <p>{question.question}</p>
                    <PersonalityTestRating ref={questionRef} id={index} question={question} {...this.props}/>
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

export default PersonalityTest;
