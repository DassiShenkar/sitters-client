import React from "react";


class PersonalityQuestions extends React.Component {
    render() {
        const questions = this.props.questions.map((question) => {
            return(
                <p key={this.props.questions.indexOf(question)}>{question.start + " " + question.end}</p>
            );
        });
        return(
            <div>
                {questions}
            </div>
        );
    }
}

export default PersonalityQuestions;