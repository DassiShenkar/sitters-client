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
        const  questions = strings.QUESTIONS.map((question) => {
            let key = strings.QUESTIONS.indexOf(question);
            let rangeClass = '';
            if(this.props.addSameQuestionsClass){
                rangeClass = question.value === this.props.secondQuestions[key].value? "same-answer": "";
            }
            return (
                <div key={key} className={'answer ' + rangeClass}>
                    <label className="left-label">{question.label1}</label>
                    <Slider dots={true} disabled={this.props.disabled}  min={0} max={4}  step={1}   defaultValue={question.value} onChange={this.onChange.bind(this,question,key)}/>
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