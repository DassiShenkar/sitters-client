// external sources
import {Component} from 'react';

export default class SliderBase extends Component {

    constructor(props) {
        super(props);
    };

    onChange(rate) {
        let question = this.props.question;
        question.value = rate;
        question.index = this.props.index;
        // question.value = rate;
        // question.index = index;
        //this.props.actions.registerActions.changePersonalityQuestion(question);
        this.props.action(question);
    }
}

