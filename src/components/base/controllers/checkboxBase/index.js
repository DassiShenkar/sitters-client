// external sources
import {Component} from 'react';

export default class CheckBoxBase extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };

    onChange(newValue) {
        this.props.action(newValue);
    }
}
