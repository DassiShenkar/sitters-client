// external sources
import React from 'react';

// components
import Select from 'react-select'

import SelectInputBase from '../../base/controllers/selectBase/index.js';

// style
import 'react-select/dist/react-select.css';

export default class SelectInput extends SelectInputBase {
    render() {
        return (
                <Select
                name="form-field-name"
                multi={true}
                value={this.props.defaultValues?this.props.defaultValues:''}
                options={this.props.options}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                />
        );
    }
}