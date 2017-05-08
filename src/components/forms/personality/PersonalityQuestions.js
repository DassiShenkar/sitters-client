// external sources
import React from "react";

// components
import OurSlider from '../../controllers/slider';

export default class PersonalityQuestions extends React.Component {

    getSameAnswers() {
        let questions = [];
        let differentQuestion = [];
        let sameQuestions = [];
        const self = this;
        if (this.props.feed.filteredMatches.length > 0)
            questions = this.props.feed.filteredMatches[this.props.feed.sitterIndex].personalityTest.questions.map((question) => {
                let key = self.props.questions.indexOf(question);
                let rangeClass = '';
                if (this.props.addSameQuestionsClass) {
                    rangeClass = question.value === self.props.secondQuestions[key].value ? "same-answer" : "";
                    const slider = <OurSlider key={key} className={'answer ' + rangeClass} leftLabel={question.label1} rightLabel={question.label2} min={0} max={4} step={1} value={question.value} defaultValue={2} disabled={self.props.disabled}/>;
                    if(rangeClass === "same-answer"){
                        sameQuestions.push(slider);
                    }
                    else {
                        differentQuestion.push(slider);
                    }
                }
            });
        return {sameQuestions, differentQuestion, questions};
    }


    render() {
        const {sameQuestions, differentQuestion, questions} = this.getSameAnswers();
        return (
            <div className="personality-profile">
                {this.props.disabled ? <h3>{'You want it - ' + this.props.sitterName.split(' ')[0] + ' has got it!'}</h3> : questions}
                {this.props.disabled ? sameQuestions : ''}
                {this.props.disabled ? <h3>{this.props.title}</h3> : ''}
                {this.props.disabled ? differentQuestion : ''}
            </div>
        );
    }
}