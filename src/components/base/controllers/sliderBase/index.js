// external sources
import {Component} from 'react';

export default class SliderBase extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };

    onChange(question, index, rate) {
        question.value = rate;
        question.index = index;
        this.props.actions.registerActions.changePersonalityQuestion(question);
    }
}

