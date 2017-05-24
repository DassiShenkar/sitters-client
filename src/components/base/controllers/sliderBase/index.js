// external sources
import {Component} from 'react';

export default class SliderBase extends Component {

    onChange(rate) {
        let question = this.props.question;
        question.value = rate;
        question.index = this.props.index;
        this.props.action(question);
    }
}

