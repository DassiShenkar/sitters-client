// external sources
import {Component} from 'react';

export default class RadioInputBase extends Component {

    constructor(props) {
        super(props);
        this.handleRadio = this.handleRadio.bind(this);
    };

    handleRadio(e) {
        this.props.action(e.target.value);
    }
}