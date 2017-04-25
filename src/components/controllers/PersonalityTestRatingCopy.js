import React from 'react';
import ReactRating from 'react-rating'

class PersonalityTestRating extends React.Component {
    constructor(props) {
        super(props);
    }
    handleRate(rate){
        let question = this.props.question;
        question.choice = rate;
        question.id = this.props.id;
        this.props.actions.registerActions.changePersonalityTestQuestion(question);
    }

    render() {
        let initRate;
        if(typeof this.props.register !== "undefined"){
        initRate = this.props.register.personalityTestQuestions[this.props.question.id] == null ? 0: this.props.register.personalityTestQuestions[this.props.question.id].choice;
        }
        return (
            <div onClick={this.getValue}>
                <ReactRating onClick={rate => this.handleRate.bind(this,rate)} initialRate={initRate}/>
            </div>
        );
    }
}
export default PersonalityTestRating;
