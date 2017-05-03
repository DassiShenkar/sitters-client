import React from "react";
import {ControlLabel} from "react-bootstrap";
import strings from '../static/strings'
import Slider from 'rc-slider'

class PersonalityQuestions extends React.Component {
    onChange(question,index, rate){
        console.log(rate);
        console.log(question);
        console.log(index);
        question.value = rate;
        question.index = index;
        this.props.actions.registerActions.changePersonalityQuestion(question);
    }
    render() {
        let  questions;
        const self = this;
        if(this.props.feed.filteredMatches.length >0)
            questions = this.props.feed.filteredMatches[this.props.feed.sitterIndex].personalityTest.questions.map((question) => {
                let key = self.props.questions.indexOf(question);
                let rangeClass = '';
                if(this.props.addSameQuestionsClass){
                    rangeClass = question.value === self.props.secondQuestions[key].value? "same-answer": "";
                }

                return (
                    <div key={key} className={'answer ' + rangeClass}>
                        <label className="left-label">{question.label1}</label>
                        <Slider dots={true} disabled={self.props.disabled}  min={0} max={4}  step={1}  value={question.value} defaultValue={2}/>
                        <label className="right-label">{question.label2}</label>
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