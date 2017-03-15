import React from 'react';
import TextInputBase from '../../base/controllers/TextInputBase.js'

class TextInput extends TextInputBase {

    constructor(props) {
        super(props);
    };
    render() {
        let label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
        let type = this.props.type !== '' ?  this.props.type: 'text';
        let placeholder = this.props.placeholder !== ''? this.props.placeholder : '';
        return (
            <div className="text-input">
                {label}
                <input type={type} id="textInput" placeholder={placeholder} ref="textInput" onChange={this.handleChange} />
            </div>
        );
    }
}


export default TextInput;


