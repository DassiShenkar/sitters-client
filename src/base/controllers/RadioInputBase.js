import React from 'react';

class RadioInputBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.default.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})// make first letter upper case
        };
    };

    handleRadio(e) {
        this.setState({ value: e.target.value });
    }
}

export default RadioInputBase;


