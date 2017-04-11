import React from 'react';
import TextInputBase from '../../base/controllers/TextInputBase.js'

class TextInput extends TextInputBase {

    render() {
        const value = this.props[this.props.reducer][this.props.inputType]  ? this.props[this.props.reducer][this.props.inputType] : this.props.defaultValue;
        return (
            <div className="text-input">
                <label>{this.props.label}</label>
                <input type={this.props.type !== '' ? this.props.type : 'text'}
                       placeholder={this.props.placeholder}
                       ref="textInput"
                       onChange={this.handleChange}
                       value={value}/>
            </div>
        );
    }
}

export default TextInput;


