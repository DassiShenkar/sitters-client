import React from "react";
import {ReactRating} from "react-rating";
import {ControlLabel} from "react-bootstrap";


class PersonalityQuestions extends React.Component {
    render() {
        const questions = this.props.questions.map((question) => {
            return (
                <div>
                    <ControlLabel>{question.start}</ControlLabel>
                    {/*<ReactRating initialRate={question.value.toString()} onClick={rate => console.log(rate)} />*/}
                    <ControlLabel>{question.end}</ControlLabel>
                </div>
            );
        });
        return (
            <div>
                {questions}
            </div>
        );
    }
}

export default PersonalityQuestions;