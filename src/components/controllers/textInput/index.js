// external sources
import React from 'react';

// components
import {ControlLabel, FormControl} from 'react-bootstrap';

import TextInputBase from '../../base/controllers/textInputBase/index.js';

export default class TextInput extends TextInputBase {

    render() {
        let value;
        if(this.props.value !== "")
            value = this.props.value;
        else
            // value = this.props[this.props.reducer][this.props.inputType] ? this.props[this.props.reducer][this.props.inputType] : this.props[this.props.reducer][this.props.inputType] === ''? '': this.props.defaultValue;
            value = this.props.defaultValue
            return (
            <div className="text-input">
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl type={this.props.type !== '' ? this.props.type : 'text'}
                             placeholder={this.props.placeholder}
                             onChange={this.handleChange}
                             defaultValue={this.props.defaultValue}
                             value={value}
                             required={this.props.required?this.props.required:false}
                />
            </div>
        );
    }
}



