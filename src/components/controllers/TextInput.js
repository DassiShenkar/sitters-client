import React from 'react';
import TextInputBase from '../../base/controllers/TextInputBase.js'

class TextInput extends TextInputBase {

    render() {
        let label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
        let type = this.props.type !== '' ? this.props.type : 'text';
        let placeholder = this.props.placeholder !== '' ? this.props.placeholder : '';
        let defaultValue = this.props.default !== '' ? this.props.default : '';
        return (
            <div className="text-input">
                {label}
                <input type={type} placeholder={placeholder} ref="textInput"
                       onChange={this.handleChange}
                        value={defaultValue}/>
            </div>
        );
    }
}

export default TextInput;


