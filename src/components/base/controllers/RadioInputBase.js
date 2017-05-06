import React from 'react';

class RadioInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.handleRadio = this.handleRadio.bind(this);
    };

    handleRadio(e) {
        this.props.action(e.target.value);
    }
}

export default RadioInputBase;


