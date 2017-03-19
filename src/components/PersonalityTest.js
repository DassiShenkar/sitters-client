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
                    <PersonalityTestRating ref={questionRef} id={index} question={question}/>
                </div>
            )
        });
        return (
            <div>
                {questions}
            </div>
        );
    }
}
export default PersonalityTest;
