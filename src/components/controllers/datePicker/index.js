// external sources
import React from 'react';

//components
import DatePickerBoostrap from 'react-bootstrap-date-picker'
import DatePickerBase from '../../base/controllers/datePicker/index'

export default class DatePicker extends DatePickerBase {
    render() {
        return (
            <DatePickerBoostrap value={this.props.defaultValue} action={this.props.action} onChange={this.handleChange} />
        );
    }
}