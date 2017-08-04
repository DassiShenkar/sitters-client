//external sources
import React from 'react';

export default class RadioInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.handleRadio = this.handleRadio.bind(this);
    };

    handleRadio(e) {
        this.props.action(e.target.value);
    }
}