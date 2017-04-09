import React from 'react';
import SelectInputBase from '../../base/controllers/SelectInputBase.js';
import 'react-select/dist/react-select.css';
import Select from 'react-select'

class TextInput extends SelectInputBase {
    render() {
        return (
                <Select
                name="form-field-name"
                multi={true}
                value={this.props.defaultLanguages}
                options={this.props.options}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                />
        );
    }
}

export default TextInput;
